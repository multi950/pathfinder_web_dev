var email = getCookie("email", document.cookie);
const class_description = document.getElementById("class_description");
const class_select = document.getElementById("class_select");
const class_ability_score_select = document.getElementById("class_ability_score_select");
const class_hit_points = document.getElementById("class_hit_points");
const class_during_combat = document.getElementById("class_during_combat");
const class_during_social = document.getElementById("class_during_social");
const class_while_exploring = document.getElementById("class_while_exploring");
const class_in_downtime = document.getElementById("class_in_downtime");
const class_you_might = document.getElementById("class_you_might");
const class_others_probably = document.getElementById("class_others_probably");
const class_subclass_name = document.getElementById("class_subclass_name");
const class_subclass_description = document.getElementById("class_subclass_description");
const class_subclass_select = document.getElementById("class_subclass_select");
const class_feat = document.getElementById("class_feat");
const class_perception = document.getElementById("class_perception");
const class_saving_throws = document.getElementById("class_saving_throws");
const class_skills = document.getElementById("class_skills");
const class_skill_modifier = document.getElementById("class_skill_modifier");
const class_attacks = document.getElementById("class_attacks");
const class_defenses = document.getElementById("class_defenses");
const class_dc = document.getElementById("class_dc");

async function get_data(){
    const classes = await getClasses(email);
    const subclasses = await getSubClasses(email);
    const class_feats = await getClassFeats(email);
    const class_features = await getClassFeatures(email);
    return classes, subclasses;
}

function set_data(){
    get_data().then((classes) => {
        classes.forEach((_class) => addClassToSelect(_class));
        class_select.onchange = () => {class_select_on_change(classes)};
    })
}

function class_ability_score_select_load(_class) {
    class_ability_score_select.innerHTML = "";
    console.log(_class.ability_score);
    JSON.parse(_class.ability_score).scores.forEach((ac) =>{
       let option = document.createElement("option");
       option.value = ac;
       option.text = ac;
       class_ability_score_select.add(option);
    });

}

function class_select_on_change(classes) {
    const id = class_select.options[class_select.selectedIndex].value;
    const _class = classes[classes.findIndex((c) => parseInt(c.id) === parseInt(id))];
    class_hit_points.innerHTML = _class.hit_points;
    class_description.innerHTML = _class.description;
    class_during_combat.innerHTML = _class.during_combat;
    class_during_social.innerHTML = _class.during_social;
    class_while_exploring.innerHTML = _class.while_exploring;
    class_in_downtime.innerHTML = _class.in_downtime;
    class_others_probably.innerHTML = _class.others_probably;
    class_you_might.innerHTML = _class.you_might;
    class_ability_score_select_load(_class);

}

function addClassToSelect(_class) {
    let option = document.createElement("option");
    option.value = _class.id;
    option.text = _class.name;
    class_select.add(option);
}


function run(){
    set_data();
}



run();



