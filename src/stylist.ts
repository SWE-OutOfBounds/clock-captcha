export function canvasDressing(canvas: HTMLCanvasElement) : void{
    canvas.width = 100;
    canvas.height = 100;
}
export function containerDressing(container: HTMLElement) : void{
    let styleSheet : string = "width: 300px;height: 100px;background-color: #333;border-radius: 20px;border: 1px solid white;outline: 1px solid black;";
    container.setAttribute("style", styleSheet);
}
