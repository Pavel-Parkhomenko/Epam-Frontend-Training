const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', '*', '/'];

//output window
const out = document.querySelector('.calc-screen textarea');
//our function, which is introduced
let func = "";

//array of numbers
const numbers = [];
//array of operators
const operatins = [];

//priority identifiers
let checkYesPriorety = document.getElementById("checkYesPriorety");
let checkNoPriorety = document.getElementById("checkNoPriorety");
//priority is selected by default
let priority = "yes";

//an array in which the history of calculations is stored
let expressionMemory = [];

//array of responses that are sent to the server
let answers = [];
//array of functions that are sent to the server
let functions = [];

document.querySelector(".buttons").addEventListener("click", (event) => {
    if (!event.target.classList.contains('btn')) return;
    //if INT is selected, the "dot" button is not available
    if (document.getElementById("radioInt").checked) {
        if (event.target.classList.contains("dot"))
            return;
    }
    //we execute it if the "add to memory" button is pressed
    if (event.target.classList.contains('memory-add')) {
        expressionMemory.push(out.value);
        out.textContent = "";
        func = "";
    }
    //we execute it if the "take from memory" button is pressed
    if (event.target.classList.contains('memory-out')) {
        if (expressionMemory.length == 0) return;
        func += expressionMemory.peek();
        out.value += expressionMemory.peek();
    }

    let key = event.target.textContent;
    switch (key) {
        case "C":
            func = func.substring(0, func.length - 1);
            out.value = func;
            break;
        case "=":
            if (document.getElementById("radioInt").checked) {
                intMethod();
                functions.push(func);
                answers.push(numbers.peek());
                out.value = numbers.pop();
                func = "";
            }
            else {
                floatMethod();
                functions.push(func);
                answers.push(numbers.peek());
                out.value = numbers.pop();
                func = "";
            }
            break;
    }
    if (digit.includes(key) || action.includes(key)) {
        func += event.target.textContent;
        out.value = func;
    }
});

//sending data to the server
document.querySelector("#butToServer").addEventListener("click",async function (event){
    let data = {
        func: functions,
        answ: answers,
    };
    console.log(data);
    try {
        let response = await fetch('http://localhost:8000/', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        alert('Данные успешно отправлены');
    }
    catch
    {
        alert('Сервер не отвечает, попробуйте позже.');
    }
});

let regInt = /\-|\+|\/|\*|[0-9]/;
let regFloat = /\-|\+|\/|\*|[0-9]|\./;

//keyboard input event
document.addEventListener("keypress", (event) => {
    event.preventDefault = false;
    //if INT is selected, the "dot" button is not available
    if (document.getElementById("radioInt").checked) {
        if (regInt.test(event.key)) {
            func += event.key;
            out.value = func;
        }
    }
    else {
        if (regFloat.test(event.key)) {
            func += event.key;
            out.value = func;
        }
    }
    if (event.key == "Enter") {
        //if the INT mode is selected, then we call the function intMethod()
        if (document.getElementById("radioInt").checked) {
            console.log("int");
            intMethod();
            functions.push(func);
            answers.push(numbers.peek());
            out.value = numbers.pop();
            func = "";
        }
        else {
            console.log("float");
            console.log(func)
            floatMethod();
            functions.push(func);
            answers.push(numbers.peek());
            out.value = numbers.pop();
            func = "";
        }
    }
})

//priority selection event
document.querySelector(".checkPriorety").addEventListener("click", (event) => {
    if (event.target.tagName != "INPUT") return;

    if (event.target.id == checkNoPriorety.id) {
        priority = "no";
        checkYesPriorety.checked = false;
    }
    else {
        priority = "yes";
        checkNoPriorety.checked = false;
    }
});

//the function takes the last element in the stack without deleting it
Array.prototype.peek = function () {
    if (this.length === 0) {
        throw new Error('out of bounds');
    }
    return this[this.length - 1];
}

function intMethod() {
    let fs = func.split("");
    for (let i = 0; i < fs.length; i++) {
        if (!isNaN(parseInt(fs[i], 10))) {
            let num = fs[i];
            let j = i + 1;
            while (!isNaN(parseInt(fs[j], 10))) {
                num += fs[j];
                j++; i++;
            }
            numbers.push(parseInt(num));
        }
        else {
            if (priority == "no") {
                if (operatins.length == 0) {
                    operatins.push(fs[i]);
                }
                else {
                    calculate();
                    operatins.push(fs[i]);
                }
            }
            else checkPriorety(fs[i]);
        }

        if (i == fs.length - 1) {
            while (operatins.length != 0) {
                calculate();
            }
        }

        console.log(numbers);
        console.log(operatins);
    }
}

function floatMethod() {
    let nums = func.split(/[\+\*\-\/]/g);
    console.log(nums);
    let ops = func.split(/[0-9]+\.[0-9]+|[0-9]+/g).filter(x => x != "");
    console.log(ops);
    let fs = [];
    for (let i = 0; i < nums.length; i++) {
        fs.push(nums[i]);
        if (i != nums.length - 1)
            fs.push(ops[i]);
    }
    console.log(fs);

    let i = -1;
    for (let k = 0; k < fs.length; k++) {
        i++;
        let num = fs[i];
        if (!isNaN(parseFloat(fs[i], 10))) {
            numbers.push(parseFloat(num));
        }
        else {
            if (priority == "no") {
                if (operatins.length == 0) {
                    operatins.push(fs[i]);
                }
                else {
                    calculate();
                    operatins.push(fs[i]);
                }
            }
            else checkPriorety(fs[i]);
        }

        if (k == fs.length - 1) {
            //calculate();
            while (operatins.length != 0) {
                calculate();
            }
        }

        console.log(numbers);
        console.log(operatins);
    }
}

//checking the priority of operations
function checkPriorety(operation) {
    if (operatins.length == 0) {
        operatins.push(operation);
    }
    else {
        //looping to perform all operations with the same priority
        while (true) {
            if (operatins.length == 0) {
                operatins.push(operation);
                break;
            }
            else if (getPriority(operation) > getPriority(operatins.peek())) {
                operatins.push(operation);
                break;
            }
            else if (getPriority(operation) < getPriority(operatins.peek())) {
                calculate();
            }
            else if (getPriority(operation) == getPriority(operatins.peek())) {
                calculate();
            }
            else {
                break;
            }
        }
    }
}

function calculate() {
    let n1;
    let n2;
    let flagPriorety = document.getElementById("radioInt").checked;
    //we take two numbers from the stack and perform the last operation on them from the stack
    switch (operatins.pop()) {
        case '-':
            n1 = numbers.pop();
            n2 = numbers.pop();
            if (flagPriorety) numbers.push(Math.round(n2 - n1));
            else numbers.push(n2 - n1);
            break;
        case '+':
            n1 = numbers.pop();
            n2 = numbers.pop();
            if (flagPriorety) numbers.push(Math.round(n2 + n1));
            else numbers.push(n2 + n1);
            break;
        case '/':
            n1 = numbers.pop();
            n2 = numbers.pop();
            if (flagPriorety) numbers.push(Math.round(n2 / n1));
            else numbers.push(n2 / n1);
            break;
        case '*':
            n1 = numbers.pop();
            n2 = numbers.pop();
            if (flagPriorety) numbers.push(Math.round(n2 * n1));
            else numbers.push(n2 * n1);
            break;
    }
}

function getPriority(str) {
    switch (str) {
        case '+': return 1;
        case '-': return 1;
        case '/': return 2;
        case '*': return 2;
    }
}