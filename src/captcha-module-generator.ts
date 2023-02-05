// External Modules
import { Canvg } from "canvg";

// Internal Modules
import { canvasDressing, containerDressing, inputDressing } from "./stylist";

function setClock(canvas: HTMLCanvasElement, time:number) {
    let hrRotation : number = (360/12) * (Math.trunc(time/3600)%12);
    let minRotation : number = (360/60) * (Math.trunc(time/60)%60);
    let secRotation : number = (360/60) * (time%60);
    
    let v = null;

    const ctx = canvas ? canvas.getContext('2d') : null;

    // Read the SVG string using the fromString method
    // of Canvg
    if (ctx) v = Canvg.fromString(ctx, `<svg id="clock" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 600 600">
    <g id="face">
      <circle class="circle" cx="300" cy="300" r="253.9" fill="white" fill-rule="evenodd" stroke="black" stroke-width="9" stroke-miterlimit="10" />
      <path class="hour-marks" fill="none" stroke="#000" stroke-width="9" stroke-miterlimit="10"
        d="M300.5 94V61M506 300.5h32M300.5 506v33M94 300.5H60M411.3 107.8l7.9-13.8M493 190.2l13-7.4M492.1 411.4l16.5 9.5M411 492.3l8.9 15.3M189 492.3l-9.2 15.9M107.7 411L93 419.5M107.5 189.3l-17.1-9.9M188.1 108.2l-9-15.6" />
      <circle class="mid-circle" cx="300" cy="300" r="16.2" fill="black" />
    </g>
    <g id="hour" style="transform-origin: 300px 300px; transition: transform 0.5s ease-in-out; transform: rotate(`+ hrRotation + `);">
      <path class="hour-arm" d="M300.5 298V142" fill="none" fill-rule="evenodd" stroke="black" stroke-width="17" stroke-miterlimit="10" />
      <circle class="sizing-box" cx="300" cy="300" r="253.9" fill="none" />
    </g>
    <g id="minute" style="transform-origin: 300px 300px; transition: transform 0.5s ease-in-out; transform: rotate(`+ minRotation + `);">
      <path class="minute-arm" d="M300.5 298V67" fill="none" fill-rule="evenodd" stroke="black" stroke-width="11" stroke-miterlimit="10" />
      <circle class="sizing-box" cx="300" cy="300" r="253.9" fill="none" />
    </g>
    <g id="second" style="transform-origin: 300px 300px; transition: transform 0.5s ease-in-out; transform: rotate(`+ secRotation + `);">
      <path class="second-arm" d="M300.5 350V55" fill="none" fill-rule="evenodd" stroke="black" stroke-width="4"  stroke-miterlimit="10" />
      <circle class="sizing-box" cx="300" cy="300" r="253.9" fill="none"/>
    </g>
    <line id="line" x1="50" y1="150" x2="1000" y2="600" stroke="black" stroke-width="7" />
    <line id="line" x1="200" y1="100" x2="300" y2="500" stroke="black" stroke-width="7"/>
    <line id="line" x1="1000" y1="50" x2="50" y2="500" stroke="black" stroke-width="7"/>
    <line id="line" x1="100" y1="250" x2="500" y2="450" stroke="black" stroke-width="7"/>
    <line id="line" x1="60" y1="300" x2="900" y2="50" stroke="black" stroke-width="7"/>
  </svg>`);

    if (v) v.start();
};

export function generateCaptcha(): number {
    let time : number = Math.trunc(Math.random() * (2*24*60*60));

    let captchaContainer: HTMLElement = (document.getElementById('clock-captcha'));
    //check if element exists
    containerDressing(captchaContainer);

    let canvas = document.createElement('canvas');
    canvasDressing(canvas);
    captchaContainer.appendChild(canvas);

    let inputContainer = document.createElement('div');

    let hoursInput = document.createElement('input');
    hoursInput.setAttribute("type", "text");
    hoursInput.setAttribute("maxlength", "2");
    inputDressing(hoursInput);
    inputContainer.appendChild(hoursInput);

    let minutesInput = document.createElement('input');
    minutesInput.setAttribute("type", "text");
    minutesInput.setAttribute("maxlength", "2");
    inputDressing(minutesInput);
    inputContainer.appendChild(minutesInput);

    let secondsInput = document.createElement('input');
    secondsInput.setAttribute("type", "text");
    secondsInput.setAttribute("maxlength", "2");
    inputDressing(secondsInput);
    inputContainer.appendChild(secondsInput);

    captchaContainer.appendChild(inputContainer);

    setClock(canvas, time);

    return time;
}