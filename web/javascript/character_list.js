
async function getCharacters(user){
    const response = await fetch("http://localhost:1337/characters/");
    const data = await response.json();
    return data.result;
}

const email = "Marcus.f.s@hotmail.com";

const characters = getCharacters(email).then(data =>{
    const parent_div = document.getElementById("character_box");
    data.forEach(
    (character) => {
    const information = JSON.parse(character.information);
    const div = document.createElement("div");
    const name_p = document.createElement("p");
    const class_p = document.createElement("p");
    const race_p = document.createElement("p");
    name_p.innerHTML = "name: " +information.name;
    class_p.innerHTML = "Class: " +information.class;
    race_p.innerHTML = "race: " +information.race;
    div.appendChild(name_p);
    div.appendChild(class_p);
    div.appendChild(race_p);
    parent_div.appendChild(div);
} 
);
});