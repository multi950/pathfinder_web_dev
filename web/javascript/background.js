let background_select = document.getElementById("background_select");
let background_description = document.getElementById("background_description");
let background_ability_boost = document.getElementById("background_ability_boost");
let background_free_ability_boost = document.getElementById("background_free_ability_boost");
let background_skill = document.getElementById("background_skill");
let __email = getCookie("email");

async function get_data(){
    return await getBackground(__email);
}

function set_data() {
    get_data().then((backgrounds) => {
        backgrounds.forEach((background) => {
        let option = document.createElement("option");
        option.value = background.id;
        option.text = background.name;
        background_select.add(option);
    });
        let boosts = ["STR","DEX","CON","INT","WIS","CHA"];
        boosts.forEach((boost) => {
            let option = document.createElement("option");
            option.value = boost;
            option.text = boost;
            background_free_ability_boost.add(option);
        });
        background_select.onchange = () => onBackgroundSelectChange(backgrounds);
        background_ability_boost.onchange = _onSelectChange;
        background_free_ability_boost.onchange = _onSelectChange;
        onBackgroundSelectChange(backgrounds);
    });
}

const onBackgroundSelectChange = function(backgrounds){
    let background_id = background_select.options[background_select.selectedIndex].value;
    let _background_index = backgrounds.findIndex((background)=> {return parseInt(background.id) === parseInt(background_id)});
    let background = backgrounds[_background_index];
    background_description.innerHTML = background.description;
    background_ability_boost.innerHTML = "";
    JSON.parse(background.ability_boosts).forEach((boost) =>{
        let option = document.createElement("option");
        option.value = boost;
        option.text = boost;
        background_ability_boost.add(option);
    });
    background_skill.innerHTML = background.skill;
    _onSelectChange();
};

const _onSelectChange = function(){
    let id = background_select.options[background_select.selectedIndex].value;
    let name = background_select.options[background_select.selectedIndex].text;
    let boosts = getBoosts();
    let skill = background_skill.innerHTML;
  writeBackground(name,id,boosts,skill);
};

function getBoosts(){
    let boost1 = background_ability_boost.options[background_ability_boost.selectedIndex].value;
    let boost2 = background_free_ability_boost.options[background_free_ability_boost.selectedIndex].value;
    return [boost1, boost2];
}

set_data();