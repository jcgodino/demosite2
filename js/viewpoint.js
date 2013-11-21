//var baseURL = "http://uksearchdev:8080";
//var baseURL = "http://g1cg1d:8080";
var baseURL = "http://localhost:8080";
var viewpointAssetBasePath = "/viewpoint-services/v1/assets";
var viewpointSSBasePath = "/viewpoint-services/v1/savedsearches";
var viewpointSearchURL = baseURL + viewpointAssetBasePath;
var viewpointSaveSearchURL = baseURL + viewpointSSBasePath;
var incIndent = "&indent=true";
var solrWriter = "&wt=json"
var solrFieldList = "&fl=name,index_id";
var solrParams = incIndent + solrWriter + solrFieldList
var solrSearchField = "collector:"
var range = "?page=1&size=10";
var pageSize = 10;
var createThePagination = true;
var order = "&order=name_string:desc";
var SavedSearchRange = "?page=1&size=10";
var SavedSearchOrder = "&order=name:desc";
var SearchSavedSearchCase = "case=sensitive"   // sensitive        insensitive

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
		//jsonp : "json.wrf",
		//async: true,
		beforeSend: function () {
			$('#assetsList').empty();
			$('#asset').hide();
		}
	})
		.done(function (data) {
			$('#P1').removeClass("alert-danger");
			$('#P1').text("Here's the response: ").addClass("alert-success");

			var searchResults = JSON.parse(data);

			$.each(searchResults.data.assets, function (i, asset) {
				$('#assetsList').append('<li><a href="#" id="' + asset.id + '" class="list-group-item">' + asset.name + '</a></li>');
			});
			$(".list-group-item").click(function (event) {
				getAsset(event.target.id);
			});
			//if(createThePagination)
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
		range = "?from=1&to=10"
		pageSize = 10
	});
	$('#A2').click(function (e) {
		range = "?from=1&to=20"
		pageSize = 20
	});
	$('#A3').click(function (e) {
		pageSize = 30
		range = "?from=1&to=30"
	});
	$('#A4').click(function (e) {
		pageSize = 40
		range = "?from=1&to=40"
	});
	$('#A5').click(function (e) {
		pageSize = 50
		range = "?from=1&to=50"
	});

	$('#A6').click(function (e) {
		order = "&order=name_string:desc";
	});

	$('#A7').click(function (e) {
		order = "&order=name_string:asc";
	});
}

function GetSavedSearchs() {
	url1 = viewpointSaveSearchURL;
	$.ajax({
		type: "GET",
		url: url1,// + SavedSearchRange + SavedSearchOrder,
		crossDomain: true,
		dataType: "text",
		beforeSend: function () {
			$('#savedSearchList').empty();
		}
	})
		.done(function (data) {
			//$('#P1').removeClass("alert-danger");
			//$('#P1').text("Here's the response: ").addClass("alert-success");

			var searchResults = JSON.parse(data);

			if (searchResults.data.metadata.totalRecords)
				$.each(searchResults.data.savedSearches, function (index, savedSearch) {
					$('#savedSearchList').append('<li><a href="#" id="' + savedSearch.id + '" class="list-group-item">' + savedSearch.name + '</a></li>');
				});

			//$(".list-group-item").click(function (event) {
			//	getAsset(event.target.id);
			//});
			//if(createThePagination)
			//createPagination(searchResults.data.metadata.totalRecords);
		})
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

function searchForSavedSearches() {
	query = $("#SavedSearchQuery").val();

	url1 = viewpointSaveSearchURL + "/search/" + query + "?" + SearchSavedSearchCase;
	$.ajax({
		type: "GET",
		url: url1,// + SavedSearchRange + SavedSearchOrder,
		crossDomain: true,
		dataType: "text",
		beforeSend: function () {
			$('#searched').empty();
		}
	})
		.done(function (data) {
			//$('#P1').removeClass("alert-danger");
			//$('#P1').text("Here's the response: ").addClass("alert-success");

			var searchResults = JSON.parse(data);

			if (searchResults.data.metadata.totalRecords) {
				$.each(searchResults.data.savedSearches, function (index, savedSearch) {
					$('#searched').append('<li><a href="#" id="' + savedSearch.id + '" class="list-group-item">' + savedSearch.name + '</a></li>');
				});
			} else {
				$('#searched').html("no matches found");
			}
			//$(".list-group-item").click(function (event) {
			//	getAsset(event.target.id);
			//});
			//if(createThePagination)
			//createPagination(searchResults.data.metadata.totalRecords);
		})
}

function setupSearchDropdowns() {

	$('#A8').click(function (e) {
		SearchSavedSearchCase = "case=sensitive";
	});

	$('#A9').click(function (e) {
		SearchSavedSearchCase = "case=insensitive";
	});
}