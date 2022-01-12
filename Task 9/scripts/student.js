export default class Student {

    #id; #firstName; #secondName; #age; #speciality;

    constructor() { }

    get id() { return this.#id; }
    set id(value) { this.#id = value; }

    get firstName() { return this.#firstName; }
    set firstName(value) { this.#firstName = value; }

    get secondName() { return this.#secondName; }
    set secondName(value) { this.#secondName = value; }

    get age() { return this.#age; }
    set age(value) { this.#age = value; }

    get speciality() { return this.#speciality; }
    set speciality(value) { this.#speciality = value; }

    toJson() {
        return JSON.stringify({
            id: this.#id,
            firstName: this.#firstName,
            secondName: this.#secondName,
            age: this.#age,
            speciality: this.#speciality
        })
    }
}