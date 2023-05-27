import { HTMLCanvasDecorator } from "./HTMLCanvasDecorator";
import { HTMLCanvasStrategy } from "./HTMLCanvasStrategy";

import * as Canvas from "canvas";

export class NoiseDecorator extends HTMLCanvasDecorator {
    constructor(component: HTMLCanvasStrategy, distortionFactor: number) {
        super(component);
        this._distortionFactor = distortionFactor;
    }

    public generate(hours: number, minutes: number): string {
        const aux = Canvas.createCanvas(100, 100);
        const width = aux.width;
        const height = aux.height;
        let ctx = aux.getContext('2d');

        var destinationImage = new Canvas.Image();
        destinationImage.src = super.generate(hours, minutes);
        ctx.drawImage(destinationImage, 0, 0, 100, 100);

        for (let y = 0; y < aux.height; y++) {
            if(Math.random()>= (100-this._distortionFactor)/100) ctx.clearRect(0,y,aux.width, 1);
        }

        return aux.toDataURL();
    }

    private _distortionFactor: number;
}