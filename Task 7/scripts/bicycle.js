const canv = document.getElementById("canvas");
const ctx = canv.getContext("2d");
const color = "#92ccd8";
const colorStroke = "#376694";

canv.width = window.innerWidth;
canv.height = window.innerHeight;

ctx.strokeStyle = colorStroke;
ctx.fillStyle = color;

const x = 300;
const y = 300;
const r = 70;
wheel(x, y);
wheel(x + 350, y);
frame();

canv.addEventListener("mousemove", (event) => {
    console.log(event.clientX, event.clientY);
})

function wheel(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
}

function frame() {
    //frame left wheel
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 350 / 2, y);

    //frame to rule
    let length = 175;
    let angle = -Math.PI / 4;
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);

    // left-right frame
    ctx.moveTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
    ctx.lineTo(2 * x + 28, 175);
    ctx.lineTo(x + 350 / 2, y)

    //frame from pedali to rule
    ctx.moveTo(413, 148);
    ctx.lineTo(x + 350 / 2, y)

    //frame sedenie
    ctx.moveTo(x + 75, 148);
    ctx.lineTo(x + 150, 148)

    //frame right wheel
    angle = -Math.PI / 1.8;
    ctx.moveTo(x + 350, y);
    ctx.lineTo(x + 350 + Math.cos(angle) * length, y + Math.sin(angle) * length);
    ctx.lineTo(650, 100);
    ctx.moveTo(x + 350 + Math.cos(angle) * length, y + Math.sin(angle) * length);
    ctx.lineTo(580, 130)

    ctx.stroke();

    //karetka
    ctx.beginPath();
    ctx.arc(x + 350 / 2, y, 20, Math.PI * 2, false);

    //pedali
    ctx.moveTo(491, 310);
    //ctx.lineTo(515, 320);
    angle = Math.PI / 4;
    ctx.lineTo(491 + Math.cos(angle) * 15, 307 + Math.sin(angle) * 15);

    ctx.moveTo(459, 287);
    //ctx.lineTo(515, 320);
    angle = Math.PI / 0.85
    ctx.lineTo(459 + Math.cos(angle) * 15, 287 + Math.sin(angle) * 15)

    ctx.stroke();

}