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

function writeBasicInformation(name, description){
    document.cookie = ("name=" + name);
    document.cookie = ("description=" + description);
}

function writeAncestry(ancestry_name, ancestry_id, heritage_name, heritage_id, ancestry_ability_boost, ancestry_feat_id){
    document.cookie = ("ancestry_name=" + ancestry_name);
    document.cookie = ("ancestry_id=" + ancestry_id);
    document.cookie = ("heritage_name=" + heritage_name);
    document.cookie = ("heritage_id=" + heritage_id);
    document.cookie = ("ancestry_ability_boost=" + ancestry_ability_boost);
    document.cookie = ("ancestry_feat=" + ancestry_feat_id);
    //console.log(document.cookie);
}

function writeBackground(){

}


function writeClass(class_name, class_id, subclass_option_name, subclass_option_id, subclass_name, subclass_id, class_ability_score, class_feat_id, skill, skill_modifier){
    document.cookie = ("class_name=" + class_name);
    document.cookie = ("class_id=" + class_id);
    document.cookie = ("subclass_option_name=" + subclass_option_name);
    document.cookie = ("subclass_option_id=" + subclass_option_id);
    document.cookie = ("subclass_name="+subclass_name);
    document.cookie = ("subclass_id="+subclass_id);

    document.cookie = ("class_ability_score="+class_ability_score);
    document.cookie = ("class_feat="+class_feat_id);
    document.cookie = ("class_skill="+skill);
    document.cookie = ("class_skill_modifier="+skill_modifier);
    //console.log(document.cookie);

}

function writeSelectedSkills(skills){
    document.cookie = ("selected_skills="+skills);
}

function readBasicInformation(){
    return {
        name: getCookie("name"),
        description: getCookie("description")
    }

}

function readAncestry(){
    return {
        ancestry_name: getCookie("ancestry_name"),
        ancestry_id: getCookie("ancestry_id"),
        heritage_name: getCookie("heritage_name"),
        heritage_id: getCookie("heritage_id"),
        ability_boost: getCookie("ancestry_ability_boost"),
        feat: getCookie("ancestry_feat")
    }
}

function readBackground(){

}

function readClass(){
    return {
        class: getCookie("class"),
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