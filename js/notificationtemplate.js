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

function addNotificationEvent(eventName) {
	theId = "eventID_" + increment;
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