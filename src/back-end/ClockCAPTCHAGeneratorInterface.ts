import * as Canvas from "canvas";

export interface ClockCAPTCHAGeneratorInterface {
    draw(): void;
   
    getToken(): String;
    getCanvas(): Canvas.Canvas;
    getCanvasContent(): string;
}