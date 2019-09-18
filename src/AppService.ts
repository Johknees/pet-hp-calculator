import { PetInterface } from "./pet";


export class PetDetailsService {
    constructor() {
        if (window.localStorage.getItem('pet-details')) {
            let petJson = window.localStorage.getItem('pet-details');
            if (petJson !== null) {
                let c: PetInterface = JSON.parse(petJson);
                // c.forEach((x) => this.caught.add(x));
            }
        }
    }

    update() {
        let json = JSON.stringify(this.caught);
        window.localStorage.setItem('pet-details', json);
    }

    caught: Set<number> = new Set<number>();

    add(id: number) {
        this.caught.add(id);
        this.update();
    }

    remove(id: number) {
        this.caught.delete(id);
        this.update();
    }

    has(id: number): boolean {
        return this.caught.has(id);
    }

    get count(): number {
        return this.caught.size;
    }
}