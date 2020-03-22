
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
        console.log(ability_boosts)

}

function getCurrentBackground(){
    currentBackgroundID = $(".backgroundSelector").val();
    for(var i = 0; i < backgrounds.length; i++){
        if(backgrounds[i].id == currentBackgroundID)
            return backgrounds[i];
    }
}
