
export type PetClass = "rogue" | "cleric" | "paladin" | "ranger" | "barbarian";
export type PetType = "dog" | "cat" | "fish" | "reptile" | "bird" | "equine" | "small mammal" | "bug" | "amphibian" | "farm animal" | "exotic" | "plant";

export interface PetInterface {
    id: number;
    name: string;
    type: PetType;
    class: PetClass;
    level: number;
    hp: number;
    duration: number;
    behaviors: PetBehaviorMap;
}

export type BehaviorCategory = keyof PetBehaviorMap;
export type PetBaseHpEntryMap = {
    [key in PetType]: PetBaseHpEntry;
}

export interface PetState {
    petId: number;
    petList: PetInterface[];
    curPet: PetInterface;
}

export type PetBaseHpEntry = {
    rogue: number;
    cleric: number;
    paladin: number;
    ranger: number;
    barbarian: number;
}
export type PetModEntryMap = {
    [key in PetType]: number;
}

export interface BehaviorCategoryMap {
    [key: string]: Behavior[];
}

export interface PetBehaviorMap {
    vocalizations: Behavior[];
    grooming: Behavior[];
    feeding: Behavior[];
    class: Behavior[];
}

export interface Behavior {
    description: string;
    weight: number;
    tally: number;
}