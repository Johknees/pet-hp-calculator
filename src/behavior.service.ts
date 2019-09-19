import { Behavior, BehaviorCategoryMap, PetClass, PetType, PetModEntryMap, PetBaseHpEntryMap } from "./pet";


let categoryList: BehaviorCategoryMap = {
    feeding: [
        {
            description: "Eating normal food",
            weight: 1,
            tally: 0
        }, {
            description: "Hunting",
            weight: 2,
            tally: 0
        }, {
            description: "Scavenging",
            weight: 2,
            tally: 0
        }],
    vocalizations: [
        {
            description: "Song",
            weight: 1,
            tally: 0
        }, {
            description: "Alarm Call",
            weight: 1,
            tally: 0
        }, {
            description: "Funny vocalization",
            weight: 2,
            tally: 0
        }],
    grooming: [
        {
            description: "Preening",
            weight: 1,
            tally: 0
        }, {
            description: "Bathing",
            weight: 1,
            tally: 0
        }, {
            description: "Social Grooming",
            weight: 2,
            tally: 0
        }],
    rogue: [
        {
            description: "Mischievous action",
            weight: 3,
            tally: 0
        }, {
            description: "Stealing something",
            weight: 4,
            tally: 0
        }, {
            description: "Surprising the shit out you",
            weight: 5,
            tally: 0
        }],
    cleric: [
        {
            description: "Soothing action",
            weight: 3,
            tally: 0
        }, {
            description: "Gentle touch",
            weight: 4,
            tally: 0
        }, {
            description: "Appearing in your hour of need",
            weight: 5,
            tally: 0
        }],
    paladin: [
        {
            description: "Loyal action",
            weight: 3,
            tally: 0
        }, {
            description: "Doing good deeds",
            weight: 4,
            tally: 0
        }, {
            description: "Bringing you something you didn't ask for",
            weight: 5,
            tally: 0
        }],
    ranger: [
        {
            description: "Clever action",
            weight: 3,
            tally: 0
        }, {
            description: "Gazing contemplatively",
            weight: 4,
            tally: 0
        }, {
            description: "Ignoring you completely",
            weight: 5,
            tally: 0
        }],
    barbarian: [
        {
            description: "Impolite action",
            weight: 3,
            tally: 0
        }, {
            description: "Courageous feat",
            weight: 4,
            tally: 0
        }, {
            description: "Not giving a shit about smart stuff",
            weight: 5,
            tally: 0
        }]
};

let modList: PetModEntryMap = {
    dog: 2.4,
    cat: 2.0,
    fish: 3.1,
    reptile: 2.8,
    bird: 2.3,
    equine: 2.4,
    "small mammal": 2.4,
    bug: 2.3,
    amphibian: 2.2,
    "farm animal": 2.2,
    exotic: 2.8,
    plant: 2.2
}

let baseHpList: PetBaseHpEntryMap = {
    dog: {
        rogue: 35,
        cleric: 76,
        paladin: 116,
        ranger: 156,
        barbarian: 196
    },
    cat: {
        rogue: 40,
        cleric: 75,
        paladin: 110,
        ranger: 144,
        barbarian: 179
    },
    fish: {
        rogue: 20,
        cleric: 73,
        paladin: 126,
        ranger: 178,
        barbarian: 231
    },
    reptile: {
        rogue: 30,
        cleric: 78,
        paladin: 126,
        ranger: 173,
        barbarian: 221
    },
    bird: {
        rogue: 40,
        cleric: 79,
        paladin: 116,
        ranger: 154,
        barbarian: 191
    },
    equine: {
        rogue: 45,
        cleric: 86,
        paladin: 126,
        ranger: 166,
        barbarian: 206
    },
    "small mammal": {
        rogue: 10,
        cleric: 51,
        paladin: 91,
        ranger: 131,
        barbarian: 171
    },
    bug: {
        rogue: 1,
        cleric: 40,
        paladin: 77,
        ranger: 115,
        barbarian: 152
    },
    amphibian: {
        rogue: 140,
        cleric: 77,
        paladin: 114,
        ranger: 150,
        barbarian: 187
    },
    "farm animal": {
        rogue: 50,
        cleric: 88,
        paladin: 126,
        ranger: 163,
        barbarian: 201
    },
    exotic: {
        rogue: 35,
        cleric: 83,
        paladin: 130,
        ranger: 177,
        barbarian: 224
    },
    plant: {
        rogue: 30,
        cleric: 68,
        paladin: 106,
        ranger: 143,
        barbarian: 181
    }
}

export class BehaviorService {

    getBehaviorsForCategory(categoryName: string): Behavior[] {
        return categoryList[categoryName];
    }

    getBaseHp(props: { class: PetClass, type: PetType }) {
        return baseHpList[props.type][props.class];
    }
    getLevelMod(props: { type: PetType }) {
        return modList[props.type];
    }

    get behaviorCategories(): string[] {
        let categoryNameList: string[] = Object.keys(categoryList);
        return categoryNameList;
    }

    get classList(): PetClass[] {
        return (
            [
                "rogue",
                "cleric",
                "paladin",
                "ranger",
                "barbarian"
            ]
        )
    }

    get typeList(): PetType[] {
        return (
            [
                "dog",
                "cat",
                "fish",
                "reptile",
                "bird",
                "equine",
                "small mammal",
                "bug",
                "amphibian",
                "farm animal",
                "exotic",
                "plant"
            ]
        )
    }
}