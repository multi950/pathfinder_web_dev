var ancestries;
var currentAncestryID;
var currentAncestry;
(function () {
    $.get("/characters/ancestries", function (data, status) {
        ancestries = data;
        populateSelect("ancestrySelect", data)
    });
    $("#heritageSelect").hide();
    $("#ancestryFeatSelect").hide();
    $(".ability_score_container").hide();
}())

$("#ancestrySelect").change(function () {
    currentAncestryID = $("#ancestrySelect").val();
    if (!isNaN(currentAncestryID)) {

        $.get("/characters/" + 1010 + "/ancestryFeat", function (data, status) {
            console.log("feet data");
            console.log(data);
            populateSelect("ancestryFeatSelect", data, function filter(option){return (option.ancestry_id == currentAncestryID)})
        });

        $.get("/characters/" + 1010 + "/heritage", function (data, status) {
            console.log("heritage data");
            console.log(data);
            populateSelect("heritageSelect", data, function filter(option){return (option.ancestry_id == currentAncestryID)})
        });
            ancestries.forEach(ancestry => {
                if(!isNaN(currentAncestryID) && currentAncestryID == ancestry.id){
                    console.log("ab:");
                    var ability_boosts = JSON.parse(ancestry.ability_boosts).ability_boosts;
                    populateSelectorDiv("ability_score_container", ability_boosts);
                    return;
                }
            });
            
       

        $("#heritageSelect").show();
        $("#ancestryFeatSelect").show();
        $(".ability_score_container").show();
    } else {
        $("#heritageSelect").hide();
        $("#ancestryFeatSelect").hide();
        $(".ability_score_container").hide();
    }
})

function getCookie(cname, cookies = document.cookie) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(cookies);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}