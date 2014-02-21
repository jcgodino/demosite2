function getWorkFlow(id) {
    if (id === "") {
        id = $("#workflowid1").val();
    }

    $.ajax({
        type: "GET",
        url: viewpointWorkflowURL + "?template=" + id + "&submitter=0",
        crossDomain: true,
        dataType: "text"
    })
		.done(function (data) {
		    $('#P5').removeClass("alert-danger");
		    $("#P5").html(data).addClass("alert alert-success").show();
		    //$("#updatesavedsearch").val(JSON.parse(data).data.name);
		    //$("#updatesavedsearchurl").val(JSON.parse(data).data.query);
		})
		.error(function (msg) {
		    $('#P5').removeClass("alert-success");
		    $("#P5").html(msg.responseText).addClass("alert alert-danger").show();
		    //$("#updatesavedsearch").val("");
		    //$("#updatesavedsearchurl").val("");
		    //alert(msg.responseText)
		});
}
function createresolutionrule1() {

    var jsonObj = {
        //workflow ID needs to passed on from the previous panel
        "workflowId": $("td:eq( 0 )").html(),
        "associatedId": $("td:eq( 1 )").html(),
        "type": $("td:eq( 2 )").html(),
        "percentage": $("td:eq( 3 )").html()
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
		    $("#R1").html("Rule Created").addClass("alert alert-success").show()
		})
		.error(function (msg) {
		    $('#R1').removeClass("alert-success");
		    $("#R1").html(msg.responseText).addClass("alert alert-danger").show();
		});


}
function createresolutionrule2() {

    var jsonObj = {
        //workflow ID needs to passed on from the previous panel
        "workflowId": 2,
        "associatedId": 55,
        "type": "template",
        "percentage": "40"
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
		    $("#R2").html("Rule Created").addClass("alert alert-success").show()
		})
		.error(function (msg) {
		    $('#R2').removeClass("alert-success");
		    $("#R2").html(msg.responseText).addClass("alert alert-danger").show();
		});


}

function createresolutionrule3() {

    var jsonObj = {
        //workflow ID needs to passed on from the previous panel
        "workflowId": 3,
        "associatedId": 10,
        "type": "submitter",
        "percentage": "50"
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
		    $("#R3").html("Rule Created").addClass("alert alert-success").show()
		})
		.error(function (msg) {
		    $('#R3').removeClass("alert-success");
		    $("#R3").html(msg.responseText).addClass("alert alert-danger").show();
		});


}

var j = 0;
function getworkflowforsubmitter() {
    for (var i = 0; i < 12;i++) {
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/viewpoint-services/v1/community/resolution?template=" + "55" + "&submitter=" + "10",
            dataType: 'json',
            async: false
        })
		.done(function (data) {
		    $('#Wid').removeClass("alert-danger");
		    if (data.data.id == 3) {
		        j = j + 1;
		        console.log(data.data.id);
		    }else
		    console.log("Nothing executed");
		    $("#Wid").html("Workflow to be executed " + data.data.id + " Was executed "+ j + " Times when a template is submitted 100 Times" ).addClass("alert alert-success").show();
		})
		.error(function (msg) {
		    $('#Wid').removeClass("alert-success");
		    $("#Wid").html(msg.responseText).addClass("alert alert-danger").show();
		});

   }
  
}

function associatetemplate() {

    var jsonObj = {
        //workflow ID needs to passed on from the previous panel
        workflowId: $("#workflowid").val(),
        associatedId: $("#templateid").val(),
        type: "template"
    }

    $.ajax({
        type: "POST",
        url: viewpointWorkflowRuleURL ,
        contentType: "application/json",
        data: JSON.stringify(jsonObj),
        //error: function (data) { alert("ajax error"); },
        dataType: 'json'
    })
		.done(function (data) {
		    $('#associationStatus').removeClass("alert-danger");
		    $("#associationStatus").html("Template Asscoiated!!").addClass("alert alert-success").show()
		})
		.error(function (msg) {
		    $('#associationStatus').removeClass("alert-success");
		    $("#associationStatus").html(msg.responseText).addClass("alert alert-danger").show();
		});
}

function updateWorkflow() {

    var jsonObj = {
        id : $("#workflowid2").val(),
        workflowId: $("#workflowid2").val(),
        associatedId: $("#associatingid").val(),
        type: "template"
    }

    $.ajax({
        type: "PUT",
        url: viewpointWorkflowRuleURL + "/" + $("#workflowid2").val(),
        contentType: "application/json",
        data: JSON.stringify(jsonObj),
        //error: function (data) { alert("ajax error"); },
        dataType: 'json'
    })
		.done(function (data) {
		    $('#updateworkflowStatus').removeClass("alert-danger");
		    $("#updateworkflowStatus").html("Updated!!").addClass("alert alert-success").show()
		})
		.error(function (msg) {
		    $('#updateworkflowStatus').removeClass("alert-success");
		    $("#updateworkflowStatus").html(msg.responseText).addClass("alert alert-danger").show();
		});
}

function deleteWorkflow(id) {
    if (id === "") {
    id = $("workflowid3").val();
    }

    $.ajax({
        type: "DELETE",
        url: viewpointWorkflowRuleURL + "/" + $("#workflowid3").val(),
        crossDomain: true,
        dataType: "text"
    })
		.done(function (data) {
		    $('#P6').removeClass("alert-danger");
		    $("#P6").html(data).addClass("alert alert-success").show();
		})
		.error(function (msg) {
		    $('#P6').removeClass("alert-success");
		    $("#P6").html(msg.responseText).addClass("alert alert-danger").show();
		});
}


