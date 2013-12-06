function getSavedSearch(id) {
	if (id === "") {
		id = $("#GetSearchIP").val();
	}

	$.ajax({
		type: "GET",
		url: viewpointSaveSearchURL + "/" + id,
		crossDomain: true,
		dataType: "text"
	})
		.done(function (data) {
			$('#P5').removeClass("alert-danger");
			$("#P5").html(data).addClass("alert alert-success").show();
			$("#updatesavedsearch").val(JSON.parse(data).data.name);
			$("#updatesavedsearchurl").val(JSON.parse(data).data.query);
		})
		.error(function (msg) {
			$('#P5').removeClass("alert-success");
			$("#P5").html(msg.responseText).addClass("alert alert-danger").show();
			$("#updatesavedsearch").val("");
			$("#updatesavedsearchurl").val("");
			//alert(msg.responseText)
		});
}

function updateSavedSearch() {

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

function deleteSavedSearch() {
	//if (id === "") {
	id = $("#deletesavedsearch").val();
	//}

	$.ajax({
		type: "DELETE",
		url: viewpointSaveSearchURL + "/" + id,
		crossDomain: true,
		dataType: "text"
	})
		.done(function (data) {
			//$("#P4").css('visibility', 'visible');
			//$("#P5").html(JSON.stringify(data));
			$('#P6').removeClass("alert-danger");
			$("#P6").html(data).addClass("alert alert-success").show();
			//$("#updatesavedsearch").val(JSON.parse(data).data.name);
		})
		.error(function (msg) {
			$('#P6').removeClass("alert-success");
			$("#P6").html(msg.responseText).addClass("alert alert-danger").show();
			//alert(msg.responseText)
		});
}

