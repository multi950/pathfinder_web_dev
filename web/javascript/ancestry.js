var ancestries;
var currentAncestryID;
var currentAncestry;
var currentHeritages
var currentHeritageID;
var currentHeritage;
var currentAncestryFeats;
var currentAncestryFeatID;
var currentAncestryFeat;
(function () {



    $.get("/users/" + getCookie("email") + "/ancestry")
        .done(data => {
            ancestries = data.result;
            populateSelect("ancestrySelect", ancestries);
            onAncestryChange();
            $("#ancestrySelect").change(onAncestryChange);
            $("#heritageSelect").change(function() {updateContainer("heritage", currentHeritages)});
            $("#ancestryFeatSelect").change(function() {updateContainer("ancestryFeat", currentAncestryFeats)});
        })
        .fail(err => {});
    $(".ancestryContent").hide();
}())




function onAncestryChange() {
    currentAncestryID = $("#ancestrySelect").val();
    currentAncestry = getObjectFromList(currentAncestryID, ancestries);

    if (!isNaN(currentAncestryID)) {
        populateSelectors();
        $("#ancestryParagraph").text(""); //
        fillParagraph(currentAncestry, "ancestryParagraph");
        $(".ancestryContent").show();
    } else {
        $(".ancestryContent").hide();
    }
}

function updateContainer(containerID, objectList) {
    var currentID = $("#"+containerID+">select").val();
    var currentObject = getObjectFromList(currentID, objectList);
    $("#"+containerID+" > p ").text("");
    fillParagraph(currentObject, containerID+" > p");
}

function populateSelectors() {

    $.get("/users/" + getCookie("email") + "/ancestryFeat").done(data => {
        $("#ancestryFeatSelect").empty();
        currentAncestryFeats = data.result;
        populateSelect("ancestryFeatSelect", idFilter(data.result, currentAncestryID));
        updateContainer("ancestryFeat", currentAncestryFeats);
    })
    $.get("/users/" + getCookie("email") + "/heritage").done(data => {
        $("#heritageSelect").empty();
        currentHeritages = data.result;
        populateSelect("heritageSelect", idFilter(data.result, currentAncestryID));
        updateContainer("heritage", currentHeritages);
    });

    $(".ability_score_container").empty();
    addAbilityScoreSelectors();

}

function getObjectFromList(id, list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].id == id) {
            return (list[i]);
        }
    }
}

function fillParagraph(object, paragraphId) {
    for (const attribute in object) {
        if (object.hasOwnProperty(attribute)) {
            const element = object[attribute];
            if (element == null) {

            } else if (
            attribute == "ability_boosts" || 
            attribute == "id" ||
            attribute == "feat_id" ||
            attribute == "ancestry_id" 
            ) {

            } else {
                $("#" + paragraphId).append("<br />" + attribute + ": " + element);
            }
        }
    }
}



function idFilter(data, id) {
    var filteredData = []
    for (var i = 0; i < data.length; i++) {
        if (data[i].ancestry_id == id) {
            filteredData[filteredData.length] = (data[i]);
        }
    }
    return filteredData;
}

function addAbilityScoreSelectors() {
    populateSelectorDiv("ability_score_container", JSON.parse(currentAncestry.ability_boosts).ability_boosts);
}


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