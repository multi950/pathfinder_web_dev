export function handleForm(formID, responseHandler){


    const form = $('#'+formID);
    form.on('submit', handleForm);

    function handleForm(e) {
        e.preventDefault();

        console.log("cookie: "+decodeURIComponent(document.cookie))

        const options = {
            url: (form).attr('action'),
            type: (form).attr('method'),
            data: form.serialize(),
            dataType: 'json',
            processData: false,
            header : {
                Authorization : "null"
            },
            success: function (data) {
                console.log("you received data: " + JSON.stringify(data));
            }
        }
        console.log("Data in form");
        console.log(JSON.stringify(form));
        $.ajax(options)
            .fail(err => console.log(err))
            .done(response => {
                responseHandler(response);
            });
    }
}

