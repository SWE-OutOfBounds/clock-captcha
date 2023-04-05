"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistortionDecorator = exports.NoisyClockCAPTCHA = exports.ClockCAPTCHA = void 0;
const canvg_1 = require("canvg");
const stylist = require("./stylist");
class ClockCAPTCHA {
    constructor() {
        this._moduleBody = document.createElement("div");
        this._checkButtonElement = document.createElement("button");
        this._userInputElement = document.createElement("input");
        this._canvas = document.createElement("canvas");
        this._message = document.createElement("p");
        this._canvasContent = document.createElement('g');
        this._filters = [];
        this._canvasContent.id = "mainContainer";
        this.moduleBuild();
        this.draw();
    }
    draw() {
        console.log("ClockCAPTCHA.draw()");
        var _timeInSec = Math.trunc(Math.random() * (12 * 60 * 60));
        let minRotation = (360 / 60) * (Math.trunc(_timeInSec / 60) % 60);
        let hrRotation = (360 / 12) * (Math.trunc(_timeInSec / 3600) % 12) + (360 / 12 / 60 * (Math.trunc(_timeInSec / 60) % 60));
        this._seed = "7364918734";
        this._canvasContent.innerHTML = `
                <g id="face">
                    <circle class="circle" cx="300" cy="300" r="253.9" fill="white" fill-rule="evenodd" stroke="black" stroke-width="9" stroke-miterlimit="10"></circle>
                    <path class="hour-marks" fill="none" stroke="#000" stroke-width="9" stroke-miterlimit="10"
                        d="M300.5 94V61M506 300.5h32M300.5 506v33M94 300.5H60M411.3 107.8l7.9-13.8M493 190.2l13-7.4M492.1 411.4l16.5 9.5M411 492.3l8.9 15.3M189 492.3l-9.2 15.9M107.7 411L93 419.5M107.5 189.3l-17.1-9.9M188.1 108.2l-9-15.6" >
                    </path>
                    <circle class="mid-circle" cx="300" cy="300" r="16.2" fill="black"></circle>
                </g>
                <g id="hour" style="transform-origin: 300px 300px; transition: transform 0.5s ease-in-out; transform: rotate(${hrRotation});">
                    <path class="hour-arm" d="M300.5 298V142" fill="none" fill-rule="evenodd" stroke="black" stroke-width="17" stroke-miterlimit="10"></path>
                    <circle class="sizing-box" cx="300" cy="300" r="253.9" fill="none"></circle>
                </g>
                <g id="minute" style="transform-origin: 300px 300px; transition: transform 0.5s ease-in-out; transform: rotate(${minRotation});">
                    <path class="minute-arm" d="M300.5 298V67" fill="none" fill-rule="evenodd" stroke="black" stroke-width="11" stroke-miterlimit="10"></path>
                    <circle class="sizing-box" cx="300" cy="300" r="253.9" fill="none"></circle>
                </g>`;
    }
    inject(container) {
        if (container) {
            this.svgToCanvas();
            container.appendChild(this._moduleBody);
        }
        else {
            this._status = 2;
            this._errors.push("No container given");
        }
    }
    isHuman() {
        return true;
    }
    moduleBuild() {
        let rightColumn = document.createElement("div");
        let inputContainer = document.createElement('div');
        stylist.containerDressing(this._moduleBody);
        stylist.canvasDressing(this._canvas);
        stylist.titleDressing(this._message);
        this._message.textContent = "Tell the time!";
        stylist.inputDressing(this._userInputElement);
        this._userInputElement.placeholder = "00:00";
        this._userInputElement.maxLength = 5;
        stylist.buttonDressing(this._checkButtonElement);
        this._checkButtonElement.type = "button";
        this._checkButtonElement.textContent = "CHECK";
        stylist.rightColumnDressing(rightColumn);
        stylist.inputContainerDressing(inputContainer);
        inputContainer.appendChild(this._userInputElement);
        inputContainer.appendChild(this._checkButtonElement);
        rightColumn.appendChild(this._message);
        rightColumn.appendChild(inputContainer);
        this._moduleBody.appendChild(this._canvas);
        this._moduleBody.appendChild(rightColumn);
        this.moduleInit();
    }
    moduleInit() {
        this._checkButtonElement.addEventListener('click', e => {
            if (this._userInputElement.value.length == 0) {
                this._message.textContent = "Use the input box above!";
                this._userInputElement.style.border = "1px solid red";
            }
            else if (this._userInputElement.value.length < 5) {
                this._message.textContent = "Double check your input!";
                this._userInputElement.style.border = "1px solid red";
            }
            else {
                let hours = +this._userInputElement.value.split(":")[0];
                let minutes = +this._userInputElement.value.split(":")[1];
                if (hours > 24 || minutes > 59) {
                    this._message.textContent = "Double check your inputt!";
                    this._userInputElement.style.border = "1px solid red";
                }
                else {
                    if (true) {
                        this._message.textContent = "You are a clever human!";
                        this._userInputElement.style.display = "none";
                        this._checkButtonElement.style.display = "none";
                        this._status = 1;
                    }
                }
            }
        });
    }
    svgToCanvas() {
        console.log("ClockCAPTCHA.svgToCavas()");
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute("id", "clock");
        svg.setAttribute("width", "100");
        svg.setAttribute("height", "100");
        svg.setAttribute("viewBox", "0 0 580 580");
        svg.appendChild(this._canvasContent);
        this._filters.forEach((filter) => {
            svg.appendChild(filter);
            if (filter.hasAttribute("id")) {
                if (this._canvasContent.hasAttribute("filter")) {
                    //TODO append di filtri
                }
                else {
                    this._canvasContent.setAttribute("filter", `url(#${filter.id})`);
                }
            }
            else {
                //crea ID
                //controlla sia univoco
                //lo applica al filtro e applica il filtro al canvas
            }
        });
        console.log(svg.outerHTML);
        const ctx = this._canvas ? this._canvas.getContext('2d') : null;
        let v = null;
        if (ctx)
            v = canvg_1.Canvg.fromString(ctx, svg.outerHTML);
        if (v) {
            v.start();
            this._canvas.click();
        }
        else {
            this._status = 3;
            this._errors.push("Errors on Canvg.fromStrings");
        }
    }
}
exports.ClockCAPTCHA = ClockCAPTCHA;
class Decorator {
    constructor(component) {
        this._component = component;
    }
    draw() {
        // this._component.draw(); Non ha più senso in quanto la catena di chiamate avviene nel costruttore, parliamo ancora di decorator?
    }
    isHuman() {
        return this._component.isHuman();
    }
    inject(container) {
        this._component.inject(container);
    }
}
class NoisyClockCAPTCHA extends Decorator {
    constructor(component, factor) {
        console.log("NoisyClockCAPTCHA()");
        super(component);
        this._Noisefactor = factor;
        this.draw();
    }
    draw() {
        // super.draw(); Possibile togliere in quanto la chiamata avviene alla costruzione dell'oggetto ClockCAPTCHA?
        let circle1 = document.createElement('circle');
        circle1.setAttribute("cx", "200");
        circle1.setAttribute("cy", "290");
        circle1.setAttribute("r", "150");
        circle1.setAttribute("stroke", "black");
        circle1.setAttribute("fill", "transparent");
        circle1.setAttribute("stroke-width", "5");
        let circle2 = document.createElement('circle');
        circle2.setAttribute("cx", "350");
        circle2.setAttribute("cy", "350");
        circle2.setAttribute("r", "150");
        circle2.setAttribute("stroke", "black");
        circle2.setAttribute("fill", "transparent");
        circle2.setAttribute("stroke-width", "5");
        let rect1 = document.createElement('rect');
        rect1.setAttribute("x", "400");
        rect1.setAttribute("y", "110");
        rect1.setAttribute("rx", "50");
        rect1.setAttribute("ry", "10");
        rect1.setAttribute("width", "100");
        rect1.setAttribute("height", "300");
        rect1.setAttribute("stroke", "black");
        rect1.setAttribute("fill", "transparent");
        rect1.setAttribute("stroke-width", "5");
        let rect2 = document.createElement('rect');
        rect2.setAttribute("x", "100");
        rect2.setAttribute("y", "260");
        rect2.setAttribute("rx", "50");
        rect2.setAttribute("ry", "10");
        rect2.setAttribute("width", "300");
        rect2.setAttribute("height", "120");
        rect2.setAttribute("stroke", "black");
        rect2.setAttribute("fill", "transparent");
        rect2.setAttribute("stroke-width", "5");
        this._component._canvasContent.appendChild(circle1);
        this._component._canvasContent.appendChild(circle2);
        this._component._canvasContent.appendChild(rect1);
        this._component._canvasContent.appendChild(rect2);
        console.log("NoisyClockCAPTCHA.draw()");
    }
}
exports.NoisyClockCAPTCHA = NoisyClockCAPTCHA;
class DistortionDecorator extends Decorator {
    constructor(component, distorctionFactor) {
        console.log("DistortionDecorator()");
        super(component);
        this._factor = distorctionFactor;
        this.draw();
    }
    draw() {
        console.log("DistortionDecorator.draw()");
        //FILTER CREATION
        let noise = Math.trunc(Math.random() * 9);
        let turbulance = Math.trunc(Math.random() * 50);
        let filter = document.createElement('filter');
        filter.id = "sjhband45asd4sac1";
        filter.innerHTML = `
            <feTurbulence type="turbulence" baseFrequency="0.00${noise} 0.00${noise}" numOctaves="9" result="NOISE"></feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="NOISE" scale="${20 + turbulance}"></feDisplacementMap>
        `;
        this._component._filters.push(filter);
        // //FILTER APPLICATION
        // this._component._canvasContent.setAttribute("filter", `url(#${filter.id})`);
        // //WRAPPER CREATION
        // let wrapper = document.createElement('g');
        // wrapper.appendChild(this._component._canvasContent);
        // wrapper.appendChild(filter);
        // this._component._canvasContent = wrapper;
    }
}
exports.DistortionDecorator = DistortionDecorator;
