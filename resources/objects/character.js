/**
 * @param {string} name
 * @param {string} alignment
 * @param {string} gender
 * @param {string} deity
 * @param {number} age
 * @param {string} description
 * @param {number} level
 * @param {Ancestry} ancestry
 * @param {Background} background
 * @param {CharacterClass} characterClass
 */
                function Character(name, alignment, gender, deity, age, description, level,
    ancestry, background, characterClass) {

    this.name = name;
    this.alignment = alignment;
    this.gender = gender;
    this.deity = deity;
    this.age = age;
    this.description = description;
    this.level = level;
    this.ancestry = ancestry;
    this.background = background;
    this.characterClass = characterClass;

    this.getObject = function () {
        return {
            name: this.name,
            alignment: this.alignment,
            gender: this.gender,
            deity: this.deity,
            age: this.age,
            description: this.description,
            level: this.level,
            ancestry: this.ancestry,
            background: this.background,
            characterClass: this.characterClass

        }
    }

    this.getJson = function () {
        return JSON.stringify(this.getObject(), null, 2);
    }

}

function getCharacterFromJson(characterObject) {
    return new Character(characterObject.name, 
        characterObject.alignment, 
        characterObject.gender, 
        characterObject.deity, 
        characterObject.age,
        characterObject.description, 
        characterObject.level,
        characterObject.ancestry,
        characterObject.background, 
        characterObject.characterClass)
}


/**
 * @typedef {Object} Ancestry 
 * @param {string} heritage 
 * @param {Feats} feats 
 * @param {Boosts} boosts
 * @returns {Object}
 */
function Ancestry(heritage, feats, boosts) {
    return {
        heritage: heritage,
        feats: feats,
        boosts: boosts
    }
}

/**
 * @param {Number[]} boosts
 * @param {Number} feat
 */
function Background(boosts, feat) {
    return {
        boosts: boosts,
        feat: feat
    }
}

/**
 * @param {number} boost
 * @param {Feats} feats
 * @param {Options} options
 */
function CharacterClass(boost, feats, options) {
    return {
        boost: boost,
        feats: feats,
        options: options
    }
}

/**
 * @param {Object[Object[string, Number]]} options Options[Option[optionName, optionSelection]]
 * @return {Object} returns 
 */
function Options(options) {
    var optionsObject = [];
    options.forEach(option => {
        optionsObject.push({
            [option[0]]: option[1]
        })
    });
    return optionsObject;
}

/**
 * 
 * @param {Number} level
 * @param {Number} boost
 * @return {Object} returns 
 */
function AbilityBoost(level, boost) {
    return {
        level: level,
        boost: boost
    }
}


/**
 * @param {Object[Object[number, number]]} feats feats[feat[level, id]]
 * @return {Object} returns 
 */
function Feats(feats) {
    var featsObject = [];
    feats.forEach(feat => {
        featsObject.push({
            [feat[0]]: feat[1]
        })
    });
    return featsObject;
}


(function () {
        var character = new Character("Rasmus", "Lawful good", "Male", "no god", 23, "Guy from Kristianstad", 1,
            new Ancestry("Some heritage",
                new Feats([
                    [2, 3],
                    [1, 4]
                ]),
                [2, 4, 1, 3], "Some ancestry"),
            new Background([1, 2, 4], 2),
            new CharacterClass(2,
                new Feats([
                    [2, 3],
                    [1, 4]
                ]),
                new Options([
                    [1, 3],
                    [3, 5]
                ])),
        );

  
    var characterJson = character.getJson();
    var joakimCharacter = getCharacterFromJson(JSON.parse(characterJson));
    joakimCharacter.name = "Joakim";
    var joakimCharacterJson = joakimCharacter.getJson();
    console.log(joakimCharacterJson);
}())