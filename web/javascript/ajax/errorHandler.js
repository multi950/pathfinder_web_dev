(function addAjaxErrorHandler(){
    $( document ).ajaxError(function(event, jqxhr, settings, ajaxError) {
    if(jqxhr.status == 401){

        alert("Please log in");
        console.log(ajaxError);
        window.location.href = 'login.html'

    }
  });
}())