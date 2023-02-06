"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputDressing = exports.containerDressing = exports.canvasDressing = void 0;
function canvasDressing(canvas) {
    canvas.width = 100;
    canvas.height = 100;
}
exports.canvasDressing = canvasDressing;
function containerDressing(container) {
    let styleSheet = "width: 300px;height: 100px;background-color: #333;border-radius: 20px;border: 1px solid white;outline: 1px solid black; display: flex; flex-flow: row no-wrap; justify-content: space-evenly; align-items:center";
    container.setAttribute("style", styleSheet);
}
exports.containerDressing = containerDressing;
function inputDressing(container) {
    let styleSheet = "width: 2ch; font-size:2rem; padding: 5px; backgroud-color: cyan; border: 1px solid black; border-radius:10px;";
    container.setAttribute("style", styleSheet);
}
exports.inputDressing = inputDressing;
