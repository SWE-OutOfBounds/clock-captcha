import { HTMLCanvasStrategy } from "./HTMLCanvasStrategy";

export abstract class HTMLCanvasDecorator implements HTMLCanvasStrategy{
    generate(hours: number, minutes: number): string {
        return this._component.generate(hours, minutes);
    }

    private _component: HTMLCanvasStrategy;
}