function getUsers4() {
	$.ajax({
		'url': 'http://localhost:8983/solr/select',
		'data': { 'wt': 'json', 'q': '*' },
		'success': function (data) {
			alert(data.response.docs[1].name);
			$('#userlist').append(data.response.docs[0]);
			$.each(data.response.docs, function (index, docs) {
				$('#userlist').append('&nbsp;<div class="list-group"  style="width:35%";><a href="#" class="list-group-item"><h4 class="list-group-item-heading">' + docs.name + '</h4><p class="list-group-item-text">Member ID:' + docs.member_id + '</p><p class="list-group-item-text">Type:' + docs.type + '</p></a></div>');
			})
		},
		'dataType': 'jsonp',
		'jsonp': 'json.wrf'
	});
}


function showMsg(msg){
	console.log(msg.responseText);
}

function listSearch(data){
	url = hostURL + "/admin-services/v1/principals/"
	$('#tasklist').html("");
	//console.log(data);
	//principals = jQuery.parseJSON(data);
	console.log(data.principals);
	$.each(data.data.principals, function (i, principal) {
		url2 = url + principal.key;
		//$('#tasklist').append('<li><a href="' + url2 + '" id="' + principal.key + '" class="list-group-item"><span>Display Name : </span>' + principal.displayName + '</li>');
		$('#tasklist').append('<li><a href="#" id="' + principal.key + '" class="list-group-item"><span>Display Name : </span>' + principal.displayName + '</li>');
	});
	$(".list-group-item").click(function (event) {
		showPrincipal(event.target.id);
	});
}

function showPrincipal(data){
	url = "http://localhost:8080/admin-services/v1/principals/" + data;

	$.ajax({
	    type: "GET",
	    url: url,
	    contentType: "application/json",
	    dataType: 'json'
	})
		.done(function (foo) {
		    
		    var alertStr =
				'key:           ' + foo.data.key +
				'\n' +
				'Display Name:  ' + foo.data.displayName +
				'\n' +
				'email:	        ' + foo.data.email +
				'\n' +
				'name:	           ' + foo.data.name +
				'\n' +
				'principal type:   ' + foo.data.type;
		    console.log(foo.data);
		    $('#modalbody').html("<p> &nbsp; &nbsp;<span class='label label-primary'>Key:</span> &nbsp; &nbsp;" + foo.data.key + "</p><p> &nbsp; &nbsp;<span class='label label-primary'>Display Name:</span> &nbsp; &nbsp;" + foo.data.displayName + "</p><p> &nbsp; &nbsp;<span class='label label-primary'>email:</span> &nbsp; &nbsp;" + foo.data.email + "</p><p> &nbsp; &nbsp;<span class='label label-primary'>principal type:</span> &nbsp; &nbsp;" + foo.data.type + "</p>");
		    $('#my-modal').modal('show');
		})
		.error(function (msg) {
		    console.log("something went wrong");
		    console.log(msg);
		});
}

