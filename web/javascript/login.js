import {
    handleForm
} from "../javascript/ajax/forms.js";

(function(){
    if (getCookie("email") != "")
        $("#email").val(getCookie("email"));

    handleForm("loginForm", responseHandler);
}());



function responseHandler(response) {
    if (response.success == 1) {
        document.cookie = (
            "authorization=" + response.token,
            "email=" + $("#email").val()
        );
        window.location.href = 'logged_in.html'
    } else {
        console.log("incorrect email or pass")
    }
}

function getCookie(cname, cookies = document.cookie) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(cookies);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}