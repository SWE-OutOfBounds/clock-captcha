import { Canvg } from "canvg";

import * as stylist from "./stylist"

export class captchaModule {
    private _moduleBody = document.createElement('div');
    private _userInputElement = document.createElement('input');
    private _checkButtonElement = document.createElement('button');
    private _canvas = document.createElement('canvas');
    private _title = document.createElement('p');

    private _timeInSec: number = Math.trunc(Math.random() * (12 * 60 * 60));
    private _status: number = 0;
    private _errors: Array<string> = [];

    private canvasInit() {
        let minRotation: number = (360 / 60) * (Math.trunc(this._timeInSec / 60) % 60); 
        let hrRotation: number = (360 / 12) * (Math.trunc(this._timeInSec / 3600) % 12) + (360/12/60 * (Math.trunc(this._timeInSec / 60) % 60)) ;

        const ctx = this._canvas ? this._canvas.getContext('2d') : null;

        let v = null;
        if (ctx) v = Canvg.fromString(ctx, 
            `<svg id="clock" xmlns="http://www.w3.org/2000/svg" width="100" height = "100" viewBox="0 0 580 580">
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
                <line id="line" x1="50" y1="150" x2="1000" y2="600" stroke="black" stroke-width="7" />
                <line id="line" x1="200" y1="100" x2="300" y2="500" stroke="black" stroke-width="7"/>
                <line id="line" x1="1000" y1="50" x2="50" y2="500" stroke="black" stroke-width="7"/>
                <line id="line" x1="100" y1="250" x2="500" y2="450" stroke="black" stroke-width="7"/>
                <line id="line" x1="60" y1="300" x2="900" y2="50" stroke="black" stroke-width="7"/>
            </svg>`); 
        if (v) {
            v.start();
            this._canvas.click();
        }else {
            this._status = 3;
            this._errors.push("Errors on Canvg.fromStrings");
        }
    }

    private moduleBuild() {
        let rightColumn: HTMLElement = document.createElement("div");
        let inputContainer: HTMLElement = document.createElement('div');

        stylist.containerDressing(this._moduleBody);
        stylist.canvasDressing(this._canvas);
        stylist.titleDressing(this._title);
        this._title.textContent = "Tell the time!";
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

        rightColumn.appendChild(this._title);
        rightColumn.appendChild(inputContainer);

        this._moduleBody.appendChild(this._canvas);
        this._moduleBody.appendChild(rightColumn);
    }

    private addEventListeners() : void{
        this._checkButtonElement.addEventListener('click', e => {
            if(this._userInputElement.value.length == 0){
                this._title.textContent = "Use the input box above!"
                this._userInputElement.style.border = "1px solid red";
            }else if(this._userInputElement.value.length<5){
                this._title.textContent = "Double check your input!";
                this._userInputElement.style.border = "1px solid red";               
            }else{
                let hours : number = +this._userInputElement.value.split(":")[0];
                let minutes : number = +this._userInputElement.value.split(":")[1];
                if(hours>24 || minutes>59){
                    this._title.textContent = "Double check your input!";
                    this._userInputElement.style.border = "1px solid red"; 
                }else{
                    if(hours==(Math.trunc(this._timeInSec / 3600) % 12) && minutes==(Math.trunc(this._timeInSec / 60) % 60)){
                        this._title.textContent = "You are a clever human!";
                        this._userInputElement.style.display = "none";
                        this._checkButtonElement.style.display = "none";
                        this._status=1;
                    }
                }
            }
        })
    }

    constructor() {
        this.canvasInit();
        this.moduleBuild();
        this.addEventListeners();
    }

    public show(container: HTMLElement | null): void {
        if (container)
            container.appendChild(this._moduleBody);
        else {
            this._status = 2;
            this._errors.push("No container given");
        }
    }

    public isHuman() : boolean{
        return this._status==1;
    }
}