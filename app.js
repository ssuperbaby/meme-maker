const saveBtn = document.querySelector(".download");
const TXT = document.querySelector(".txt");
const imgBtn = document.querySelector(".img");
const EreaseBtn = document.querySelector("#EreaseBtn");
const fillBtn = document.querySelector("#fillBtn");
const DelBtn = document.querySelector("#DelBtn");
const colorOptions = document.querySelectorAll("#color_option");
const color = document.querySelector(".color");
const lineWidth = document.querySelector("#line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const center = 250;

canvas.width = 500;
canvas.height = 500;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
let isPainting = false;
let nowColor = "#000000";
let isFill = false;
let EreaseColor = "#C4DCCE";

function Move(event) {
  if (isPainting) {
    if (isFill) {
      ctx.fillRect(0, 0, 500, 500);
      return;
    }
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}

function LW(event) {
  ctx.lineWidth = event.target.value;
}

function changeColor(color) {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function changeNowColor(event) {
  ctx.lineWidth = lineWidth.value;
  nowColor = event.target.value;
  changeColor(nowColor);
}

function clickColorOption(event) {
  ctx.lineWidth = lineWidth.value;
  nowColor = event.target.dataset.color;
  changeColor(nowColor);
  color.value = nowColor;
}

function Btnfunction() {
  if (isFill) {
    isFill = false;
    fillBtn.innerText = "Draw";
  } else {
    isFill = true;
    fillBtn.innerText = "Fill";
  }
}

function clickForFill() {
  if (isFill) {
    ctx.fillRect(0, 0, 500, 500);
    EreaseColor = nowColor;
  }
}

function EreaseAll() {
  changeColor("#C4DCCE");
  ctx.fillRect(0, 0, 500, 500);
  changeColor(nowColor);
  EreaseColor = "#C4DCCE";
}

function Erease() {
  changeColor(EreaseColor);
  isFill = false;
  fillBtn.innerText = "Draw";
  ctx.lineWidth = 50;
}

function onImg(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.addEventListener("load", () => {
    ctx.drawImage(image, 0, 0, 500, 500);
  });
  imgBtn.value = null;
}

function onTXT(event) {
  ctx.save();
  const text = TXT.value;
  ctx.lineWidth = 1;
  ctx.font = "70px serif";
  ctx.fillText(text, event.offsetX, event.offsetY);
  ctx.restore();
}

function onSave() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.jpeg";
  a.click();
}

canvas.addEventListener("mousedown", () => {
  isPainting = true;
});
document.addEventListener("mouseup", () => {
  isPainting = false;
});
canvas.addEventListener("mousemove", Move);
lineWidth.addEventListener("change", LW);
color.addEventListener("change", changeNowColor);
colorOptions.forEach((colorOption) => {
  colorOption.addEventListener("click", clickColorOption);
});
fillBtn.addEventListener("click", Btnfunction);
canvas.addEventListener("click", clickForFill);
DelBtn.addEventListener("click", EreaseAll);
EreaseBtn.addEventListener("click", Erease);
imgBtn.addEventListener("change", onImg);
canvas.addEventListener("dblclick", onTXT);
saveBtn.addEventListener("click", onSave);
