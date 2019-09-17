import { Behavior, BehaviorCategoryMap, PetClass, PetType } from "./pet";


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

export class BehaviorService {

    getBehaviorsForCategory(categoryName: string): Behavior[] {
        return categoryList[categoryName];
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
                "small mammal"
            ]
        )
    }
}