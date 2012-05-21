var TaskLister = {
	init: function (config) {
		this.tasks = [];
		
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
			TaskLister.showAllTasks();
			if($('#searchKeyWord').val().length > 2){
				TaskLister.searchFor($('#searchKeyWord').val());
			}
		});
		return this;
	},

	fetchTaskIDs: function(){
		var data = { authString: $.cookie("auth")};
		var dfd = $.Deferred();
        $.ajax({
            url: 'tasklist',
            data: data,
            dataType: 'json',
            success: dfd.resolve,
            error: dfd.reject
        });
        return dfd.promise();
	},

	fetchTask: function(id) {
		var dfd = $.Deferred();
		$.ajax({
			url: 'gettask?id=' + id,
			dataType: 'json',
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
		self.fetchTaskIDs().then(function(data){TaskLister.taskListLoaded(data)})
		                    .fail(function (){console.log("EIP");});
	},

	taskListLoaded: function(data) {
	    console.log(data);
	    if(typeof data === 'undefined' || typeof data.taskIds === 'undefined'){
	        return;
	    }
	    console.log("got past");
        var self = TaskLister;
        self.idList = data.taskIds;
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
		$("#" + self.getStatusName(taskData.status) + "List").append(taskHTML);
	},

	getStatusName: function(statusId){
	    if(statusId == 0){
	        return "backlog";
	    } else if(statusId == 1){
            return "development";
        } else if(statusId == 2){
           return "testing";
        } else if(statusId == 3){
           return "done";
        } else return "backlog";
	},

	newTaskFromForm: function(form) {
	    var task = $(form).serializeObject();
		TaskLister.addTask(task);
		TaskLister.uploadNewTask(task);
		$('#newTaskModal').modal('hide');
	},

	uploadNewTask: function(task){
	    task.authString = $.cookie("auth");
	    console.log("uploading:")
	    console.log(task);
	    $.post('newtask', task, function(data){
	        console.log(data);
	    })
	        .success(function(){console.log("upload successful")})
	        .error(function(){console.log("upload error")})
	        .complete(function(){console.log("upload complete")});
	},
	
	hideAllTasks: function() {
		var self = TaskLister;
		$.each(self.tasks, function(){
			console.log("hiding a task");
			self.hideTask(this.id);
		});
	},
	
	showAllTasks: function() {
		var self = TaskLister;
		$.each(self.tasks, function(){
			console.log("showing a task");
			self.showTask(this.id);
		});
	},
	
	searchFor: function(keyWord) {
		var self = TaskLister;
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
	},

	updateTask: function(updatedTask){
	    var self = TaskLister;
	    console.log(updatedTask);
	    $.each(self.tasks, function(){
	        console.log("comparing" + this.id + " to " + updatedTask.id);
            if(this.id === updatedTask.id){
                console.log(this);
                console.log(updatedTask);
                console.log("and the result:");
                $.extend(this, updatedTask)
                console.log(this);
            }
        });
        console.log(self.tasks[4]);
	}
};