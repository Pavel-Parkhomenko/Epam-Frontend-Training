import { default as Student } from './student.js'

let option = {
    ind: 0,
    operation: "notset",
    student: {}
}

let form = document.querySelector("form");

window.addEventListener("load", () => {
    (async () => {
        let data = await getData();
        fillForm(data);
    })()
})

function fillForm(data) {
    form["id"].value = data.id;
    form["fName"].value = data.firstName;
    form["sName"].value = data.secondName;
    form["age"].value = data.age;
    form["speclt"].value = data.speciality;
}

function addStudent() {
    let s = new Student();
    s.id = parseInt(form["id"].value)
    s.firstName = form["fName"].value
    s.secondName = form["sName"].value
    s.age = parseInt(form["age"].value)
    s.speciality = form["speclt"].value
    option.student = s.toJson();
}

document.querySelector("form").addEventListener("click", async (event) => {
    event.preventDefault();

    if (!event.target.classList.contains("btn")) return;

    switch (event.target.classList[1]) {
        case "btn-prev": await prev(); break;
        case "btn-insert": await insert(); break;
        case "btn-edit": await edit(); break;
        case "btn-next": await next(); break;
    }
})

async function prev() {
    console.log("prev");
    option.ind = option.ind - 1;
    let data = await getData();
    data ? fillForm(data) : option.ind = 0;
}

async function insert() {
    console.log("insert");
    option.operation = "insert";
    addStudent()
    await getData();
    document.querySelector(".message").textContent = "Запись добавлена";
}

async function edit() {
    console.log("edit");
    option.operation = "edit";
    addStudent();
    await getData();
    document.querySelector(".message").textContent = "Изменено";
}

async function next() {
    console.log("next");
    option.ind = option.ind + 1;
    let data = await getData();
    data ? fillForm(data) : option.ind -= 1;
}

async function getData() {
    try {
        document.querySelector(".message").textContent = "";
        
        let response = await fetch('http://localhost:3000/', {
            method: "POST",
            body: JSON.stringify(option)
        });

        let data = await response.text();

        if (JSON.parse(data).message == "overload") {
            document.querySelector(".message").textContent = "Вы достигли предела";
            return null;
        }
        else {
            document.querySelector(".message").textContent = "";
            option.operation = "notset";
            return JSON.parse(data);
        }
    }
    catch (err) { alert("Сервер не отвечает: " + err) }
}