"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyDresser = exports.titleDressing = exports.inputDressing = exports.containerDressing = exports.canvasDressing = void 0;
function canvasDressing(canvas) {
    canvas.width = 100;
    canvas.height = 100;
}
exports.canvasDressing = canvasDressing;
function containerDressing(container) {
    let styleSheet = "width: 300px;height: min-content;background-color: #333;border-radius: 20px; display: flex; flex-flow: column nowrap; justify-content:center;";
    container.setAttribute("style", styleSheet);
}
exports.containerDressing = containerDressing;
function inputDressing(element) {
    let styleSheet = "width: 2ch; font-size:2rem; padding: 5px; backgroud-color: cyan; border: 1px solid black; border-radius:10px;";
    element.setAttribute("style", styleSheet);
}
exports.inputDressing = inputDressing;
function titleDressing(element) {
    let styleSheet = "font-size: 1.1rem; font-variant-caps: petite-caps; text-align:center; padding:5px 5px 0 5px; margin: 0;width: 100%; color : white; display:block; box-sizing: border-box";
    element.setAttribute("style", styleSheet);
}
exports.titleDressing = titleDressing;
function bodyDresser(element) {
    let styleSheet = "width: 100%; display:flex; flex-flow:row nowrap; justify-content: space-evenly; align-items:center";
    element.setAttribute("style", styleSheet);
}
exports.bodyDresser = bodyDresser;
