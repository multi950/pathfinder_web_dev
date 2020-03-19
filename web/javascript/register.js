import {
    handleForm
} from "./ajax/forms.js";

(function () {
    handleForm("registerForm", responseHandler, formValidator);
}());

function responseHandler(response) {
    if (response.success == 1) {
        console.log("Registration complete!");
        window.location.href = 'login.html'
    } else {
        console.log("incorrect email or pass")
    }
}

function formValidator() {
    if ($("#password").val() !== $("#verify_password").val()) {
        alert("Passwords mismatch");
        return false;
    } else return true;
}
