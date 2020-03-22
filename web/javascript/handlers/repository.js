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

async function getBackground(user){
    const response = await fetch("http://localhost:1337/users/" + user + "/background");
    const data = await response.json();
    return data.result;
}