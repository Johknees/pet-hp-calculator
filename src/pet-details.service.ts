import { PetState } from "./pet";

let initialState: PetState = {
    petId: 0,
    petList: [],
    curPet: {
        id: 0,
        name: "",
        type: "cat",
        class: "barbarian",
        level: 0,
        duration: 0,
        hp: 0,
        behaviors: {
            feeding: [],
            vocalizations: [],
            grooming: [],
            class: []
        }
    }
};

export class PetDetailsService {

    petState: PetState = initialState;
    constructor() {
        if (window.localStorage.getItem('pet-details')) {
            let petJson = window.localStorage.getItem('pet-details');
            if (petJson !== null) {
                let c: PetState = JSON.parse(petJson);
                this.petState = c;
            }
        }
    }

    update(petState: PetState) {
        let json = JSON.stringify(petState);
        window.localStorage.setItem('pet-details', json);
    }

    get savedState() {
        return this.petState;
    }
}