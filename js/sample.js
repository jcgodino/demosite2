function errorfunction(msg, url, ln) {
    //var popup = new window.open("", "", "top=200,left=100,width=400,height=100");
    alert("in the error function");
}
onerror=errorfunction;

function myFunction()
{
    alert("You've clicked me, hooray!!");
}

function init() {
    //document.body.innerHtml += "<br>hello"
    //alert("in the init function");
    //document.getElementById("btn").value = "myBtn";
}

onload=init;
