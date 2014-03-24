var id1;
function createcomment() {
    var d= new Date();
    var jsonObj = {
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
		    $('#name').html("Comment : "+data.data.comment+"<br>").addClass("alert alert-success").show();
		    $('#name').append("Name : " +data.data.user.first + " " + data.data.user.last +"<br>").addClass("alert alert-success").show();
		    $('#name').append("Time Stamp : " +data.data.timestamp +"<br>").addClass("alert alert-success").show();
		    $('#name').append("Status : " +data.data.status +"<br>").addClass("alert alert-success").show();

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
        "timestamp": d.getFullYear() + '-02-' + d.getDate() + 'T' + d.getHours() + ':' + ('0' + d.getMinutes() ).slice(-2) + ':' + ('0' + d.getSeconds()).slice(-2) ,
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

function listcomment() {

    $.ajax({
        type: "GET",
        //url: "http://uksearchdev:8080/viewpoint-services/v1/community/comments?task=5e1d005e-9d58-11e3-8d05-425861b86ab6",
        url: "http://localhost:8080/viewpoint-services/v1/community/comments?task=5e1d005e-9d58-11e3-8d05-425861b86ab6",
        contentType: "application/json",
        dataType: 'json'
    })
		.done(function (foo) {
		    $('#list').html(foo).addClass("alert alert-success").show();
		    console.log(foo);
		    console.log(foo.data);
		    for (i=0;i<foo.data.comments.length;i++){
		        $('#list').append("Comment : " + foo.data.comments[i].comment + "<br>").addClass("alert alert-success").show();
		        $('#list').append("Name : " + foo.data.comments[i].user.first + " " + foo.data.comments[i].user.last + "<br>").addClass("alert alert-success").show();
		        $('#list').append("Time Stamp : " + foo.data.comments[i].timestamp + "<br>").addClass("alert alert-success").show();
		        $('#list').append("Status : " + foo.data.comments[i].status + "<br><br>").addClass("alert alert-success").show();
                $('#list').append("<hr>");
		    }
		 

		})
		.error(function (msg) {
		    $('#list').removeClass("alert-success");
		    $("#list").html(msg.responseText).addClass("alert alert-danger").show();
		    console.log("something went wrong");
		    console.log(msg);
		});


}