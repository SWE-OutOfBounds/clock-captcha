export function canvasDressing(canvas: HTMLCanvasElement): void {
  canvas.width = 100;
  canvas.height = 100;
  canvas.style.backgroundColor = "white";
  canvas.style.border = "2px solid black";
  canvas.style.boxSizing = "border-box";
  canvas.style.transform = "rotate(-7deg) scale(1.05)";
}
export function containerDressing(container: HTMLElement): void {
  let styleSheet: string =
    "width: 300px;height: 100px; background-color: #333; background-image: linear-gradient(to right, #434343 0%, black #333); display: flex; flex-flow: row nowrap; justify-content:center;padding:0;margin:20px 0;";
  container.setAttribute("style", styleSheet);
}
export function inputContainerDressing(container: HTMLElement): void {
  let styleSheet: string =
    "width: 100%;display: flex; flex-flow: row nowrap; justify-content:center;padding:0;align-items: center; outline:none;";
  container.setAttribute("style", styleSheet);
}
export function inputDressing(element: HTMLElement): void {
  let styleSheet: string =
    "width: 5ch; font-size:1.5rem; padding: 5px; background-color:rgb(0,0,0,.3); border: 1px solid white; border-radius:5px; color:white; text-align:center;";
  element.addEventListener("focus", () => {
    element.style.outline = "none";
  });
  element.setAttribute("style", styleSheet);
}
export function titleDressing(element: HTMLElement): void {
  let styleSheet: string =
    "font-size: .9rem; font-weight: bold; font-variant-caps: petite-caps; text-align:center; padding:0 5px; margin: 0; width: 100%; color : white; display:block; box-sizing: border-box";
  element.setAttribute("style", styleSheet);
}
export function buttonDressing(element: HTMLElement): void {
  let styleSheet: string =
    "font-size:1.1rem; padding: 8.5px; border: 1px solid white; border-radius:5px; background-color:rgb(0,0,0,.3); margin-left: 10px; color: white;";
  element.setAttribute("style", styleSheet);
}
export function rightColumnDressing(element: HTMLElement): void {
  let styleSheet: string =
    "width: calc(100% - 100px); display:flex; flex-flow:column nowrap; justify-content: space-evenly; align-items:center";
  element.setAttribute("style", styleSheet);
}
