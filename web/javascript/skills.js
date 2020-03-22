let skill_inputs = document.getElementsByClassName("Skill");
let skill_points_text = document.getElementById("current_skill_points");
let selected_skills = readSelectedSkills();
let inherited_skills = readInheritedSkills();
let total_skill_points = readClass().skill_modifier;
let current_skill_points = total_skill_points - selected_skills.length;
skill_points_text.innerHTML = (current_skill_points);


Array.from(skill_inputs).forEach((input) => {
    if(selected_skills.includes(input.id))
        input.checked = true;
});


const onCheckBoxChange = function(e){
    let input = e.target;

    if(input.checked){
        if(current_skill_points === 0){
            e.target.checked = false;
            return
        }
        selected_skills.push(input.id) ;

    }
    else
        selected_skills = selected_skills.filter((skill) => {return skill !== input.id});
    console.log(selected_skills);
    current_skill_points = total_skill_points - selected_skills.length;
    skill_points_text.innerHTML = (current_skill_points);
    writeSelectedSkills(selected_skills);
};

Array.from(skill_inputs).forEach((input) => input.onchange = onCheckBoxChange);

const onCookieChanged = () => {
    let inputs = Array.from(skill_inputs).filter((input) => {return inherited_skills.includes(input.id.toLowerCase())});
    inputs.forEach((input) => {
       input.checked = false;
       input.disabled = false;
    });
    inherited_skills = readInheritedSkills();
    Array.from(skill_inputs).forEach((input) => {
        if (inherited_skills.includes(input.id.toLowerCase())) {
            if(input.checked === true){
                skill_points_text.innerHTML = ++current_skill_points + "";
                if(selected_skills.includes(input.id))
                    selected_skills = selected_skills.filter((skill) => {return skill !== input.id})
            }
            input.checked = true;
            input.disabled = true;
        }
    });
};

onCookieChanged();
window.setInterval(checkCookies(onCookieChanged), 100);