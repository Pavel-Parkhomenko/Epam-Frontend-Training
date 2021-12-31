export default class Event {
    //(дата события, время
    //события, наименование события, степень важности, примечания
    #date
    #name
    #importance
    #comment
    #file

    constructor() {
        //date, name, importance, comment
        // this.#date = date;
        // this.#name = name;
        // this.#importance = importance;
        // this.#comment = comment;
     }
    
    get date() { return this.#date }
    set date(value) { this.#date = value }
    
    get name() { return this.#name }
    set name(value) { this.#name = value }
    
    get importance() { return this.#importance }
    set importance(value) { this.#importance = value }

    get comment() { return this.#comment }
    set comment(value) { this.#comment = value }

    get nameFile() { return this.#file }
    set nameFile(value) { this.#file = value }

    toJSON() {
        return JSON.stringify({
            date: this.#date,
            name: this.#name,
            importance: this.#importance,
            comment: this.#comment,
            nameFile: this.#file
        });
    }
}