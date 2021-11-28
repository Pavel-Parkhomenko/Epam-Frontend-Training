// send form by id
let form = document.getElementById("form");

//add event "submit"
form.addEventListener("submit", function (event) {
    // cancel the default actions
    event.preventDefault()
    if (form["select"].value == "them1")
        them("../styles/tables/table1/table1.css"); // link on style table 1
    else if (form["select"].value == "them2")
        them("../styles/tables/table2/table2.css"); // link on style table 2
    else if (form["select"].value == "them3")
        them("../styles/tables/table3/table3.css"); // link on style table 3
})

//function for set link
function them(href) {
    let head = document.getElementsByTagName('head')[0];
    let style = document.getElementById("linkTable");
    style.rel = 'stylesheet';
    style.type = "text/css";
    style.href = href;
    head.appendChild(style);
}