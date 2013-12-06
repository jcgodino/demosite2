function GetSavedSearchs() {
	url1 = viewpointSaveSearchURL + "?page=1&size=1000";
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

			$(".list-group-item").click(function (event) {
				getSavedSearchDetails(event.target.id);
			});
			//if(createThePagination)
			//createPagination(searchResults.data.metadata.totalRecords);
		})
}

function getSavedSearchDetails(assetID) {
	$.ajax({
		type: "GET",
		url: viewpointSaveSearchURL + "/" + assetID,
		//context: document.body,
		crossDomain: true,
		dataType: "text"
		//async: false,
		//jsonp: 'json.wrf'
	})
		.done(function (data) {
			//$('#asset').html(JSON.stringify(data, undefined, 2));
			$('#savedsearchdetails').removeClass("alert-danger");
			$('#savedsearchdetails').html(data).addClass("alert alert-success").show();
			//$('#asset').addClass("jumbotron").show();
		})
		.error(function (msg) {
			$('#savedsearchdetails').removeClass("alert-success");
			$('#savedsearchdetails').html(msg.responseText).addClass("alert alert-danger").show();
			//alert(msg.responseText)
		})
}

function searchForSavedSearches() {
	query = $("#SavedSearchQuery").val();

	url1 = viewpointSaveSearchURL + "/search/" + query + range + SavedSearchOrder + SearchSavedSearchCase;
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
				createSavedSearchesPagination(searchResults.data.metadata.totalRecords);
				$(".list-group-item").click(function (event) {
					getSavedSearchDetails(event.target.id);
				});
			} else {
				$('#SavedSearchesPaginationNavi').empty();
				$('#searched').html("no matches found");
			}


			//createPagination(searchResults.data.metadata.totalRecords);
		})
}

function setupSearchDropdowns() {

	$('#A8').click(function (e) {
		SearchSavedSearchCase = "&case=sensitive";
		$("#sensitivitychoice").html("sensitive");
	});

	$('#A9').click(function (e) {
		SearchSavedSearchCase = "&case=insensitive";
		$("#sensitivitychoice").html("insensitive");
	});
	$('#A12').click(function (e) {
		range = "?page=1&size=10"
		pageSize = 10
	});
	$('#A13').click(function (e) {
		range = "?page=1&size=20"
		pageSize = 20
	});
	$('#A10').click(function (e) {
		SavedSearchOrder = "&order=name:desc";
	});

	$('#A11').click(function (e) {
		SavedSearchOrder = "&order=name:asc";
	});
}

function createSavedSearchesPagination(totalRecords) {
	pages = totalRecords / 10;
	pages = Math.round(pages);

	if (pages === 0)
		$('#SavedSearchesPaginationNavi').visibility = false;
	else
		$('#SavedSearchesPaginationNavi').visibility = true;

	$('#SavedSearchesPaginationNavi').empty();
	for (var i = 1; (i <= 10) && (i <= pages); i++) {

		$('#SavedSearchesPaginationNavi').append('<li><a href="#" id="' + i + '">' + i + '</a></li>');

		$('#' + i).click(function () {
			range = "?page=" + this.id + "&size=" + pageSize;
			searchForSavedSearches();
		})
	}

	createThePagination = false;
	//$('#PaginationNavi').append('<li><a href="#">&raquo;</a></li>');
}

