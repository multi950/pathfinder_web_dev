export function handleForm(formID, responseHandler, formValid = function(){return true}){


    const form = $('#'+formID);
    form.on('submit', handleForm);

    function handleForm(e) {
        e.preventDefault();


        if(!formValid()){
            return;
        }

        console.log("cookie: "+decodeURIComponent(document.cookie))

        const options = {
            url: (form).attr('action'),
            type: (form).attr('method'),
            data: form.serialize(),
            dataType: 'json',
            processData: false,
            beforeSubmit: function() {

            },
            success: function (data) {
                console.log("you received data: ");
                var resultData = data.result;
                console.log(resultData);
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

