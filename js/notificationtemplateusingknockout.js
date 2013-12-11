var viewpointNotificationTemplateURL = serviceURL + "/notificationtemplates";

var json = {
	name: "",
	id: "",
	fromEmailId: ko.observable("from@ao.com"),
	toEmailId: "to@ao.com",
	emailSubject: "This is subject field",
	emailBody: "The is the body of the email [Tasklink]"
}

var viewModel = {};

function NotificationViewModel() {
	viewModel = ko.mapping.fromJS(json);
	ko.applyBindings(viewModel);
}
function Initialise() {
	NotificationViewModel();
}

function getTemplate(id) {
	$.ajax({
		type: "GET",
		url: viewpointNotificationTemplateURL + "/" + id,
		crossDomain: true,
		dataType: "text"
	}).done(function (data) {
			var json = JSON.parse(data);
			ko.mapping.fromJS(json.data, viewModel);
		});
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
	}).done(function (data) {
			var templateResults = JSON.parse(data);
			if (templateResults.data.metadata.totalRecords)
				$.each(templateResults.data.notificationTemplates, function (index, template) {
					$('#templateList2').append('<li><a href="#" id="' + template.id + '" class="list-group-item">' + template.name + '</a></li>');
				});

			$(".list-group-item").click(function (event) {
				getTemplate(event.target.id)
			});
		})
}

function updateNotifyTemplate() {
	var jsonObj = ko.mapping.toJS(viewModel);
	$.ajax({
		type: "PUT",
		url: viewpointNotificationTemplateURL + "/" + jsonObj.id,
		contentType: "application/json",
		data: JSON.stringify(jsonObj),
		dataType: 'json'
	})
		.done(function (data) {
			$('#updateStatus').removeClass("alert-danger");
			$("#updateStatus").html("Updated").addClass("alert alert-success").show()
		})
		.error(function (msg) {
			$('#updateStatus').removeClass("alert-success");
			$("#updateStatus").html(msg.responseText).addClass("alert alert-danger").show();
		});
}