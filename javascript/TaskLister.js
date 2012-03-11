var TaskLister = {

	init: function (config) {
		var defaults = {
		}; 
		config = $.extend({}, defaults, config); 
		this.config = config;
		this.notification = $('.notification');

		var taskItemSource = $("#taskItem-template").html();
		this.taskItemTemplate = Handlebars.compile(taskItemSource); 
		this.fetchAllTasks();
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

	fetchTaskDummy: function (id) {
		if(id == 1) {
			return {"id": "1",
					"header": "Clean the room",
					"urgency": "2",
					"importance": "3",
					"deadline": "20:00 2012/08/24",
					"description": "Mingi pikem tekst. Mingi pikem tekst. Mingi pikem tekst.Mingi pikem tekst.",
					"status": "backlog"}
		} else if(id == 2) {
			return {"id": "2",
					"header": "Fix the car",
					"urgency": "4",
					"importance": "2",
					"deadline": "14:00 2020/08/14",
					"description": "Auto ikka katki",
					"status": "backlog"}
		} else if(id == 3) {
			return {"id": "3",
					"header": "Fix the car",
					"urgency": "4",
					"importance": "2",
					"deadline": "14:00 2020/08/14",
					"description": "Auto ikka katki",
					"status": "development"}
		} else if(id == 4) {
			return {"id": "4",
					"header": "Fix the car",
					"urgency": "4",
					"importance": "2",
					"deadline": "14:00 2020/08/14",
					"description": "Auto ikka katki",
					"status": "testing"}
		} else if(id == 5) {
			return {"id": "5",
					"header": "Fix the car",
					"urgency": "4",
					"importance": "2",
					"deadline": "14:00 2020/08/14",
					"description": "Auto ikka katki",
					"status": "done"}
		} else if(id == 6) {
			return {"id": "6",
					"header": "Fix the car",
					"urgency": "4",
					"importance": "2",
					"deadline": "14:00 2020/08/14",
					"description": "Auto ikka katki",
					"status": "done"}
		}
	},

	fetchAllTasks: function(){
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
				self.drawTask(taskData);
			}).fail(function(){
				self.drawTask(self.fetchTaskDummy(id));
			});
			bar.css('width', function(){
				return (index+1)*100 / numberOfTasks + "%";
			});
		});
		self.notification.children(".progress")
			.removeClass("active")
			.removeClass("progress-info")
			.removeClass("progress-striped")
			.addClass("progress-success");
		self.notification.delay(2000).slideToggle();
	},

	drawTask: function(taskData) {
		var self = TaskLister;
		var taskHTML = self.taskItemTemplate(taskData);
		$("#" + taskData.status).append(taskHTML);
	}


};