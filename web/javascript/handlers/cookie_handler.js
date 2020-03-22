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

function writeClass(class_id, class_name, subclass_id, class_ability_score, class_feat_id, skill, skill_modifier){
    document.cookie = ("class=" + class_id);
    document.cookie = ("class_name="+ class_id);
    document.cookie = ("subclass="+subclass_id);
    document.cookie = ("class_ability_score="+class_ability_score);
    document.cookie = ("class_feat="+class_feat_id);
    document.cookie = ("class_skill="+skill);
    document.cookie = ("class_skill_modifier="+skill_modifier);
}

function writeSelectedSkills(skills){
    document.cookie = ("selected_skills="+skills);
}

function readBasicInformation(){

}

function readAncestry(){

}

function readBackground(){

}

function readClass(){
    return {
        class: getCookie("class"),
        name: getCookie("class_name"),
        subclass: getCookie("subclass"),
        ability_score: getCookie("class_ability_score"),
        feat: getCookie("class_feat"),
        skill: getCookie("class_skill"),
        skill_modifier: parseInt(getCookie("class_skill_modifier"))
    }
}

function readInheritedSkills(){
    const regex = /(skill=.*?)(?=;|$)/;
    let matches = regex.exec(document.cookie);
    let skills = [];
    for(let i=1;i<matches.length;i+=2){
        skills.push(matches[i].substring(6,matches[i].length));
    }
    return skills;
}

function readSelectedSkills(){
    let skills = getCookie("selected_skills");
    return skills.split(",");
}

function checkCookies(callback) {
    let lastCookie = document.cookie; // 'static' memory between function calls
    return function () {
        let currentCookie = document.cookie;
        if (currentCookie != lastCookie) {
            lastCookie = currentCookie; // store latest cookie
            callback();
        }
    }
}