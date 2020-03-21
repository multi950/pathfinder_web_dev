
export function getClasses(user){
fetch("http://localhost:1337/users/" + user + "/class").then(response => {
    return response.json();})
    .then((data) => {
    return data.result;
    });
}
export function getSubClasses(user){
    fetch("http://localhost:1337/users/" + user + "/subclass").then(response => {
        return response.json();})
        .then((data) => {
            return data.result;
        });
}
export function getClassFeats(user){
    fetch("http://localhost:1337/users/" + user + "/classfeat").then(response => {
        return response.json();})
        .then((data) => {
            return data.result;
        });
}

export function getClassFeatures(user){
    fetch("http://localhost:1337/users/" + user + "/classfeature").then(response => {
        return response.json();})
        .then((data) => {
            return data.result;
        });
}