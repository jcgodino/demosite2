var id1;
var unifiedTaskListSortfield = "&sortField=TASKNAME"
var currentReviewTaskInteractiveID = "";
var reviewCommentsText = "";

function createcomment() {
	var d = new Date();
	var jsonObj = {
		"taskid": $("#taskid1").val(),
		"timestamp": d.getFullYear() + '-02-' + d.getDate() + 'T' + d.getHours() + ':' + ('0' + d.getMinutes()).slice(-2) + ':' + ('0' + d.getSeconds()).slice(-2),
		"user": {
			"id": $("#username").val(),
			"first": "Volumnia",
			"last": "Dedlock",
			"title": "",
			"role": "admin",
			"email": "volumnia.dedlock@example.com",
			"type": "user"
		},
		"comment": $("#comment").val(),
		"status": $('input[name="approve"]:checked').val()
	}
	//console.log(d.getFullYear() + '-02-' + d.getDate() + 'T' + d.getHours() + ':' + ('0' + d.getMinutes()).slice(-2) + ':' + ('0' + d.getSeconds()).slice(-2);
	$.ajax({
		type: "POST",
		// url: "http://uksearchdev:8080/viewpoint-services/v1/community/comments",
		url: "http://localhost:8080/viewpoint-services/v1/community/comments",
		contentType: "application/json",
		data: JSON.stringify(jsonObj),
		dataType: 'json'
	})
		.done(function (data) {
			$('#c1').removeClass("alert-danger");
			$("#c1").html("Comment Added").addClass("alert alert-success").show();
			id1 = data.data.id;
			console.log(id1);
			$("#commentid").val(id1);
			listcomment();
		})
		.error(function (msg) {
			$('#c1').removeClass("alert-success");
			$("#c1").html(msg.responseText).addClass("alert alert-danger").show();
			console.log("something went wrong");
			console.log(msg);
		});


}

function getcomment() {

	$.ajax({
		type: "GET",
		//url: "http://uksearchdev:8080/viewpoint-services/v1/community/comments/" + $("#commentid").val(),
		url: "http://localhost:8080/viewpoint-services/v1/community/comments/" + $("#commentid").val(),
		contentType: "application/json",
		dataType: 'json'
	})
		.done(function (data) {
			$('#name').html("Comment : " + data.data.comment + "<br>").addClass("alert alert-success").show();
			$('#name').append("Name : " + data.data.user.first + " " + data.data.user.last + "<br>").addClass("alert alert-success").show();
			$('#name').append("Time Stamp : " + data.data.timestamp + "<br>").addClass("alert alert-success").show();
			$('#name').append("Status : " + data.data.status + "<br>").addClass("alert alert-success").show();

		})
		.error(function (msg) {
			$('#name').removeClass("alert-success");
			$("#name").html(msg.responseText).addClass("alert alert-danger").show();
			console.log("something went wrong");
			console.log(msg);
		});


}


function updatecomment() {
	var d = new Date();
	var jsonObj = {
		"id": id1,
		"taskid": "5e1d005e-9d58-11e3-8d05-425861b86ab6",
		"timestamp": d.getFullYear() + '-02-' + d.getDate() + 'T' + d.getHours() + ':' + ('0' + d.getMinutes()).slice(-2) + ':' + ('0' + d.getSeconds()).slice(-2),
		"user": {
			"id": "vo001de",
			"first": "Volumnia",
			"last": "Dedlock",
			"title": "",
			"role": "admin",
			"email": "volumnia.dedlock@example.com",
			"type": "user"
		},
		"comment": $("#comment").val(),
		"status": $('input[name="approve"]:checked').val()
	}
	//console.log(d.getFullYear() + '-02-' + d.getDate() + 'T' + d.getHours() + ':' + ('0' + d.getMinutes() ).slice(-2) + ':' +  ('0' + d.getSeconds()).slice(-2);
	$.ajax({
		type: "PUT",
		//url: "http://uksearchdev:8080/viewpoint-services/v1/community/comments/" + id1,
		url: "http://localhost:8080/viewpoint-services/v1/community/comments/" + id1,
		contentType: "application/json",
		data: JSON.stringify(jsonObj),
		dataType: 'json'
	})
		.done(function (data) {
			$('#c1').removeClass("alert-danger");
			$("#c1").html("Comment Updated").addClass("alert alert-success").show();
			id1 = data.data.id;
			console.log(id1);
		})
		.error(function (msg) {
			$('#c1').removeClass("alert-success");
			$("#c1").html(msg.responseText).addClass("alert alert-danger").show();
			console.log("something went wrong");
			console.log(msg);
		});


}

function searchForTask() {
	searchString = $('#searchForTaskQuery').val();
	$.ajax({
		type: "GET",
		//url: "http://uksearchdev:8080/viewpoint-services/v1/EngageOne/unified/tasks?userId=user1",
		url: "http://localhost:8080/viewpoint-services/v1/EngageOne/unified/tasks?userId=user1&taskName=" + $('#searchForTaskQuery').val() + unifiedTaskListSortfield,
		contentType: "application/json",
		dataType: 'json'
	})
		.done(function (foo) {
			$('#tasklist').html(foo).addClass("alert alert-success").show();
			console.log(foo);
			console.log(foo.data);
			var type;
			$.each(foo.data.tasks, function (i, task) {
				$('#tasklist').append('<li><a href="#" id="' + task.uriToGetTaskDetails + '" class="list-group-item"><span>Task Description : </span>' + task.description + '<br> Type :<i>' + task.type + '</i></a></li>');
			});

			$(".list-group-item").click(function (event) {
				gettaskdetails(event.target.id);
			});

		})
		.error(function (msg) {
			$('#tasklist').removeClass("alert-success");
			$("#tasklist").html(msg.responseText).addClass("alert alert-danger").show();
			console.log("something went wrong");
			console.log(msg);
		});
}
function listunifiedtask() {

	$.ajax({
		type: "GET",
		//url: "http://uksearchdev:8080/viewpoint-services/v1/EngageOne/unified/tasks?userId=user1",
		url: "http://localhost:8080/viewpoint-services/v1/EngageOne/unified/tasks?userId=user1" + unifiedTaskListSortfield,
		contentType: "application/json",
		dataType: 'json'
	})
		.done(function (foo) {
			$('#tasklist').html(foo).addClass("alert alert-success").show();
			console.log(foo);
			console.log(foo.data);
			var type;
			$.each(foo.data.tasks, function (i, task) {
				taskName = "";
				if (task.type === "interactive")
					taskName = task.externalId;
				else
					taskName = task.name;
				$('#tasklist').append('<li><a href="#" id="' + task.uriToGetTaskDetails + '" class="list-group-item"><span>Task Description : </span>' + taskName + '<br> Type :<i>' + task.type + '</i></a></li>');
			});

			$(".list-group-item").click(function (event) {
				gettaskdetails(event.target.id);
			});

		})
		.error(function (msg) {
			$('#tasklist').removeClass("alert-success");
			$("#tasklist").html(msg.responseText).addClass("alert alert-danger").show();
			console.log("something went wrong");
			console.log(msg);
		});


}
var externalid;

function gettaskdetails(uriToGetTaskDetails) {
	$.ajax({
		type: "GET",
		url: "http://localhost:8080" + uriToGetTaskDetails,
		crossDomain: true,
		dataType: 'json'

	})
		.done(function (dataCommingFromServer) {
			if (dataCommingFromServer.data.type === "interactive")
				showInteractiveTask(dataCommingFromServer);
			else
				showReviewTask(dataCommingFromServer);
		})
		.error(function (msg) {
			$('#taskdetails').removeClass("alert-success");
			$('#taskdetails').html(msg.responseText).addClass("alert alert-danger").show();
			//alert(msg.responseText)
		})
}

function showInteractiveTask(InteractiveTask) {
	$('#interactiveTaskDetails').modal('show');
	$('#eoTemplateName').html(InteractiveTask.data.template.name);
	$('#eoTemplatePath').html(InteractiveTask.data.template.path);
	$('#eoLastActivity').html(InteractiveTask.data.lastModifiedDate);
	$('#eoTaskName').html(InteractiveTask.data.externalId);
	$('#eoAssignee').html(InteractiveTask.data.createdBy);
	$('#eoStatus').html(InteractiveTask.data.status);
	$.each(InteractiveTask.data, function (k, v) {
		if (k === "comments") {
			$('#eoTaskComments').html("");
			$.each(InteractiveTask.data.comments, function (i, comment) {
				var commentText = '<br>';
				if (comment.status === "approved") {
					commentText = "<b>Approved by</b> "
				}
				else {
					commentText = "<b>Rejected by</b> "
				}
				commentText += comment.user.first;
				commentText += ' ';
				commentText += comment.user.last;
				commentText += ' at ';
				commentText += comment.timestamp;
				commentText += '<br>';
				commentText += comment.comment;
				commentText += '<br>';
				commentText += '<br>';
				$('#eoTaskComments').append(commentText);
			})
		}
	});
}

function showReviewTask(ReviewTask) {
	$('#reviewTaskDetails').modal('show');
	$("#wfCommentInput").val("");
	$('#wfTaskName').html(ReviewTask.data.taskName);
	$('#detailsTaskName').html(ReviewTask.data.taskName);
	$('#wfTemplateName').html(ReviewTask.data.templateName);
	$('#wfTemplatePath').html(ReviewTask.data.templateFolder);
	$('#eoSubmittedBy').html(ReviewTask.data.submittedBy);
	$('#wfSubmittedDate').html(ReviewTask.data.submittedDate);
	$('#wfAssignee').html(ReviewTask.data.assignedTo);
	currentReviewTaskInteractiveID = ReviewTask.data.externalReferenceId;
	reviewCommentsText = '<br>';
	$.each(ReviewTask.data, function (k, v) {
		if (k === "comments") {
			$('#eoTaskComments').html("");
			$.each(ReviewTask.data.comments, function (i, comment) {
				if (reviewCommentsText.status === "approved") {
					reviewCommentsText += "<b>Approved by</b> "
				}
				else {
					reviewCommentsText += "<b>Rejected by</b> "
				}
				reviewCommentsText += comment.user.first;
				reviewCommentsText += ' ';
				reviewCommentsText += comment.user.last;
				reviewCommentsText += ' at ';
				reviewCommentsText += comment.timestamp;
				reviewCommentsText += '<br>';
				reviewCommentsText += comment.comment;
				reviewCommentsText += '<br>';
				reviewCommentsText += '<br>';
			})
		}
	});
}

function showReviewComments() {
	$('#reviewTaskDetailsComments').modal('show');
	$('#wkTaskComments').html(reviewCommentsText);
}

function saveComment(btnId) {
	status = "";
	if (btnId === "btnApprove") {
		status = "approved";
	}
	else if (btnId === "btnReject") {
		status = "Rejected";
	}

	var d = new Date();
	//timeStampNow =  d.getFullYear() + '-02-' + d.getDate() + 'T' + d.getHours() + ':' + ('0' + d.getMinutes()).slice(-2) + ':' + ('0' + d.getSeconds()).slice(-2);
	timeStampNow = d.toISOString().substring(0, d.toISOString().length - 5);
	//alert(timeStampNow);

	var jsonObj = {
		"taskid": currentReviewTaskInteractiveID,
		"timestamp": timeStampNow,
		"user": {
			"id": "vo001de",
			"first": "Volumnia",
			"last": "Dedlock",
			"title": "",
			"role": "admin",
			"email": "volumnia.dedlock@example.com",
			"type": "user"
		},
		"comment": $("#wfCommentInput").val(),
		"status": status
	}

	$.ajax({
		type: "POST",
		//url: "http://uksearchdev:8080/viewpoint-services/v1/community/comments/" + id1,
		url: "http://localhost:8080/viewpoint-services/v1/EngageOne/comments",
		contentType: "application/json",
		data: JSON.stringify(jsonObj),
		dataType: 'json'
	})
		.done(function (data) {
			//$('#c1').removeClass("alert-danger");
			//$("#c1").html("Comment Updated").addClass("alert alert-success").show();
			id1 = data.data.id;
			console.log(id1);
		})
		.error(function (msg) {
			//$('#c1').removeClass("alert-success");
			//$("#c1").html(msg.responseText).addClass("alert alert-danger").show();
			console.log("something went wrong");
			console.log(msg);
		});
}

function createworkflow2() {

	var d = new Date();
	var Url = "/viewpoint-services/v1/EngageOne/workflow/definitions";
	var jsonObj = {
		name: "Sample workflow with one steps" + ('0' + d.getMinutes()).slice(-2),
		description: "Description of sample workflow with one steps" + ('0' + d.getMinutes()).slice(-2),
		availableForUse: true,
		steps: [
			{
				type: "review",
				name: "sample step 1",
				description: null,
				reviewers: ["user4"],
				approvalMode: "ANYONE",
				groupApprovalMode: "ANYONE"
			}
		]

	}

	$.ajax({
		type: "POST",
		url: Url,
		contentType: "application/json",
		data: JSON.stringify(jsonObj),
		dataType: 'json'
	})

		.done(function (data) {

			initiateworkflow(data.data.id);
			$('#workflowlog').html(data.data.id);


		})
		.error(function (msg) {
			alert(JSON.stringify(msg));
			console.log("something went wrong");
			console.log(msg);
			$('#workflowlog').html(msg);
		});

}

function initiateworkflow(id) {

	var jsonObj = {
		"submitterId": "user1",
		"externalReferenceId": externalid,
	}

	$.ajax({
		type: "POST",
		url: "/viewpoint-services/v1/EngageOne/workflow/definitions/" + id,
		contentType: "application/json",
		data: JSON.stringify(jsonObj),
		dataType: 'json'
	})
		.done(function (data) {
			$('#taskid2').html(dataCommingFromServer.data.id);

		})
		.error(function (msg) {
			console.log("something went wrong");
			console.log(msg);
		});


}