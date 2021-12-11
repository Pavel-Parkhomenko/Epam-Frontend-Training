import { default as Pizza } from "../scripts/pizza.js";

/**
 * @author Parkhomenko Pavel
 * @class Pizzeria
*/
export default class Pizzeria {
    /** @constructor */
    constructor() {
    }

    /**
     * @description Calculating the total cost
     * @returns {float}
     */
    computeCommonCost() {
        console.log(this);
        let sum = 0;
        if (this.bases != undefined)
            sum += this.bases.cost;
        if (this.ingredients != undefined)
            sum += this.ingredients.cost;
        if (this.sauce != undefined)
            sum += this.sauce.cost;
        if (this.spice != undefined)
            sum += this.spice.cost;

        return sum;
    }

    /**
     * @description Calculating the total calorie
     * @returns {float}
     */
    computeCommonCalorie() {
        let sum = 0;
        if (this.bases != undefined)
            sum += this.bases.calorie;
        if (this.ingredients != undefined)
            sum += this.ingredients.calorie;
        if (this.sauce != undefined)
            sum += this.sauce.calorie;
        if (this.spice != undefined)
            sum += this.spice.calorie;

        return sum;
    }
}