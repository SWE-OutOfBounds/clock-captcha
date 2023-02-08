"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rightColumnDressing = exports.buttonDressing = exports.titleDressing = exports.inputDressing = exports.inputContainerDressing = exports.containerDressing = exports.canvasDressing = void 0;
function canvasDressing(canvas) {
    canvas.width = 100;
    canvas.height = 100;
    canvas.style.backgroundColor = "white";
    canvas.style.border = "2px solid black";
    canvas.style.boxSizing = "border-box";
    canvas.style.transform = "rotate(-7deg) scale(1.05)";
}
exports.canvasDressing = canvasDressing;
function containerDressing(container) {
    let styleSheet = "width: 300px;height: 100px; background-color: #333; background-image: linear-gradient(to right, #434343 0%, black #333); display: flex; flex-flow: row nowrap; justify-content:center;padding:0;";
    container.setAttribute("style", styleSheet);
}
exports.containerDressing = containerDressing;
function inputContainerDressing(container) {
    let styleSheet = "width: 100%;display: flex; flex-flow: row nowrap; justify-content:center;padding:0;align-items: center;";
    container.setAttribute("style", styleSheet);
}
exports.inputContainerDressing = inputContainerDressing;
function inputDressing(element) {
    let styleSheet = "width: 5ch; font-size:1.5rem; padding: 5px; background-color:rgb(0,0,0,.3); border: 1px solid white; border-radius:5px; color:white; text-align:center;";
    element.setAttribute("style", styleSheet);
}
exports.inputDressing = inputDressing;
function titleDressing(element) {
    let styleSheet = "font-size: .9rem; font-weight: bold; font-variant-caps: petite-caps; text-align:center; padding:0 5px; margin: 0; width: 100%; color : white; display:block; box-sizing: border-box";
    element.setAttribute("style", styleSheet);
}
exports.titleDressing = titleDressing;
function buttonDressing(element) {
    let styleSheet = "font-size:1.1rem; padding: 8.5px; border: 1px solid white; border-radius:5px; background-color:rgb(0,0,0,.3); margin-left: 10px; color: white;";
    element.setAttribute("style", styleSheet);
}
exports.buttonDressing = buttonDressing;
function rightColumnDressing(element) {
    let styleSheet = "width: calc(100% - 100px); display:flex; flex-flow:column nowrap; justify-content: space-evenly; align-items:center";
    element.setAttribute("style", styleSheet);
}
exports.rightColumnDressing = rightColumnDressing;
