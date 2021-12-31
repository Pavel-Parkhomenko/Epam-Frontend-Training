const img = document.querySelector("#imgDuster");
const height = window.innerHeight;
const width = window.innerWidth;

let moveImg;

for (let i = 0; i < 10; i++) {
    randDuster();
}

document.addEventListener("mousedown", (event) => {
    console.log(event.target.tagName);
    if (event.target.tagName == "IMG") {
        dragElement(event.target);
    }
})


function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    elmnt.onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
      e = e || window.event;
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

function randDuster(i) {
    let duster = document.createElement("img")
    duster.src = "img/duster.png";
    duster.style.left = Math.random() * width - 20 + "px";
    duster.style.top = Math.random() * height - 20 + "px";
    duster.style.position = "absolute";
    duster.style.cursor = "move"
    document.body.append(duster);
}

img.addEventListener("mouseover", () => {
    img.src = "img/dust-open.PNG";
})

img.addEventListener("mouseout", () => {
    img.src = "img/dust-close.PNG";
})