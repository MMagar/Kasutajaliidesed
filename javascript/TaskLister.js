var TaskLister = {

	init: function (config) {
		var defaults = {
		}; 
		config = $.extend({}, defaults, config); 
		this.config = config;

		var taskItemSource = $("#taskItem-template").html();
		this.taskItemTemplate = Handlebars.compile(taskItemSource); 
		this.fetchAllTasks();
	},

	fetchTaskIDs: function(){
		TaskLister.idList = [1,2];
	},

	fetchTask: function(id) {
		if(id == 1){
			return {"id": "1",
					"header": "Clean the room",
					"urgency": "2",
					"importance": "3",
					"deadline": "20:00 2012/08/24",
					"description": "Mingi pikem tekst. Mingi pikem tekst. Mingi pikem tekst.Mingi pikem tekst.",
					"status": "backlog"}
		} else {
			return {"id": "2",
					"header": "Fix the car",
					"urgency": "4",
					"importance": "2",
					"deadline": "14:00 2020/08/14",
					"description": "Auto ikka katki",
					"status": "testing"}
		}
	},

	fetchAllTasks: function(){
		var self = TaskLister;
		self.fetchTaskIDs();
		$.each(self.idList, function(index, id){
			self.drawTask(self.fetchTask(id));
		});
	},

	drawTask: function(taskData) {
		var self = TaskLister;
		var taskHTML = self.taskItemTemplate(taskData);
		$("#" + taskData.status).append(taskHTML);
	}
};