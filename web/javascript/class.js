const email = getCookie("email");
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
const subclass_name = document.getElementById("subclass_name");
const subclass_description = document.getElementById("subclass_description");
const subclass_select = document.getElementById("subclass_select");
const class_feat_select = document.getElementById("class_feat_select");
const class_perception = document.getElementById("class_perception");
const class_saving_throws = document.getElementById("class_saving_throws");
const class_skills = document.getElementById("class_skills");
const class_skill_modifier = document.getElementById("class_skill_modifier");
const class_attacks = document.getElementById("class_attacks");
const class_defenses = document.getElementById("class_defenses");
const class_dc = document.getElementById("class_dc");

async function get_data() {
    const classes = await getClasses(email);
    const subclasses = await getSubClasses(email);
    const class_feats = await getClassFeats(email);
    const class_features = await getClassFeatures(email);
    const subclass_options = await getSubclassOptions(email);
    return [classes, subclasses, class_feats, class_features, subclass_options];
}

function onSelectChange(){
    let class_id = class_select.options[class_select.selectedIndex].value;
    let subclass_id = subclass_select.options[subclass_select.selectedIndex].value;
    let class_ability_score = class_ability_score_select.options[class_ability_score_select.selectedIndex].value;
    let class_feat_id = class_feat_select.options[class_feat_select.selectedIndex].value;
    writeClass(class_id, subclass_id, class_ability_score, class_feat_id);
}

function set_data() {
    get_data().then((args) => {
        args[0].forEach((_class) => addClassToSelect(_class));
        class_select.onchange = () => {
            class_select_on_change(args)
        };
        class_select_on_change(args);
        class_ability_score_select.onchange = () => {onSelectChange()};
        class_feat_select.onchange = () => {onSelectChange()};
        subclass_select.onchange = () => {onSelectChange()};
    })
}

function class_ability_score_select_load(_class) {
    class_ability_score_select.innerHTML = "";
    JSON.parse(_class.ability_score).scores.forEach((ac) => {
        let option = document.createElement("option");
        option.value = ac;
        option.text = ac;
        class_ability_score_select.add(option);
    });

}

function class_feats_select_load(class_id, class_feats) {
    class_feat_select.innerHTML = "";
    let getClassFeatsById = function (feat) {
        return parseInt(feat.class_id) === parseInt(class_id);
    };
    let feats = class_feats.filter(getClassFeatsById);
    feats.forEach((feat) => {
        let option = document.createElement("option");
        option.value = feat.id;
        option.text = feat.name;
        class_feat_select.add(option);
    });
}

function class_select_on_change(args) {
    let classes = args[0];
    let subclasses = args[1];
    let class_feats = args[2];
    let class_features = args[3];
    let subclass_options = args[4];
    console.log(subclass_options);
    const class_id = class_select.options[class_select.selectedIndex].value;
    let class_index = classes.findIndex((c) => parseInt(c.id) === parseInt(class_id));
    let subclass_index = subclasses.findIndex((s) => parseInt(s.class_id) === parseInt(class_id));
    const _class = classes[class_index];
    class_hit_points.innerHTML = _class.hit_points;
    class_description.innerHTML = _class.description;
    class_during_combat.innerHTML = _class.during_combat;
    class_during_social.innerHTML = _class.during_social;
    class_while_exploring.innerHTML = _class.while_exploring;
    class_in_downtime.innerHTML = _class.in_downtime;
    class_others_probably.innerHTML = _class.others_probably;
    class_you_might.innerHTML = _class.you_might;
    class_ability_score_select_load(_class);
    if (subclass_index !== -1) {
        let subclass = subclasses[subclass_index];
        subclass_name.innerHTML = subclass.name;
        subclass_description.innerHTML = subclass.description;
        subclass_name.hidden = false;
        subclass_description.hidden = false;
        subclass_select.hidden = false;
        subclass_select.innerHTML = "";
        let subclassops = subclass_options.filter((so) => {return parseInt(so.subclass_id) === parseInt(subclass.id)});
        subclassops.forEach((so) => {
            let option = document.createElement("option");
            option.value = so.id;
            option.text = so.name;
            subclass_select.add(option);
        })
    } else {
        subclass_name.hidden = true;
        subclass_description.hidden = true;
        subclass_select.hidden = true;
    }
    class_feats_select_load(class_id, class_feats);
    console.log(_class.proficiencies);
    let proficiencies = JSON.parse(_class.proficiencies);
    console.log(proficiencies);
    let perception = proficiencies.perception;
    let fortitude = proficiencies.fortitude;
    let reflex = proficiencies.reflex;
    let will = proficiencies.will;
    class_perception.innerHTML = `${perception} in perception`;
    class_saving_throws.innerHTML =
        `${fortitude} in fortitude
         ${reflex} in reflex
         ${will} in will`;
    class_skills.innerHTML = `Trained in ${JSON.parse(_class.skills).skills[0]}`;
    class_skill_modifier.innerHTML = _class.skill_modifier;
    class_attacks.innerHTML = _class.attacks;
    class_defenses.innerHTML = _class.defenses;
    class_dc.innerHTML = _class.class_dc;
    onSelectChange();
}

function addClassToSelect(_class) {
    let option = document.createElement("option");
    option.value = _class.id;
    option.text = _class.name;
    class_select.add(option);
}


function run() {
    set_data();
}


run();



