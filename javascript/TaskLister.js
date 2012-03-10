var TaskLister = {

	init: function (config) {
		var defaults = { 
		}; 
		config = $.extend({}, defaults, config); 
		this.config = config;

		var taskItemSource = $("#taskItem-template").html();
		this.taskItemTemplate = Handlebars.compile(taskItemSource); 
		this.fetchAllTasks();
		this.drawAllTasks();
	},

	fetchAllTasks: function(){
		this.tasksData = {"taskItems":[
					{"header": "Clean the room",
					"urgency": "2",
					"importance": "3",
					"deadline": "20:00 2012/08/24",
					"description": "Mingi pikem tekst. Mingi pikem tekst. Mingi pikem tekst.Mingi pikem tekst.",
					"status": "started"},
					
					{"header": "Fix the car",
					"urgency": "4",
					"importance": "2",
					"deadline": "14:00 2020/08/14",
					"description": "Auto ikka katki",
					"status": "started"}]	
				};
	},

	drawAllTasks: function() {
		var self = TaskLister;
		var tasksHTML = taskItemTemplate(self.tasksData);
		$('.taskList').append(result);
	}
};