$(document).ready( function()
{
    $('form.ajaxForm').submit(function()
    {
        var formData = $(this).serialize();

        console.log("Data in form" + formData);
        $.ajax({
            url: $(form).attr('action'),
            type:$(form).attr('method'),
            data: formData,
            dataType: 'json',
            processData: false,
            success : function(data){
                    
            }
        }).done(function(ResJryVar)
        {
            console.log(ResJryVar);
        });
    })
});