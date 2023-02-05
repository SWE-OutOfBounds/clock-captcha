export function canvasDressing(canvas: HTMLCanvasElement) : void{
    canvas.width = 100;
    canvas.height = 100;
}
export function containerDressing(container: HTMLElement) : void{
    let styleSheet : string = "width: 300px;height: 100px;background-color: #333;border-radius: 20px;border: 1px solid white;outline: 1px solid black; display: flex; flex-flow: row no-wrap; justify-content: space-evenly; align-items:center";
    container.setAttribute("style", styleSheet);
}
export function inputDressing(container: HTMLElement) : void{
    let styleSheet : string = "width: 2ch; font-size:2rem; padding: 5px; backgroud-color: cyan; border: 1px solid black; border-radius:10px;";
    container.setAttribute("style", styleSheet);
}