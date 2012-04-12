var TaskLister = {
	init: function (config) {
		var defaults = {
			
		};

		config = $.extend({}, defaults, config); 
		this.config = config;
		this.notification = $('.notification');
		$('.taskHeader').live("click", function(event){
			$(this).children('i').toggle();
			$(this).next().slideToggle();
		});
		$('#newTaskForm').live('submit', function(e){
			console.log(this);
			TaskLister.newTaskFromForm(this);
			e.preventDefault();
		});
		var taskItemSource = $("#taskItem-template").html();
		this.tasks = [];
		this.taskItemTemplate = Handlebars.compile(taskItemSource); 
		this.fetchAllTasks();

		$.fn.serializeObject = function(){
		    var o = {};
		    var a = this.serializeArray();
		    $.each(a, function() {
		        if (o[this.name] !== undefined) {
		            if (!o[this.name].push) {
		                o[this.name] = [o[this.name]];
		            }
		            o[this.name].push(this.value || '');
		        } else {
		            o[this.name] = this.value || '';
		        }
		    });
		    return o;
		};
		
		$('#searchKeyWord').keyup(function(){
			console.log("should search for");
			TaskLister.searchFor($('#searchKeyWord').val());
		});
		return this;
	},

	fetchTaskDummy: function (id) {
		if(id == 1) {
			return {"id": "1",
					"title": "Clean the room",
					"urgency": "2",
					"importance": "3",
					"deadline": "20:00 2012/08/24",
					"description": "Mingi pikem tekst. Mingi pikem tekst. Mingi pikem tekst.Mingi pikem tekst.",
					"status": "backlog"}
		} else if(id == 2) {
			return {"id": "2",
					"title": "Fix the car",
					"urgency": "4",
					"importance": "2",
					"deadline": "14:00 2020/08/14",
					"description": "Auto ikka katki",
					"status": "backlog"}
		} else if(id == 3) {
			return {"id": "3",
					"title": "Fix the car",
					"urgency": "4",
					"importance": "2",
					"deadline": "14:00 2020/08/14",
					"description": "Auto ikka katki",
					"status": "development"}
		} else if(id == 4) {
			return {"id": "4",
					"title": "Fix the car",
					"urgency": "4",
					"importance": "2",
					"deadline": "14:00 2020/08/14",
					"description": "Auto ikka katki",
					"status": "testing"}
		} else if(id == 5) {
			return {"id": "5",
					"title": "Fix the",
					"urgency": "4",
					"importance": "2",
					"deadline": "14:00 2020/08/14",
					"description": "Auto ikka katki",
					"status": "done"}
		} else if(id == 6) {
			return {"id": "6",
					"title": "Fix the",
					"urgency": "4",
					"importance": "2",
					"deadline": "14:00 2020/08/14",
					"description": "Auto ikka katki car",
					"status": "done"}
		}
	},
	
	fetchTaskIDs: function(){
		TaskLister.idList = [1,2,3,4,5,6];
	},

	fetchTask: function(id) {
		var dfd = $.Deferred();
		$.ajax({
			url: 'JSONsamples/tasks/' + id + '.json',
			dataType: 'jsonp',
			success: dfd.resolve,
			error: dfd.reject
		});
		return dfd.promise();
	},
	
	hideTask: function(id) {
		$('#task'+id).hide();
	},
	
	showTask: function(id) {
		$('#task'+id).show();
	},

	fetchAllTasks: function() {
		var self = TaskLister;
		self.fetchTaskIDs();
		self.notification.slideToggle();
		var numberOfTasks = self.idList.length;
		self.notification.children(".progress")
			.addClass("active")
			.addClass("progress-info")
			.addClass("progress-striped")
			.removeClass("progress-success");
		var bar = self.notification.children(".progress").children(".bar");
		$.each(self.idList, function(index, id){
			bar.text("Loading tasks " + id + "/" + numberOfTasks);
			self.fetchTask(id).then(function (taskData){
				self.addTask(taskData);
				bar.css('width', function(){
					return (index+1)*100 / numberOfTasks + "%";
				});
			}).fail(function(){
				self.addTask(self.fetchTaskDummy(id));
				bar.css('width', function(){
					return (index+1)*100 / numberOfTasks + "%";
				});
			});
		});
		self.notification.children(".progress")
			.removeClass("active")
			.removeClass("progress-info")
			.removeClass("progress-striped")
			.addClass("progress-success");
		self.notification.delay(2000).slideToggle();
	},

	addTask: function(taskData){
		var self = TaskLister;
		self.tasks.push(taskData);
		self.drawTask(taskData);
	},
	
	drawTask: function(taskData) {
		var self = TaskLister;
		var taskHTML = self.taskItemTemplate(taskData);
		$("#" + taskData.status).append(taskHTML);
	},

	newTaskFromForm: function(form) {
		console.log(TaskLister.tasks);
		TaskLister.addTask($(form).serializeObject());
		$('#newTaskModal').modal('hide');
	},
	
	hideAllTasks: function() {
		var self = TaskLister;
		$.each(self.tasks, function(){
			console.log("hideing a task");
			self.hideTask(this.id);
		});
	},
	
	showAllTasks: function() {
		var self = TaskLister;
		$.each(self.tasks, function(){
			console.log("hideing a task");
			self.showTask(this.id);
		});
	},
	
	searchFor: function(keyWord) {
		var self = TaskLister;
		self.showAllTasks();
		$.each(self.tasks, function(){
			if(!self.doesTaskContain(this, keyWord)){
				console.log("did not contain" + keyWord);
				self.hideTask(this.id);
			}
		});
	},
	
	doesTaskContain: function(task, keyWord){
		if(task.title.indexOf(keyWord) != -1) return true;
		if(task.description.indexOf(keyWord) != -1) return true;
		return false;
	}

};