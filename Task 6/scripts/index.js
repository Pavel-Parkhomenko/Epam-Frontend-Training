import { store } from './store.js';
import { default as Pizza } from '../scripts/pizza.js';

//наценка
const extraСharge = [100, 125];

const basesSelect = document.getElementById("basesSelect");
const ingredientsSelect = document.getElementById("ingredientsSelect");
const sauceSelect = document.getElementById("sauceSelect");
const spiceSelect = document.getElementById("spiceSelect");
const butSend = document.querySelector(".butSend");

let pizza;

/**
 * @description Send button click event
 */
butSend.addEventListener("click", async () => {
    console.log(JSON.stringify(pizza));
    try {
        let response = await fetch('http://localhost:8000/', {
            method: 'POST',
            body: JSON.stringify(pizza)
        });

        let result = JSON.parse(await response.text());
        console.log(result);
        alert('Пицца отправлена на сервер');
    } catch {
        alert('Сервер не отвечает, попробуйте позже.');
    }
})

document.querySelector('.butCompute').addEventListener('click', (event) => {

    if (checkSelect() == false) return;

    pizza = new Pizza();
    pizza.bases = store.bases[basesSelect.value];
    pizza.ingredients = store.ingredients[ingredientsSelect.value];
    pizza.sauce = store.sauce[sauceSelect.value];
    pizza.spice = store.spice[spiceSelect.value];

    checkExtraСharge(pizza);
    document.querySelector('.commonCalorie').textContent = pizza.computeCommonCalorie();
})

function checkSelect() {
    if (basesSelect.value == "Выберите основу") {
        document.querySelector('.textInfo').textContent = "Сначала выберите основу для пиццы";
        return false;
    }
    else if (ingredientsSelect.value == "Выберите ингридиент") {
        document.querySelector('.textInfo').textContent = "Сначала выберите ингридиент для пиццы";
        return false;
    }
    butSend.disabled = false;
    document.querySelector('.textInfo').textContent = "Пицца сформированна";
    return true;
}

/**
* @description Checking and setting margins on the finished product
* @param {object} pizza
*/
function checkExtraСharge(pizza) {
    let commonCost = pizza.computeCommonCost();
    let commonCostInfo = document.querySelector('.commonCost');
    if (commonCost < extraСharge[0]) {
        document.querySelector('.extraСharge').textContent = "20%";
        commonCostInfo.textContent = commonCost + commonCost * 0.2;
    }
    else if (commonCost > extraСharge[0] && commonCost < extraСharge[1]) {
        document.querySelector('.extraСharge').textContent = "15%";
        commonCostInfo.textContent = commonCost + commonCost * 0.2;

    }
    else {
        document.querySelector('.extraСharge').textContent = "10%";
        commonCostInfo.textContent = commonCost + commonCost * 0.2;
    }
}

document.querySelector('.makePizza').addEventListener("change", (event) => {
    if (checkSelect() == true) return;

    console.log(butSend.hasAttribute("disabled"))

    butSend.disabled = true;
})

for (let i = 0; i < Object.keys(store.bases).length; i++) {
    let option = new Option(Object.values(store.bases)[i].name, Object.keys(store.bases)[i]);
    basesSelect.append(option);
}

for (let i = 0; i < Object.keys(store.ingredients).length; i++) {
    let option = new Option(Object.values(store.ingredients)[i].name, Object.keys(store.ingredients)[i]);
    ingredientsSelect.append(option);
}

for (let i = 0; i < Object.keys(store.sauce).length; i++) {
    let option = new Option(Object.values(store.sauce)[i].name, Object.keys(store.sauce)[i]);
    sauceSelect.append(option);
}

for (let i = 0; i < Object.keys(store.spice).length; i++) {
    let option = new Option(Object.values(store.spice)[i].name, Object.keys(store.spice)[i]);
    spiceSelect.append(option);
}

//let test = new Pizzeria();
//test.test();