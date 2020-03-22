
var backgrounds; 

(function(){
    set_data();
}())


async function get_data(){
    const background = await getBackground(getCookie("email", document.cookie));
    return background
}

function set_data(){
    get_data().then(data => {
        backgrounds = data;
        populateSelect(".backgroundSelector", backgrounds);
        setBackground(getCurrentBackground());
    })
}

function setBackground(background){
        console.log(background);
        $(".backgroundDescription").text(background.description);
        var ability_boosts = JSON.parse(background.ability_boosts).boosts;
        setBoosts(ability_boosts);
        var skills = JSON.parse(background.skill);
        setSkills(skills);

}

function getCurrentBackground(){
    currentBackgroundID = $(".backgroundSelector").val();
    for(var i = 0; i < backgrounds.length; i++){
        if(backgrounds[i].id == currentBackgroundID)
            return backgrounds[i];
    }
}
function setSkills(skills){
    skills.forEach(skill => {
        var skillOption = document.createElement("option");
        skillOption.value = skill;
        skillOption.innerHTML = skill;
        $(".skillSelector").append(skillOption);
    });
}

function setBoosts(abilityBoostsArray){
    var boostIndex = 0;
    abilityBoostsArray.forEach(abilityBoosts => {
        
        var abilityBoostsSelector = document.createElement("select");
        abilityBoostsSelector.className = ("background_boost"+boostIndex++)

        abilityBoosts.forEach(abilityBoost => {
            var boostOption = document.createElement("option");
            boostOption.value = abilityBoost;
            boostOption.innerHTML = abilityBoost;
            abilityBoostsSelector.appendChild(boostOption);
        });
   $(".backgroundAbilityScoresContainer").append(abilityBoostsSelector);
   });
}

function example(){
    loadExistingBackground({
        "name" : "Bounty hunter",
        "boosts" : ["Wisdom", "Strength"],
        "skill" : "Survival skill"
    });
}

function loadExistingBackground(background){
    setSelectedOption("backgroundSelector", background.name)
    var boostSelectorIndex = 0;
    boosts = background.boosts;
    boosts.forEach(selectorValue => {
        setSelectedOption(".background_boost"+boostSelectorIndex++, selectorValue)
    })
    setSelectedOption(".skillSelector", background.skill);
}

function setSelectedOption(selectorID, value){
    $(selectorID +" option[value='"+value+"']").prop('selected', true);
}

