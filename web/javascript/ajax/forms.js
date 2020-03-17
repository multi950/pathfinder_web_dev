export function handleForm(formID, responseHandler){


    const form = $(formID);
    form.on('submit', handleSignup);

    function handleSignup(e) {
        e.preventDefault();


        const options = {
            url: (form).attr('action'),
            type: (form).attr('method'),
            data: JSON.stringify(form),
            dataType: 'json',
            processData: false,
            success: function (data) {
                console.log("you received data: " + JSON.stringify(data));
            }
        }
        console.log("Data in form");
        console.log(form.serialize());
        $.ajax(options)
            .fail(err => console.log(err))
            .done(response => {
                responseHandler(response);
            });
    }
}

