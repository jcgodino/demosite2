var viewpointNotificationTemplateURL = serviceURL + "/notificationtemplates";

var json = {
	name : "",
	id : "",
	fromEmailId : ko.observable("from@ao.com"),
	toEmailId : "to@ao.com",
	emailSubject : "This is subject field",
	emailBody : "The is the body of the email [Tasklink]"
}

var viewModel = {};

function NotificationViewModel(){
	viewModel = ko.mapping.fromJS(json);
	ko.applyBindings(viewModel);
}
function Initialise() {
	NotificationViewModel();
}

function getNotifyTemplates() {
	url1 = viewpointNotificationTemplateURL + "?page=1&size=1000";
	$.ajax({
		type: "GET",
		url: url1,// + SavedSearchRange + SavedSearchOrder,
		crossDomain: true,
		dataType: "text",
		beforeSend: function () {
			$('#templateList2').empty();
		}
	})
		.done(function (data) {


			var templateResults = JSON.parse(data);

			if (templateResults.data.metadata.totalRecords)
				$.each(templateResults.data.notificationTemplates, function (index, template) {
					$('#templateList2').append('<li><a href="#" id="' + template.id + '" class="list-group-item">' + template.name + '</a></li>');
				});

			$(".list-group-item").click(function (event) {
				$.ajax({
					type: "GET",
					url: viewpointNotificationTemplateURL + "/" + event.target.id,
					//context: document.body,
					crossDomain: true,
					dataType: "text"
					//async: false,
					//jsonp: 'json.wrf'
				})
					.done(function (data) {
						var json = JSON.parse(data);
						ko.mapping.fromJS(json.data, viewModel);
					})
			});
		})
}