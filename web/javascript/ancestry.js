var ancestries;
var currentAncestryID;
var currentAncestry;
var currentHeritages
var currentHeritageID;
var currentHeritage;
var currentAncestryFeats;
var currentAncestryFeatID;
var currentAncestryFeat;

$("#ancestrySelect").change(onAncestryChange);
$("#heritageSelect").change(onHeritageChange);
$("#ancestryFeatSelect").change(onAncestryFeatChange);

(function () {
    
    let email = getCookie("email");
    $.get("/users/" + email + "/ancestry")
        .done(data => {
            ancestries = data.result;
            populateSelect("#ancestrySelect", ancestries);
            console.log("here");
            onAncestryChange();

        })
        .fail(err => {
            $(".ancestryContent").hide();
        });
    loadAncestryFromCookies();
}())

function onHeritageChange() {
    setHeritageInfo(getHeritage($("#heritageSelect").val()));
    saveAncestryToCookies();
}

function onAncestryFeatChange() {
    setAncestryFeatInfo(getAncestryFeat($("#ancestryFeatSelect").val()));
    saveAncestryToCookies();
}

function onAncestryChange() {
    currentAncestryID = $("#ancestrySelect").val();
    currentAncestry = getObjectFromList(currentAncestryID, ancestries);

    if (!isNaN(currentAncestryID)) {
        populateSelectors();
        setAncestryInfo(currentAncestry);

        $(".ancestryContent").show();
    } else {
        $(".ancestryContent").hide();
    }
    saveAncestryToCookies();
}

function updateContainer(containerID, objectList) {
    var currentID = $("#" + containerID + ">select").val();
    console.log(containerID);
    console.log(objectList);
    var currentObject = getObjectFromList(currentID, objectList);
    $(containerID + " > div").empty();
    addToDivAs(currentObject, containerID + " > div");
}

function populateSelectors(email) {

    $.get("/users/" + email + "/ancestryFeat").done(data => {
        $("#ancestryFeatSelect").empty();
        currentAncestryFeats = data.result;
        populateSelect("#ancestryFeatSelect", getObjectsFromList(currentAncestryID, data.result));
        setAncestryFeatInfo(getAncestryFeat($("#ancestryFeatSelect").val()));
        onAncestryFeatChange();
    })
    $.get("/users/" + email + "/heritage").done(data => {
        $("#heritageSelect").empty();
        currentHeritages = data.result;
        populateSelect("#heritageSelect", getObjectsFromList(currentAncestryID, data.result));
        setHeritageInfo(getHeritage($("#heritageSelect").val()));
        onHeritageChange();
    });

    var abilityBoostsArray = JSON.parse(currentAncestry.ability_boosts);
    $(".abilityScoreContainer").empty();
    var boostIndex = 0;
    abilityBoostsArray.forEach(abilityBoosts => {
        var abilityBoostsSelector = document.createElement("select");
        abilityBoostsSelector.className = ("ancestry_boost" + boostIndex++)
        abilityBoosts.forEach(abilityBoost => {
            var boostOption = document.createElement("option");
            boostOption.value = abilityBoost;
            boostOption.innerHTML = abilityBoost;
            abilityBoostsSelector.appendChild(boostOption);
        });
        abilityBoostsSelector.onchange = saveAncestryToCookies;
        $(".abilityScoreContainer").append(abilityBoostsSelector);
    });

}

function getHeritage(id) {
    for (var i = 0; i < currentHeritages.length; i++) {
        if (currentHeritages[i].id == id)
            return currentHeritages[i];
    }
}

function getAncestryFeat(id) {
    for (var i = 0; i < currentAncestryFeats.length; i++) {
        if (currentAncestryFeats[i].id == id)
            return currentAncestryFeats[i];
    }
}

function getObjectFromList(id, list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].id == id) {
            return (list[i]);
        }
    }
}

function getObjectsFromList(id, data) {
    var filteredData = []
    for (var i = 0; i < data.length; i++) {
        if (data[i].ancestry_id == id) {
            filteredData[filteredData.length] = (data[i]);
        }
    }
    return filteredData;
}


function setAncestryInfo(ancestry) {
    $(".ancestryName").text(ancestry.name);
    $(".ancestrySize").text(ancestry.size);
    $(".ancestryHP").text(ancestry.hit_points);
    $(".ancestrySpeed").text(ancestry.speed);
    $(".ancestryAbilityFlaw").text(ancestry.ability_flaw);
    $(".ancestryDescription").text(ancestry.description);
    $(".ancestrySpecialAbilities").text(ancestry.special_abilities);
    $(".ancestryYouMight").text(ancestry.you_might);
    $(".ancestryOthersProbably").text(ancestry.others_probably);
    $(".ancestryAlignmentAndReligion").text(ancestry.alignment_and_religion);
    $(".ancestryPhysicalDescription").text(ancestry.physical_description);
    $(".ancestrySociety").text(ancestry.society);
    $(".ancestryNames").text(ancestry.names);
    $(".ancestrySampleNames").text(ancestry.sample_names);
}

function setHeritageInfo(heritage) {
    $(".heritageName").text(heritage.name);
    $(".heritageDescription").text(heritage.description);
    if (heritage.special_action == '') {
        $(".specialActionContainer").hide();
    } else {
        $(".specialActionContainer").show();
        var specialAction = JSON.parse(heritage.special_action);
        $(".heritageSpecialActionName").text(specialAction.name);
        $(".heritageSpecialActionType").text(specialAction.type);
        $(".heritageSpecialActionTrigger").text(specialAction.trigger);
        $(".heritageSpecialActionDescription").text(specialAction.description);
    }
}

function setAncestryFeatInfo(ancestryFeat) {
    $(".ancestryFeatName").text(ancestryFeat.name);
    $(".ancestryFeatActionType").text(ancestryFeat.action_type);
    $(".ancestryFeatLevel").text(ancestryFeat.level);
    $(".ancestryFeatFrequency").text(ancestryFeat.frequency);
    $(".ancestryFeatDescription").text(ancestryFeat.description);
}

function saveAncestryToCookies() {
    var abilityBoosts = [];
    $(".abilityScoreContainer").children('select').each(function () {
        if (this.value != undefined)
            abilityBoosts[abilityBoosts.length] = this.value;
    });

    writeAncestry(
        $("#ancestrySelect option:selected").text(),
        $("#ancestrySelect").val(),
        $("#heritageSelect option:selected").text(),
        $("#heritageSelect").val(),
        abilityBoosts,
    $("#ancestryFeatSelect option:selected").text(),
        $("#ancestryFeatSelect").val(),
        $(".ancestryAbilityFlaw").text());

    console.log("saved");
    console.log(readAncestry());
}

function loadAncestryFromCookies() {
    console.log("loading")
    var ancestryInfo = readAncestry();
    console.log(ancestryInfo);
    if (ancestryInfo.ancestry_id != "" && ancestryInfo.ancestry_id != undefined) {
        $("#ancestrySelect option[value=" + ancestryInfo.ancestry_id + "]").prop('selected', true);
        onAncestryChange();
    }
    if (ancestryInfo.heritage_id != "" && ancestryInfo.heritage_id != undefined) {
        setHeritageInfo(getHeritage(ancestryInfo.heritage_id));
    }
    if (ancestryInfo.feat_id != "" && ancestryInfo.feat_id != undefined) {
        setAncestryFeatInfo(getAncestryFeat(ancestryInfo.feat_id));
    }
    if (ancestryInfo.ability_boost != "" && ancestryInfo.ability_boost != undefined)
        var boosts = (ancestryInfo.ability_boost).split(',');
    var index = 0;
    $(".abilityScoreContainer").children('select').each(function () {
        this.value = boosts[index++];
    });

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