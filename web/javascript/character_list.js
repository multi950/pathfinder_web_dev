const email = getCookie("email", document.cookie);
var name;
var description;
var ancestry_name;
var ancestry_id;
var heritage_name;
var heritage_id;
var ancestry_ability_boost;
var ancestry_feat_id;
var class_id;
var subclass_option_name;
var subclass_option_id;
var subclass_name;
var subclass_id;
var class_feat_id;
var class_ability_score;
var skill;
var skill_modifier;

const save_to_cookie = function(){
    writeBasicInformation(name, description);
    writeAncestry(ancestry_id, heritage_id, ancestry_ability_boost, ancestry_feat_id);
    writeClass(class_id, subclass_option_id, subclass_id, class_ability_score, class_feat_id, skill, skill_modifier);
}

const setCharacterInfo = function(information){
    name = information.name;
    description = information.description;
    ancestry_name = information.ancestry_name;
    ancestry_id = information.ancestry_id;
    heritage_name = information.heritage_name;
    heritage_id = information.heritage_id;
    ancestry_ability_boost = information.ancestry_ability_boost;
    ancestry_feat_id = information.ancestry_feat_id;
    class_name = information.class_name;
    class_id = information.class_id;
    subclass_option_name = information.subclass_option_name;
    subclass_option_id = information.subclass_option_id;
    subclass_name = information.subclass_name;
    subclass_id = information.subclass_id;
    class_feat_id = information.class_feat_id;
    class_ability_score = information.class_ability_score;
    skill = information.skill;
    skill_modifier = information.skill_modifier;
}


const characters = getCharacters(email).then(data =>{
    const parent_div = document.getElementById("character_box");
    data.forEach(
    (character) => {
    const information = JSON.parse(character.information);
    setCharacterInfo(information);
    //creating elements
    const div = document.createElement("div");
    const character_name_header = document.createElement("h3");
    const character_p = document.createElement("p");
    const delete_button = document.createElement("button");
    const edit_button = document.createElement("button");
    const view_button = document.createElement("button");
    //setting on.onclick functions
    delete_button.onclick = function(){
        const response = deleteCharacter(character.id);
        console.log(response);
        div.remove();
    };
    edit_button.onclick = function(){
        save_to_cookie();
        location.href='character_creation.html';
    };
    view_button.onclick = function(){
        
    };

    //setting innerHTML for buttons
    delete_button.innerHTML = "Delete";
    edit_button.innerHTML = "Edit";
    view_button.innerHTML = "View";
    //setting innerHTML for p
    character_p.innerHTML = ancestry_name + " | " + heritage_name + " | " + class_name + " | " + subclass_option_name;
    //setting innerHTML for header
    character_name_header.innerHTML = name;

    //Appending them to parents
    div.appendChild(character_name_header);
    div.appendChild(character_p);
    div.appendChild(delete_button);
    div.appendChild(edit_button);
    div.appendChild(view_button);
    parent_div.appendChild(div);
} 
);
});