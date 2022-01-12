import { default as Event } from './src/event.js';

let mySelect = document.querySelector("#select-file");

document.querySelector(".but-edit").addEventListener("click", (event) => {
    getData("GET", "../server/json/" + mySelect.value + ".json").then((data) => {
        let form = document.getElementById("form");
        form.replaceChildren();
        let keys = Object.keys(data[0]);
        let values = Object.values(data[0]);
        for (let i = 0; i < keys.length; i++) {
            form.insertAdjacentHTML("beforeend", "<p>" + keys[i] + "</p>");
            form.insertAdjacentHTML("beforeend", '<input type="text" class="inp-text" ' + 'name="' +
                keys[i] + '" value="' + values[i] + '">');
        }
        form.insertAdjacentHTML("beforeend", '<br><br><button type="submit">Отправить</button>');
    });
})

document.querySelector("#form").addEventListener("submit", async (e) => {
    e.preventDefault();
    let inpts = document.querySelectorAll(".inp-text");
    let flag = true;
    inpts.forEach(inpt => {
        if (inpt.value == "") {
            inpt.style.background = "red";
            flag = false;
        }
    })
    if (flag == true) {
        let form = document.getElementById("form");
        let newEvent = new Event();
        newEvent.name = form['name'].value;
        newEvent.date = form['date'].value;
        newEvent.importance = form['importance'].value;
        newEvent.comment = form['comment'].value;
        newEvent.nameFile = mySelect.value;
        try {
            const data = await getData("POST", "http://localhost:8000/", newEvent.toJSON())
            console.log(data[0]);
        }
        catch (err){console.log(err);}
    }
})

function getData(method, url, body = null) {
    return new Promise((resolve, reject) => {
        let xHttp = new XMLHttpRequest();
        xHttp.open(method, url, true);
        xHttp.responseType = "json";
        xHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xHttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    let data = this.response;
                    let info = {
                        state: this.readyState,
                        status: this.status,
                        statusText: this.statusText,
                        responseType: this.responseType,
                    }
                    resolve([data, info]);
                }
                else {
                    reject(new Error("file not found"))
                }
            }
        }
        xHttp.send(body);
    });
}

function addDataToHtml(id, data) {
    let div = document.querySelector(".div-info-" + id);
    div.replaceChildren();
    let keys = Object.keys(data);
    let values = Object.values(data);
    for (let i = 0; i < keys.length; i++) {
        div.insertAdjacentHTML("beforeend", "<p class='text-key'>" + keys[i] + "</p>");
        div.insertAdjacentHTML("beforeend", "<span>" + values[i] + "</span>");
    }
}

function addInfoRequest(id, seconds, info) {
    let div = document.querySelector(".logs-" + id);
    div.replaceChildren();
    let keys = Object.keys(info);
    keys.push("sec");
    let values = Object.values(info);
    values.push(seconds);
    div.insertAdjacentHTML("beforeend", "<span>" + id + ":&nbsp" + "</span>");
    for (let i = 0; i < keys.length; i++) {
        div.insertAdjacentHTML("beforeend", "<span>" + keys[i] + ":&nbsp" + "</span>");
        div.insertAdjacentHTML("beforeend", "<span>" + values[i] + ":&nbsp" + "</span>");
    }
}

let cnt = 0;
let seconds = 0;

let interval = setInterval(function () {
    cnt++; seconds++;
    if (cnt == 4) cnt = 1;
    getData("GET", "../server/json/event-" + cnt + ".json")
        .then((data) => {
            addDataToHtml(cnt, data[0]);
            addInfoRequest(cnt, seconds, data[1]);
        })
        .catch((error) => { console.log(error.message) })
}, 1000)