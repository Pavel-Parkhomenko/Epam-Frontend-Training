const canv = document.getElementById("canvas");
const ctx = canv.getContext("2d");
const colorHead = "#92ccd8";
const colorHat = "#376694";

document.addEventListener("mousemove", (event) => {
    console.log(event.clientX - 8, event.clientY - 8);
})

canv.width = window.innerWidth;
canv.height = window.innerHeight;

circle();
eye(260, 335);
eye(330, 335);
nose();
mouth();
elipse();
zelindr();

function mouth() {
    ctx.beginPath();
    ctx.strokeStyle = colorHat;
    ctx.ellipse(280, 390, 10, 30, Math.PI / 1.7, 0, 2 * Math.PI);
    ctx.stroke();
}

function nose() {
    ctx.beginPath();
    ctx.strokeStyle = colorHat;
    ctx.moveTo(290, 340);
    ctx.lineTo(280, 375);
    ctx.lineTo(300, 375);
    ctx.stroke();
}

function eye(x, y) {
    ctx.beginPath();
    ctx.ellipse(x, y, 10, 20, Math.PI / 2, 0, 2 * Math.PI);
    ctx.fillStyle = colorHead;
    ctx.strokeStyle = colorHat;
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(x-6, y, 5, 7, Math.PI, 0, 2 * Math.PI);
    ctx.fillStyle = colorHat;
    ctx.strokeStyle = colorHead;
    ctx.fill();
    ctx.stroke();   
}

function elipse() {
    ctx.beginPath();
    ctx.fillStyle = colorHat;
    ctx.strokeStyle = "black";
    ctx.ellipse(300, 300, 25, 75, Math.PI / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    
}

function circle() {
    ctx.beginPath();
    ctx.fillStyle = colorHead;
    ctx.strokeStyle = colorHat;
    ctx.arc(303, 353, 70, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
}

function zelindr() {
    ctx.beginPath();
    ctx.strokeStyle = colorHat;
    ctx.moveTo(250, 220);
    ctx.lineTo(250, 282);//r 40

    ctx.ellipse(300, 282, 50, 25, Math.PI, 0, Math.PI, true);
    ctx.lineTo(350, 220);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(250, 220);
    ctx.lineTo(250, 282);

    ctx.ellipse(300, 282, 50, 25, Math.PI, 0, Math.PI, true);
    ctx.lineTo(350, 220);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.ellipse(300, 220, 50, 25, Math.PI, 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.fill();
}