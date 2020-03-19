var characterTemplate = {
    "name": "Erandiel",
    "alignment": "ln",
    "gender": "male",
    "deity": "Abadar",
    "age": 40,
    "description": "Born in Kyonin, Erandiel left right after his bartending internship in the search of hidden knowledge to make the perfect brew.",
    "level": 1,
    "ancestry": {
        "id": 1,
        "heritage_id": 2,
        "feats": {
            1: 3
        },
        "boosts": [{
            "name": "boostName",
            "id": 1
        }, {
            "name": "boost2Name",
            "id": 2
        }]
    },
    "background": {
        "id": 1,
        "boosts": ["DEX", "INT"],
        "feat": 3
    },
    "class": {
        "id": 1,
        "boost": null,
        "feats": {
            1: 17
        },
        "options": {
            1: 3
        }
    },
    "ability_boosts": {
        1: ["DEX", "INT", "CON", "WIS"]
    },
    "general_feats": {
        1: 19
    },
    "skill_feats": {
        1: 23
    },
    "languages": ["Common", "Elvish", "Primal", "Celestial", "Abyssal", "Draconic"]
};

(function () {
    console.log(characterTemplate.class)
}())