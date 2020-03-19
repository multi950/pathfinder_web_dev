export function handleForm(formID, responseHandler, formValidator = function () {return true}) {

    const form = $('#' + formID);



    form.on('submit', handleForm);

    function handleForm(event) {
        event.preventDefault();

        if (formValidator() == false)
            return;

            const options = {
                url: (form).attr('action'),
                type: (form).attr('method'),
                data: form.serialize(),
                dataType: 'json',
                processData: false
            }
            
        $.ajax(options)
            .fail(err => console.log(err))
            .done(response => {
                responseHandler(response);
            });
    }
}