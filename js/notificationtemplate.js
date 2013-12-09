var viewpointNotificationTemplateURL = serviceURL + "/notificationtemplates";

var increment = 1;
var selectedEventID = "";

function getEmailTemplate(id) {
	$("#"+selectedEventID).removeClass("active");
	selectedEventID = id;
	$("#"+selectedEventID).addClass("active");

	$.ajax({
		type: "GET",
		url: viewpointNotificationTemplateURL + "/" + selectedEventID,
		//context: document.body,
		crossDomain: true,
		dataType: "text"
		//async: false,
		//jsonp: 'json.wrf'
	})
		.done(function (data) {
			//$('#asset').html(JSON.stringify(data, undefined, 2));
			$('#notificationStatus').removeClass("alert-danger");
			$('#notificationStatus').html(data).addClass("alert alert-success").show();
			//$('#asset').addClass("jumbotron").show();
		})
		.error(function (msg) {
			$('#notificationStatus').removeClass("alert-success");
			$('#notificationStatus').html(msg.responseText).addClass("alert alert-danger").show();
			//alert(msg.responseText)
		})
}

function  createNotificationTemplate() {
	var jsonObj = {
		name: $("#notificationNameEntry").val(),
		fromEmailId: "fromEmailId@ao.com",
		//defaultToEmailId: "defaultToEmailId",
		toEmailId: "toEmailId@ao.com",
		//errorToEmailId: "errorToEmailId",
		emailSubject: "emailSubject",
		emailBody: "emailBody"
		//notificationType: "notificationType"
	}

	$.ajax({
		type: "POST",
		url: viewpointNotificationTemplateURL,
		contentType: "application/json",
		data: JSON.stringify(jsonObj),
		//error: function (data) { alert("ajax error"); },
		dataType: 'json'
	})
		.done(function (data) {
			$('#notificationStatus').removeClass("alert-danger");
			$("#notificationStatus").html("SAVED!!").addClass("alert alert-success").show();

		    $('#eventList').append('<li><a href="#" id="' + data.data.id + '" class="list-group-item">' + $("#notificationNameEntry").val() + '</a></li>');
			$(".list-group-item").click(function(event){
				getEmailTemplate(event.target.id);
			})

			$("#notificationNameEntry").val("");
		})
		.error(function (msg) {
			//alert(msg.responseText);
			$('#notificationStatus').removeClass("alert-success");
			$("#notificationStatus").html(msg.responseText).addClass("alert alert-danger").show();
		});
}

function onsaveNotification(event) {
	$("#newNotificationName").slideToggle();
	createNotificationTemplate();
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
			//alert(msg.responseText);
			return false;
		});
}
function addNotificationEvent(eventName) {
	$("#newNotificationName").slideToggle();
}

function removeNotificationEvent() {
	$.ajax({
		type: "DELETE",
		url: viewpointNotificationTemplateURL + "/" + selectedEventID,
		crossDomain: true,
		dataType: "text"
	})
		.done(function (data) {
			$('#notificationStatus').removeClass("alert-danger");
			$("#notificationStatus").html("Deleted").addClass("alert alert-success").show();
			$("#"+selectedEventID).remove()
		})
		.error(function (msg) {
			$('#notificationStatus').removeClass("alert-success");
			$("#notificationStatus").html(msg.responseText).addClass("alert alert-danger").show();
		});
}


function setupNotificationEventHandlers() {
	$("#newNotificationName").slideToggle(0);
}

function updateNotificationTemplate() {
	var name = $("#"+selectedEventID).text();
	var jsonObj = {
		id: selectedEventID,
		name: name,
		fromEmailId: $("#fromField").val(),
		//defaultToEmailId: "defaultToEmailId",
		toEmailId: $("#toField").val(),
		//errorToEmailId: "errorToEmailId",
		emailSubject: $("#subjectField").val(),
		emailBody: $("#emailBody").val()
		//notificationType: "notificationType"
	}
	//alert(JSON.stringify(jsonObj));
	$.ajax({
		type: "PUT",
		url: viewpointNotificationTemplateURL + "/" + selectedEventID,
		contentType: "application/json",
		data: JSON.stringify(jsonObj),
		//error: function (data) { alert("ajax error"); },
		dataType: 'json'
	})
		.done(function (data) {
			$('#notificationStatus').removeClass("alert-danger");
			$("#notificationStatus").html("Updated").addClass("alert alert-success").show()
		})
		.error(function (msg) {
			$('#notificationStatus').removeClass("alert-success");
			$("#notificationStatus").html(msg.responseText).addClass("alert alert-danger").show();
		});
}