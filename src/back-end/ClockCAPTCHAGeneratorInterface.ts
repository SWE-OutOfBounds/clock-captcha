import * as Canvas from "canvas";

export interface ClockCAPTCHAGeneratorInterface {
    draw(): void;
   
    getCanvas(): Canvas.Canvas;
    getToken(): string;
    getImage(): string;
}