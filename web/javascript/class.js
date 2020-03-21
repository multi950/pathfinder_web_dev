import * as repository from "./handlers/repository";
import * as cookies from "../../Services/cookie_service";
console.log("loading class");


var classes = [];
var subclasses = [];
var class_feats = [];
var class_features = [];

    var email = cookies.getCookie("email", document.cookie);
    console.log(email);
    const class_description = document.getElementById("class_description");
    class_description.innerText = "Not changed";
    classes = repository.getClasses("kj.ronning@gmail.com");
    classes.forEach((_class) => console.log(_class));



