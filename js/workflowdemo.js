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


