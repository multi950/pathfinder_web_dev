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

function writeBasicInformation(){

}

function writeAncestry(){

}

function writeBackground(){

}

function writeClass(class_id, subclass_id, class_ability_score, class_feat_id){
    document.cookie = ("class=" + class_id);
    document.cookie = ("subclass="+subclass_id);
    document.cookie = ("class_ability_score="+class_ability_score);
    document.cookie = ("class_feat="+class_feat_id);
    console.log(document.cookie);
}

function writeSkills(){

}

function readBasicInformation(){

}

function readAncestry(){

}

function readBackground(){

}

function readClass(){

}

function readSkills(){

}