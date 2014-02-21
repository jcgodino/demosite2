var id1 = "";
var id2 = "";
var id3 = "";
function createresolutionrule1() {

    var jsonObj = {
        //workflow ID needs to passed on from the previous panel
        "workflowId": $("tr:eq( 1 ) td:eq( 0 ) input").val(),
        "associatedId": $("tr:eq( 1 ) td:eq( 1 ) input").val(),
        "type": $("td:eq( 2 )").html(),
        "percentage": $("tr:eq( 1 ) td:eq( 3 ) input").val()
    }

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/viewpoint-services/v1/community/resolution/rules",
        contentType: "application/json",
        data: JSON.stringify(jsonObj),
        dataType: 'json'
    })
		.done(function (data) {
		    $('#R1').removeClass("alert-danger");
		    $("#R1").html("Rule Created").addClass("alert alert-success").show();
		    $("#rule1").attr("disabled", true);
		    id1 = data.data.id;
		    console.log(id1);
		})
		.error(function (msg) {
		    $('#R1').removeClass("alert-success");
		    $("#R1").html(msg.responseText).addClass("alert alert-danger").show();
		});


}

function updateresolutionrule1() {

    var jsonObj = {
        //workflow ID needs to passed on from the previous panel
        "id": id1,
        "workflowId": $("tr:eq( 1 ) td:eq( 0 ) input").val(),
        "associatedId": $("tr:eq( 1 ) td:eq( 1 ) input").val(),
        "type": $("td:eq( 2 )").html(),
        "percentage": $("tr:eq( 1 ) td:eq( 3 ) input").val()
    }

    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/viewpoint-services/v1/community/resolution/rules/"+id1,
        contentType: "application/json",
        data: JSON.stringify(jsonObj),
        dataType: 'json'
    })
		.done(function (data) {
		    $('#R1').removeClass("alert-danger");
		    $("#R1").html("Rule Updated").addClass("alert alert-success").show();
		    $("#rule1").attr("disabled", true);
		    console.log("data.data.id");
		    
		})
		.error(function (msg) {
		    $('#R1').removeClass("alert-success");
		    $("#R1").html(msg.responseText).addClass("alert alert-danger").show();
		});


}


function createresolutionrule2() {

    var jsonObj = {
        //workflow ID needs to passed on from the previous panel
        "workflowId": $("tr:eq( 2 ) td:eq( 0 ) input").val(),
        "associatedId": $("tr:eq( 2 ) td:eq( 1 ) input").val(),
        "type": $("tr:eq( 2 ) td:eq( 2 )").html(),
        "percentage": $("tr:eq( 2 ) td:eq( 3 ) input").val()
    }

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/viewpoint-services/v1/community/resolution/rules",
        contentType: "application/json",
        data: JSON.stringify(jsonObj),
        dataType: 'json'
    })
		.done(function (data) {
		    $('#R2').removeClass("alert-danger");
		    $("#R2").html("Rule Created").addClass("alert alert-success").show();
		    $("#rule2").attr("disabled", true);
		    id2 = data.data.id;
		})
		.error(function (msg) {
		    $('#R2').removeClass("alert-success");
		    $("#R2").html(msg.responseText).addClass("alert alert-danger").show();
		});


}

function updateresolutionrule2() {

    var jsonObj = {
        //workflow ID needs to passed on from the previous panel
        "id": id2,
        "workflowId": $("tr:eq( 2 ) td:eq( 0 ) input").val(),
        "associatedId": $("tr:eq( 2 ) td:eq( 1 ) input").val(),
        "type": $("tr:eq( 2 ) td:eq( 2 )").html(),
        "percentage": $("tr:eq( 2 ) td:eq( 3 ) input").val()
    }

    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/viewpoint-services/v1/community/resolution/rules/" + id2,
        contentType: "application/json",
        data: JSON.stringify(jsonObj),
        dataType: 'json'
    })
		.done(function (data) {
		    $('#R2').removeClass("alert-danger");
		    $("#R2").html("Rule Updated").addClass("alert alert-success").show();
		    $("#rule1").attr("disabled", true);
		    console.log("data.data.id");

		})
		.error(function (msg) {
		    $('#R2').removeClass("alert-success");
		    $("#R2").html(msg.responseText).addClass("alert alert-danger").show();
		});


}

function createresolutionrule3() {

    var jsonObj = {
        //workflow ID needs to passed on from the previous panel
        "workflowId": $("tr:eq( 3 ) td:eq( 0 ) input").val(),
        "associatedId": $("tr:eq( 3 ) td:eq( 1 ) input").val(),
        "type": $("tr:eq( 3 ) td:eq( 2 )").html(),
        "percentage": $("tr:eq( 3 ) td:eq( 3 ) input").val()
    }

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/viewpoint-services/v1/community/resolution/rules",
        contentType: "application/json",
        data: JSON.stringify(jsonObj),
        dataType: 'json'
    })
		.done(function (data) {
		    $('#R3').removeClass("alert-danger");
		    $("#R3").html("Rule Created").addClass("alert alert-success").show();
		    $("#rule3").attr("disabled", true);
		    id3 = data.data.id;
		})
		.error(function (msg) {
		    $('#R3').removeClass("alert-success");
		    $("#R3").html(msg.responseText).addClass("alert alert-danger").show();
		});


}

function updateresolutionrule3() {

    var jsonObj = {
        //workflow ID needs to passed on from the previous panel
        "id": id3,
        "workflowId": $("tr:eq( 3 ) td:eq( 0 ) input").val(),
        "associatedId": $("tr:eq( 3 ) td:eq( 1 ) input").val(),
        "type": $("tr:eq( 3 ) td:eq( 2 )").html(),
        "percentage": $("tr:eq( 3 ) td:eq( 3 ) input").val()
    }

    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/viewpoint-services/v1/community/resolution/rules/" + id3,
        contentType: "application/json",
        data: JSON.stringify(jsonObj),
        dataType: 'json'
    })
		.done(function (data) {
		    $('#R3').removeClass("alert-danger");
		    $("#R3").html("Rule Updated").addClass("alert alert-success").show();
		    $("#rule1").attr("disabled", true);
		    console.log(data.data.id);

		})
		.error(function (msg) {
		    $('#R3').removeClass("alert-success");
		    $("#R3").html(msg.responseText).addClass("alert alert-danger").show();
		});


}




function getworkflowforsubmitter() {
    var j = 0;
    for (var i = 0; i < $('#fre').val();i++) {
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/viewpoint-services/v1/community/resolution?template=" + $('#temp').val() + "&submitter=" + $('#sub').val(),
            dataType: 'json',
            async: false
        })
		.done(function (data) {
		    $('#Wid').removeClass("alert-danger");
		    if (data.data.id >0) {
		        j = j + 1;
		        console.log(data.data.id);
		    }else
		    console.log("Nothing executed");
		    $("#Wid").html("Workflow to be executed " + data.data.id + " Was executed " + j + " Times when a template is submitted " + $('#fre').val() + " Times").addClass("alert alert-success").show();
		})
		.error(function (msg) {
		    $('#Wid').removeClass("alert-success");
		    $("#Wid").html(msg.responseText).addClass("alert alert-danger").show();
		});

   }
  
}








