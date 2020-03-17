import {
    handleForm
} from "./ajax/forms.js";

((function () {
    handleForm("registerForm",
        function (response) {
            if (response.success == 1) {
                console.log("Registration complete!");
                window.location.href = 'login.html'
            } else {
                console.log("incorrect email or pass")
            }
        },
        function(){
            if ($password.val() !== $verify_password.val()){
                alert("Passwords mismatch");
                return false;
            }
            else return true;
        });
})())