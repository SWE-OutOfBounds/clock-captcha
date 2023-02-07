export function canvasDressing(canvas: HTMLCanvasElement) : void{
    canvas.width = 100;
    canvas.height = 100;
}
export function containerDressing(container: HTMLElement) : void{
    let styleSheet : string = "width: 300px;height: min-content;background-color: #333;border-radius: 20px; display: flex; flex-flow: column nowrap; justify-content:center;";
    container.setAttribute("style", styleSheet);
}
export function inputDressing(element: HTMLElement) : void{
    let styleSheet : string = "width: 2ch; font-size:2rem; padding: 5px; backgroud-color: cyan; border: 1px solid black; border-radius:10px;";
    element.setAttribute("style", styleSheet);
}
export function titleDressing(element : HTMLElement) : void{
    let styleSheet : string = "font-size: 1.1rem; font-variant-caps: petite-caps; text-align:center; padding:5px 5px 0 5px; margin: 0;width: 100%; color : white; display:block; box-sizing: border-box";
    element.setAttribute("style", styleSheet);
}
export function bodyDresser(element: HTMLElement) : void{
    let styleSheet : string = "width: 100%; display:flex; flex-flow:row nowrap; justify-content: space-evenly; align-items:center";
    element.setAttribute("style", styleSheet);
}