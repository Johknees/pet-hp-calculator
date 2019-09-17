
export type PetClass = "rogue" | "cleric" | "paladin" | "ranger" | "barbarian";
export type PetType = "dog" | "cat" | "small mammal";

export interface PetInterface {
    petName: string;
    petType: PetType;
    petClass: PetClass;
    level: number;
    duration: number;
    behaviors: PetBehaviorMap;
}

export type BehaviorCategory = keyof PetBehaviorMap;

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