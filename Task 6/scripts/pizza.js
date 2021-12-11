import { default as Pizzeria } from "../scripts/pizzeria.js";

/** 
 * @author Parkhomenko Pavel
 * @class Pizza 
 * @extends Pizzeria
 * */
export default class Pizza extends Pizzeria{
    /**#@+
     * @private
     */
    /** 
     * @type {Object}
     * @description base for pizza*/
    #bases;
    /** 
     * @type {Object} 
     * @description ingredirnts for pizza*/
    #ingredients;
    /** 
     * @type {Object} 
     * @description sauce for pizza*/
    #sauce;
    /** 
     * @type {Object} 
     * @description spice for pizza*/
    #spice;
    /**#@-*/

    /** @constructor */
    constructor() {
        super();
    }

    get bases() { return this.#bases; }
    set bases(value) { this.#bases = value; }

    get ingredients() { return this.#ingredients; }
    set ingredients(value) { this.#ingredients = value; }

    get sauce() { return this.#sauce; }
    set sauce(value) { this.#sauce = value; }

    get spice() { return this.#spice; }
    set spice(value) { this.#spice = value; }

    /**
     * @description Object serialization in JSON
     * @returns {JSON}
     */
    toJSON() {
        return JSON.stringify({
            bases: this.#bases,
            ingridients: this.#ingredients,
            sauce: this.#sauce,
            spice: this.#spice,
        });
    }
}   