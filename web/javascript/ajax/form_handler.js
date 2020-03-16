$(document).ready( function()
{
    const $form = $('form.ajaxForm');
    $form.submit(function()
    {
        var formData = $form.serialize();
        var ajaxOptions = {
            url: $(form).attr('action'),
            type:$(form).attr('method'),
            data: formData,
            dataType: 'json',
            processData: false,
            beforeSubmit : showRequest,
            success : function(data){
                console.log("you received data: " + data);
            }
        }
        console.log("Data in form" + formData);
        $.ajax(ajaxOptions);
        return false;
    })
});

function showRequest(formData, jqForm, options){
    var queryString = $.param(formData); 
    alert('About to submit: \n\n' + queryString); 
    return true; 
}