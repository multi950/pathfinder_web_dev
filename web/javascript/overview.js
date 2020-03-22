let character_name = document.getElementById("character_name");
let character_description = document.getElementById("character_description");
let ancestry_name = document.getElementById("ancestry_name");
let heritage_name = document.getElementById("heritage_name");
let ancestry_feat = document.getElementById("ancestry_feat");
let background_name = document.getElementById("background_name");
let class__name = document.getElementById("class_name");
let _subclass_name = document.getElementById("_subclass_name");
let class__feat = document.getElementById("class_feat");
let ability_scores = document.getElementById("ability_scores");
let skills_container = document.getElementById("skills_container");
let create_button = document.getElementById("create_button");

let _basic_information = readBasicInformation();
let _class = readClass();
let _ancestry = readAncestry();
let _background = readBackground();
let _inherited_skills = readInheritedSkills();
let _selected_skills = readSelectedSkills();

function generateAbilityScores(_class, _ancestry, _background) {
    let map = new Map();
    map.set("STR", 10);
    map.set("DEX", 10);
    map.set("CON", 10);
    map.set("INT", 10);
    map.set("WIS", 10);
    map.set("CHA", 10);
    /*const addToScore = function(score){
        map.set(score, map.get(score) + 2);
    };
    _ancestry.ability_boosts.forEach((score)=> addToScore(score));
    _background.ability_boosts.forEach((score)=> addToScore(score));
    addToScore(_class.ability_score);
    map.set(_ancestry.ability_flaw, map.get_ancestry.ability_flaw - 2);

     */
    return map;
}

const _onCookieChanged = () => {
    //basic info
    character_name.innerHTML = _basic_information.name;
    character_description.innerHTML = _basic_information.description;
    //ancestry info
    ancestry_name.innerHTML = _ancestry.ancestry_id;
    heritage_name.innerHTML = _ancestry.heritage_id;
    ancestry_feat.innerHTML = _ancestry.feat;
    //background info
    background_name.innerHTML = _background.name;
    //class info
    class__name.innerHTML = _class.class_name;
    _subclass_name.innerHTML = _class.subclass_option_name;
    class__feat.innerHTML = _class.feat_name;
    //ability scores
    let scores = generateAbilityScores(_class,_ancestry,_background);
    for(const [score, value] of scores.entries()){
        let row = ability_scores.insertRow(0);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.innerHTML = score;
        cell2.innerHTML = value;
        ability_scores.insertRow(row);
    }
    //skills
    const fillSkillText = function (skills) {
        skills.forEach((skill) => {
            let skills_string = "Trained in " + skill + "\n";
            let text = document.createElement("text");
            text.innerHTML = skills_string;
            skills_container.appendChild(text);
            skills_container.appendChild(document.createElement("br"));
        });
    };
    skills_container.innerHTML = "";
    fillSkillText(_selected_skills);
    fillSkillText(_inherited_skills);
};

function informationToJSON() {
    let json;
    return json;
}

create_button.onclick = () => {
    let json = informationToJSON();
    createCharacter(json);
};

_onCookieChanged();
window.setInterval(checkCookies(_onCookieChanged), 100);