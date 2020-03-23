async function getClasses(user){
    const response = await fetch("http://localhost:1337/users/" + user + "/class");
    const data = await response.json();
    return data.result;
}
async function getSubClasses(user) {
    const response = await fetch("http://localhost:1337/users/" + user + "/subclass");
    const data = await response.json();
    return data.result;
}

async function getSubclassOptions(user) {
    const response = await fetch("http://localhost:1337/users/" + user + "/subclass_option");
    const data = await response.json();
    return data.result;
}

async function getClassFeats(user){
    const response = await fetch("http://localhost:1337/users/" + user + "/classfeat");
    const data = await response.json();
    return data.result;
}
async function getClassFeatures(user){
    const response = await fetch("http://localhost:1337/users/" + user + "/classfeature");
    const data = await response.json();
    return data.result;
}

async function getCharacters(user){
    const response = await fetch("http://localhost:1337/characters/");
    const data = await response.json();
    return data.result;
}

async function deleteCharacter(character_id){
    const response = await fetch("http://localhost:1337/characters/" + character_id + "", {
        method: 'DELETE'
    }).then(response => response.json());
    return response;
}

async function getBackground(user){
    const response = await fetch("http://localhost:1337/users/" + user + "/background");
    const data = await response.json();
    return data.result;
}

async function createCharacter(json){
    const response = await fetch("http://localhost:1337/characters/", {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body:  json
    }).then(response => response.json());
    return response;
}

async function updateCharacter(json){
    const response = await fetch("http://localhost:1337/characters/"+getCookie("character_id"), {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body:  json
    }).then(response => response.json());
    return response;

}