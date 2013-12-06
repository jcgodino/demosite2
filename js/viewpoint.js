

function getAsset(assetID) {
	$.ajax({
		type: "GET",
		url: viewpointSearchURL + "/" + assetID,
		//context: document.body,
		crossDomain: true,
		dataType: "text"
		//async: false,
		//jsonp: 'json.wrf'
	})
		.done(function (data) {
			//$('#asset').html(JSON.stringify(data, undefined, 2));
			$('#asset').removeClass("alert-danger");
			$('#asset').html(data).addClass("alert alert-success").show();
			//$('#asset').addClass("jumbotron").show();
		})
		.error(function (msg) {
			$('#asset').removeClass("alert-success");
			$('#asset').html(msg.responseText).addClass("alert alert-danger").show();
			//alert(msg.responseText)
		})
}

function myFunctionSearch() {
	var query = $('#q3').val();
	if (query === "") {
		query = "*";
	}

	$.ajax({
		type: "GET",
		url: viewpointSearchURL + "/search/"
			//+ solrSearchField
			+ query + range + order,
		//+ solrParams,
		crossDomain: true,
		dataType: "text",
		//dataType: "jsonp",
		//jsonp : "json.wrf",
		//headers: {"Access-Control-Allow-Origin": "*"},
		//async: true,
		beforeSend: function () {
			$('#assetsList').empty();
			$('#asset').hide();
		}
	}).done(function (data) {
			$('#P1').removeClass("alert-danger");
			$('#P1').text("Here's the response: ").addClass("alert-success");

			var searchResults = JSON.parse(data);

			$.each(searchResults.data.assets, function (i, asset) {
				$('#assetsList').append('<li><a href="#" id="' + asset.id + '" class="list-group-item">' + asset.name + '</a></li>');
			});
			$(".list-group-item").click(function (event) {
				getAsset(event.target.id);
			});

			createPagination(searchResults.data.metadata.totalRecords);
		})
		.error(function (data) {
			$('#P1').removeClass("alert-success");
			$('#P1').text("ERROR").addClass("alert-danger");

			$('#asset').text(data.responseText).addClass("alert alert-danger").show();
			$('#PaginationNavi').empty();
		})
}

function createPagination(totalRecords) {
	pages = totalRecords / 10;

	$('#PaginationNavi').empty();
	for (var i = 1; (i < 11) && (i < pages); i++) {

		$('#PaginationNavi').append('<li><a href="#" id="' + i + '">' + i + '</a></li>');

		$('#' + i).click(function () {
			range = "?page=" + this.id + "&size=" + pageSize;
			myFunctionSearch();
		})
	}

	createThePagination = false;
	//$('#PaginationNavi').append('<li><a href="#">&raquo;</a></li>');
}

function onKeyUpCalled(e) {
	var enterKey = 13;
	if (e.keyCode == enterKey) {
		e.preventDefault();
		myFunctionSearch();
	}
	return false;
}

function init() {
	alert("onload");
	alert($('#engSelected').text());
}

$(window).load(function () {
	$('#engSelected').click(function (e) {
		viewpointAssetBasePath = "/viewpoint-services/v1.0/en_EN/assets";
		viewpointSearchURL = baseURL + viewpointAssetBasePath;
	});

	$('#turSelected').click(function (e) {
		viewpointAssetBasePath = "/viewpoint-services/v1.0/tr_TR/assets";
		viewpointSearchURL = baseURL + viewpointAssetBasePath;
	});

	$("#GetSearch").click(function () {
		getSavedSearch($("#GetSearchIP").val());
	});
});

function setupNoOfAssetsToShow() {
	$('#A1').click(function (e) {
		range = "?page=1&size=10"
		pageSize = 10
	});
	$('#A2').click(function (e) {
		range = "?page=1&size=20"
		pageSize = 20
	});
	$('#A3').click(function (e) {
		pageSize = 30
		range = "?page=1&size=30"
	});
	$('#A4').click(function (e) {
		pageSize = 40
		range = "?page=1&size=40"
	});
	$('#A5').click(function (e) {
		pageSize = 50
		range = "?page=1&size=50"
	});

	$('#A6').click(function (e) {
		order = "&order=name_string:desc";
	});

	$('#A7').click(function (e) {
		order = "&order=name_string:asc";
	});
}

function GetURL() {
	var query = $('#q3').val();
	var url = viewpointSearchURL + "/search/" + query + range;
	return url;
}

function saveSearch() {
	var jsonObj = {
		name: $("#saveSearchName").val(),
		query: GetURL()
	}
	var id;

	$.ajax({
		type: "POST",
		url: viewpointSSBasePath,
		contentType: "application/json",
		data: JSON.stringify(jsonObj),
		error: function (data) {
			alert("ajax error");
		},
		dataType: 'json'
	})
		.done(function (data) {
			$("#savedid").html(data.data.id);
			$("#GetSearchIP").val(data.data.id);
			id = data.data.id;
		});

	$("#savedid").click(function () {
		getSavedSearch($("#savedid").text());
	});

	$("#GetSearch").click(function () {
		getSavedSearch($("#GetSearchIP").val());
	});

	return id;
}
