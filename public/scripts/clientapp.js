$(document).ready(function() {
    getData();
    $('#submit-button').on('click', postData);


});

var values = {};

function postData() {
    event.preventDefault();


    $.each($('#sql-form').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    console.log(values);

    $.ajax({
        type: 'POST',
        url: '/people',
        data: values,
        success: function(data) {
            if(data) {
                // everything went ok
                console.log('from server:', data);
                getData();
            } else {
                console.log('error');
            }
        }
    });

}

function getData() {
    $.ajax({
        type: 'GET',
        url: '/people',
        success: function(data) {
            appendPeople(data);
            console.log(data);
        }
    });
}

function appendPeople(info) {
    $('#people').empty();
    for(var i = 0; i < info.length; i++) {
        $('#people').append('<p>' + info[i].name + '<br>' + info[i].address + '<br>' + info[i].city + ', ' +
            info[i].state + ' ' + info[i].zip_code + '</p>');
    }
}