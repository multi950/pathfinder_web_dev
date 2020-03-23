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

function writeCharacterId(characterid){
    document.cookie = ("character_id=" + characterid);
}

function writeAncestry(ancestry_name, ancestry_id, heritage_name, heritage_id, ancestry_ability_boost,ancestry_feat_name, ancestry_feat_id, ancestry_ability_flaw){
    document.cookie = ("ancestry_name=" + ancestry_name);
    document.cookie = ("ancestry_id=" + ancestry_id);
    document.cookie = ("heritage_name=" + heritage_name);
    document.cookie = ("heritage_id=" + heritage_id);
    document.cookie = ("ancestry_ability_boost=" + ancestry_ability_boost);
    document.cookie = ("ancestry_feat_name=" + ancestry_feat_name);
    document.cookie = ("ancestry_feat_id=" + ancestry_feat_id);
    document.cookie = ("ancestry_ability_flaw=" + ancestry_ability_flaw);
}


function writeBackground(background_name, background_id, background_ability_boosts, background_skill){
    document.cookie = ("background_name=" + background_name);
    document.cookie = ("background_id="+ background_id);
    document.cookie = ("background_ability_boosts=" + background_ability_boosts);
    document.cookie = ("background_skill=" + background_skill);


}


function writeClass(class_name, class_id, subclass_option_name, subclass_option_id, subclass_id, class_ability_score, class_feat_id,class_feat_name, skill, skill_modifier){
    document.cookie = ("class_name=" + class_name);
    document.cookie = ("class_id=" + class_id);
    document.cookie = ("subclass_option_name=" + subclass_option_name);
    document.cookie = ("subclass_option_id=" + subclass_option_id);
    document.cookie = ("subclass_id="+subclass_id);
    document.cookie = ("class_ability_score="+class_ability_score);
    document.cookie = ("class_feat_id="+class_feat_id);
    document.cookie = ("class_feat_name="+class_feat_name);
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

function readCharacterId(){
    return {
        character_id: getCookie("character_id")
    }
}

function readAncestry(){
    return {
        ancestry_name: getCookie("ancestry_name"),
        heritage_name: getCookie("heritage_name"),
        feat_name: getCookie("ancestry_feat_name"),
        ancestry_id: getCookie("ancestry_id"),
        heritage_id: getCookie("heritage_id"),
        ability_boost: getCookie("ancestry_ability_boost"),
        feat_id: getCookie("ancestry_feat_id"),
        ability_flaw: getCookie("ancestry_ability_flaw")
    }
}

function readBackground(){
    return{
        name: getCookie("background_name"),
        id: getCookie("background_id"),
        ability_boost: getCookie("background_ability_boosts"),
        skill: getCookie("background_skill")
    }
}

function readClass(){
    return {
        class_name: getCookie("class_name"),
        subclass_option_name: getCookie("subclass_option_name"),
        class_id: getCookie("class_id"),
        subclass_option_id: getCookie("subclass_option_id"),
        subclass_id: getCookie("subclass_id"),
        ability_score: getCookie("class_ability_score"),
        feat_id: getCookie("class_feat_id"),
        feat_name: getCookie("class_feat_name"),
        skill: getCookie("class_skill"),
        skill_modifier: parseInt(getCookie("class_skill_modifier"))
    }
}

function readInheritedSkills(){
    const regex = /(skill=.*?)(?=;|$)/g;
    let matches = document.cookie.match(regex);
    let skills = [];
    for(let i=0;i<matches.length;i++){
        skills.push(matches[i].substring(6,matches[i].length));
    }
    return skills;
}

function readSelectedSkills(){
    const regex = /(selected_skills=.*?)(?=;|$)/g;
    let matches = document.cookie.match(regex);
    let match = matches[0].substring(16, matches[0].length);
    let skills = match.split(",");
    return skills;
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