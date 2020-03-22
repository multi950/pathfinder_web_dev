let character_name = document.getElementById("character_name");
let character_description = document.getElementById("character_description");
let ancestry_name = document.getElementById("ancestry_name");
let heritage_name = document.getElementById("heritage_name");
let ancestry_feat = document.getElementById("ancestry_feat");
let background_name = document.getElementById("background_name");
let class__name = document.getElementById("class_name");
let subclass__name = document.getElementById("subclass_name");
let class__feat = document.getElementById("class_feat");
let ability_scores = document.getElementById("ability_scores");
let skills_textarea = document.getElementById("skills_textarea");
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
    let ability_map = {"STR": 10, "DEX": 10,"CON": 10, "INT": 10,"WIS": 10,"CHA": 10};
    const addToScore = function(score){
        map.set(score, ability_map[score] + 2);
    };
    _ancestry.ability_boosts.forEach((score)=> addToScore(score));
    _background.ability_boosts.forEach((score)=> addToScore(score));
    addToScore(_class.ability_score);
    map.set(_ancestry.ability_flaw, ability_map[_ancestry.ability_flaw] - 2);
    console.log(ability_map);
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
    background_name.innerHTML = _background.id;
    //class info
    class__name.innerHTML = _class.id;
    subclass__name.innerHTML = _class.subclass_id;
    class__feat.innerHTML = _class.feat;
    //ability scores
    let scores = generateAbilityScores(_class,_ancestry,_background);
    for(const [score, value] of scores.entries()){
        let row = document.createElement("tr");
        let cell1 = document.createElement("cell");
        let cell2 = document.createElement("cell");
        cell1.innerHTML = score;
        cell2.innerHTML = value;
        row.add(cell1);
        row.add(cell2);
        ability_scores.add(row);
    }
    //skills
    _selected_skills.forEach((skill) => {
       skills_textarea.value += `Trained in ${skill}
       `
    });
    _inherited_skills.forEach((skill) => {
        skills_textarea.value += `Trained in ${skill}
       `
    });

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