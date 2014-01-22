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

function updateWorkflow() {

    var jsonObj = {
        id: $("#GetSearchIP").val(),
        name: $("#updatesavedsearch").val(),
        query: $("#updatesavedsearchurl").val()
    }

    $.ajax({
        type: "PUT",
        url: viewpointSSBasePath + "/" + $("#GetSearchIP").val(),
        contentType: "application/json",
        data: JSON.stringify(jsonObj),
        //error: function (data) { alert("ajax error"); },
        dataType: 'json'
    })
		.done(function (data) {
		    $('#updatesavedsearchStatus').removeClass("alert-danger");
		    $("#updatesavedsearchStatus").html("SAVED!!").addClass("alert alert-success").show()
		})
		.error(function (msg) {
		    $('#updatesavedsearchStatus').removeClass("alert-success");
		    $("#updatesavedsearchStatus").html(msg.responseText).addClass("alert alert-danger").show();
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


