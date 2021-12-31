const canv = document.getElementById("canvas");
const ctx = canv.getContext("2d");
const commonColor = "#985b5b";
const color = "#000000";

canv.width = window.innerWidth;
canv.height = window.innerHeight;

ctx.lineWidth = 3;

drawHouse();
door();
windows(320, 330);//y = 30 x = 50 between = 50
windows(320, 365);
windows(375, 330);
windows(375, 365);

windows(475, 330);//y = 30 x = 50
windows(475, 365);
windows(530, 330);
windows(530, 365);

windows(475, 435);//y = 30 x = 50
windows(475, 470);
windows(530, 435);
windows(530, 470);//560 255

tube();

document.addEventListener("mousemove", (event) => {
    console.log(event.clientX - 8, event.clientY - 8);
})

function tube() {
    ctx.beginPath()
    ctx.fillStyle = commonColor;
    ctx.fillRect(530, 155, 30, 100);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = commonColor;
    ctx.strokeStyle = color;
    ctx.moveTo(560, 155);
    ctx.lineTo(560, 255);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = commonColor;//!!!
    ctx.moveTo(560, 255);
    ctx.lineTo(530, 255);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(530, 255);
    ctx.lineTo(530, 155);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(545, 155, 5, 15, Math.PI / 2, 0, 2 * Math.PI);
    //ctx.fill();
    ctx.stroke();
    ctx.fill();
}

function drawHouse() {
    ctx.beginPath();
    ctx.fillStyle = commonColor;
    ctx.strokeStyle = color;
    // |
    ctx.moveTo(300, 300);
    ctx.lineTo(300, 600);
    // _
    ctx.lineTo(600, 600);
    // |
    ctx.lineTo(600, 300);
    // -
    ctx.lineTo(300, 300);

    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    let angle = -Math.PI / 4;
    let length = 1 / 2 * 300 / Math.sin(-angle);
    ctx.moveTo(300, 300)
    ctx.lineTo(300 + Math.cos(angle) * length, 200 + Math.sin(angle) * length);
    ctx.moveTo(300 + Math.cos(angle) * length, 200 + Math.sin(angle) * length);
    ctx.lineTo(600, 300);
    ctx.lineTo(300, 300);

    ctx.fill();
    ctx.stroke();
}

function door() {
    ctx.beginPath();
    ctx.moveTo(330, 600);
    ctx.lineTo(330, 460);

    ctx.bezierCurveTo(360, 430, 390, 430, 430, 460);
    ctx.lineTo(430, 600);

    ctx.moveTo(380, 600);
    ctx.lineTo(380, 437);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(365, 545, 5, 0, Math.PI * 2, false);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(394, 545, 5, 0, Math.PI * 2, false);
    
    ctx.stroke();
}

function windows(x, y) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 50, 30);
    ctx.fill();
}