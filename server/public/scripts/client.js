console.log("Hello World!");
$(document).ready(readyNow);

function readyNow (){
    console.log('Hello from JQuery!');
    $.ajax({
        method: 'GET',
        url: '/hello'
    }).then(function (response) {
        console.log(response);
    })
}