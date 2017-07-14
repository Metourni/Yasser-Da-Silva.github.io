$(function () {

    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function ($form, event) {
            // Prevent spam click and default submit behaviour
            $("#btnSubmit").attr("disabled", true);
            event.preventDefault();

            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "/js/ajax/send.php",
                type: "POST",
                data: $("#contactForm").serialize(),
                dataType: 'json',
                cache: false,
                success: function (json) {
                    if (json.reponse == 'OK') {
                        // Enable button & show success message
                        $("#btnSubmit").attr("disabled", false);
                        $('#success').html("<div class='alert alert-success'>");
                        $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#success > .alert-success')
                            .append("<strong>Your message has been sent. </strong>");
                        $('#success > .alert-success')
                            .append('</div>');

                        //clear all fields
                        $('#contactForm').trigger("reset");
                    }else{
                        //$('#message-warning').html('Error : '+json.reponse);
                        //$('#message-warning').fadeIn();

                        //($div).focus();
                        error(json.div,json.reponse);

                    }
                },
                error: function () {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

// When clicking on Full hide fail/success boxes
$('#name').focus(function () {
    $('#success').html('');
});


function error(div,alert) {

    var class_div = "."+div+"-div";
    var input_div = "#"+div+"";

    var chi = '.'+div+'-help';
    var msg = '<ul id="msg-error" role="alert" style="color:red"><li>'+alert+'</li></ul>';

    $(input_div).focus();
    $(class_div).css({
        'border-color' : 'red'
    });

    $(chi).append(msg);
    $(class_div).on('blur',function () {
        $(class_div).css({
            'border-color': '#eee'
        });
        $('#msg-error').hide();
    })
}
