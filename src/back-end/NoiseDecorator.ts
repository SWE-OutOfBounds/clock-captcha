import { ClockCAPTCHAGeneratorInterface } from "./ClockCAPTCHAGeneratorInterface";
import { Decorator } from "./Decorator";
import * as Canvas from 'canvas';

export class NoiseDecorator extends Decorator {
    constructor(component: ClockCAPTCHAGeneratorInterface, distortionFactor: number) {
        super(component);
        //component() => component.draw()
        this._distortionFactor = distortionFactor%100;
        this.draw();
    }

    public draw(): void {
        const canvas = this._component.getCanvas();
        const ctx = canvas.getContext('2d');

        // Loop through each row of the canvas and translate the points as necessary
        for (let y = 0; y < canvas.height; y++) {
            if(Math.random()>= (100-this._distortionFactor)/100) ctx.clearRect(0,y,canvas.width, 1);
        }

    }

    private _distortionFactor: number;
}