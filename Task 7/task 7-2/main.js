const img = document.querySelector("#imgDuster");
const height = window.innerHeight;
const width = window.innerWidth;

let over = false;

window.addEventListener('DOMContentLoaded', () => {
	for (let i = 0; i < 10; i++) {
		randDuster(i);
	}
});

window.addEventListener("dragstart", event => {
	if (!event.target.classList.contains("duster")) return;
	console.log("dragstart")
	event.dataTransfer.setData("id", event.target.id);
})

window.addEventListener("dragend", event => {
	if (!event.target.classList.contains("duster")) return;
	console.log("dragend");
})

window.addEventListener("drag", event => {
	if (!event.target.classList.contains("duster")) return;
	console.log("drag");
	console.log(event.clientX, event.clientY);

})

img.addEventListener("dragover", event => {
	event.preventDefault();
	console.log("dragover");
	img.src = "img/dust-open.PNG";
	over = true;
})

window.addEventListener("dragover", event => {
	event.preventDefault();
})

img.addEventListener("dragleave", event => {
	event.preventDefault();
	console.log("dragleave");
	img.src = "img/dust-close.PNG";
	over = false;
})

window.addEventListener("drop", event => {
	console.log("drop");
	let item = document.getElementById(event.dataTransfer.getData("id"));
	item.style.top = event.clientY - 10 + "px";
	item.style.left = event.clientX - 10 + "px";
	console.log(event.clientX, event.clientY);

	if (over == true) {
		item.parentNode.removeChild(item);
		img.src = "img/dust-close.PNG";
		over = false;
	}
})
console.log(width, height)

function randDuster(i) {
	let duster = document.createElement("img");
	duster.setAttribute("draggable", "true");
	duster.style.zIndex = i;
	duster.id = "d-" + i;
	duster.classList.add("duster");
	duster.src = "img/duster.png";
	duster.style.left = randPosition()[0] - 10 + "px";
	duster.style.top = randPosition()[1] - 30 + "px";
	duster.style.position = "absolute";
	duster.style.cursor = "move";
	duster.style.userSelect = "none"
	document.body.append(duster);
	return duster;
}

function randPosition() {
	let posX = Math.random() * width;
	let posY = Math.random() * height;
	let pos = [posX, posY];

	while (true) {
		if (posX > 130 && posY > 130) {
			return pos;
		}
		else {
			posX = Math.random() * width;
			posY = Math.random() * height;
			pos = [posX, posY];
		}
	}
}