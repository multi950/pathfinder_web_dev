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

function writeAncestry(ancestry_name, ancestry_id, heritage_name, heritage_id, ancestry_ability_boost,ancestry_feat_name, ancestry_feat_id){
    document.cookie = ("ancestry_name=" + ancestry_name);
    document.cookie = ("ancestry_id=" + ancestry_id);
    document.cookie = ("heritage_name=" + heritage_name);
    document.cookie = ("heritage_id=" + heritage_id);
    document.cookie = ("ancestry_ability_boost=" + ancestry_ability_boost);
    document.cookie = ("ancestry_feat_name=" + ancestry_feat_name);
    document.cookie = ("ancestry_feat_id=" + ancestry_feat_id);
    console.log(document.cookie);
}

<<<<<<< HEAD
function writeBackground(background_name, background_ability_boosts, background_skill){
    document.cookie = ("background_name" + background_name);
=======

function writeBackground(background_name, background_id, background_description, background_ability_boosts, background_skill){
    document.cookie = ("background_name" + background_name);
    document.cookie = ("background_id"+ background_id);
    document.cookie = ("background_description" + background_description);
>>>>>>> 34cfa970c819f0d7672347089a69cfcb4c6f5f17
    document.cookie = ("background_ability_boosts" + background_ability_boosts);
    document.cookie = ("background_skill" + background_skill);  


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
        ancestry_id: getCookie("ancestry_id"),
        heritage_id: getCookie("heritage_id"),
        ability_boost: getCookie("ancestry_ability_boost"),
        feat_id: getCookie("ancestry_feat_id")
    }
}

function readBackground(){
    return{
        background_name: getCookie("background_name"),
<<<<<<< HEAD
=======
        background_id: getCookie("background_id"),
        background_description: getCookie("background_description"),
>>>>>>> 34cfa970c819f0d7672347089a69cfcb4c6f5f17
        background_ability_boosts: getCookie("background_ability_boosts"),
        background_skill: getCookie("background_skill")

    }
}

function readClass(){
    return {
        class_id: getCookie("class_id"),
        subclass_option_id: getCookie("subclass_option_id"),
        subclass_id: getCookie("subclass_id"),
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