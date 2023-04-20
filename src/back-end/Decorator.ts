import { ClockCAPTCHAGeneratorInterface } from "./ClockCAPTCHAGeneratorInterface";
import * as Canvas from 'canvas';

export class Decorator implements ClockCAPTCHAGeneratorInterface {
    constructor(component: ClockCAPTCHAGeneratorInterface) {
        this._component = component;
        this.draw();
    }

    public draw(): void {
        this._component.draw();
    }
    public getToken(): String {
        return this._component.getToken();
    }
    public getCanvas(): Canvas.Canvas {
        return this._component.getCanvas();
    }
    public getCanvasContent(): string {
        return this._component.getCanvasContent();
    }

    protected _component: ClockCAPTCHAGeneratorInterface;
}