var viewpointNotificationTemplateURL = serviceURL + "/notificationsTemplates";

var increment = 1;
var selectedEventID = "";

function getEmailTemplate(id) {
	$("#"+selectedEventID).removeClass("active");
	selectedEventID = id;
	$("#"+selectedEventID).addClass("active");
}

function saveNotificationTemplate() {
	alert("saveNotificationTemplate()");
}

function isThereAnyNotificationTemplates(){
	$.ajax({
		type: "GET",
		url: viewpointNotificationTemplateURL,
		crossDomain: true,
		dataType: "text"
	})
		.done(function (data) {
			var searchResults = JSON.parse(data);

			if (searchResults.data.metadata.totalRecords)
			return true;
				else
			return false;
		})
		.error(function (msg) {
			alert(msg.responseText);
			return false;
		});
}
function addNotificationEvent(eventName) {
	theId = "eventID_" + increment;

	if (isThereAnyNotificationTemplates())
		return;

	$("#eventList").append("<a href=\"#\" id=\"" + theId + "\" class=\"list-group-item\">" + eventName + "</a>");

	$(".list-group-item").click(function (event) {
		getEmailTemplate(event.target.id);
	});
	increment += 1;
}

function removeNotificationEvent() {
	alert("removeNotificationEvent()");
}

function eventSelected(e) {
	alert("eventSelected()");
}

function setupNotificationEventHandlers() {
	addNotificationEvent("Start Workflow");
	addNotificationEvent("Approve");
	addNotificationEvent("Reject");
	addNotificationEvent("Workflow Completed");
}