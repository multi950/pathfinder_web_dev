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
            headers : {
                authorization : "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ik11bHRpOTUwQGdtYWlsLmNvbSIsImlhdCI6MTU4NDQ0NjExMCwiZXhwIjoxNTg0NDQ5NzEwfQ.uYfCrLTNq6WuyvCaDOEjB_aC_JX6tohTgVvRG5PvMyw"
            },
            success: function (data) {
                console.log("you received data: ");
                var resultData = data.result;
                console.log( resultData[1].id);
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

