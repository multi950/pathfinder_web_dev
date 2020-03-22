const email = getCookie("email", document.cookie);

const characters = getCharacters(email).then(data =>{
    const parent_div = document.getElementById("character_box");
    data.forEach(
    (character) => {
    const information = JSON.parse(character.information);
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
        location.href='character_creation.html';
    };
    view_button.onclick = function(){
        
    };

    //setting innerHTML for buttons
    delete_button.innerHTML = "Delete";
    edit_button.innerHTML = "Edit";
    view_button.innerHTML = "View";
    //setting innerHTML for p
    character_p.innerHTML = information.lvl + " | " + information.race + " | " + information.class + "";
    //setting innerHTML for header
    character_name_header.innerHTML = information.name;

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