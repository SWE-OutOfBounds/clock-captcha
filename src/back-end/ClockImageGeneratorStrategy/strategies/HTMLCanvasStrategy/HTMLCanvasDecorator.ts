import { HTMLCanvasStrategy } from "./HTMLCanvasStrategy";

export abstract class HTMLCanvasDecorator implements HTMLCanvasStrategy{
    constructor(component: HTMLCanvasStrategy) {
        this.component = component;
    }

    generate(hours: number, minutes: number): string {
        return this.component.generate(hours, minutes);
    }

    protected component: HTMLCanvasStrategy;
}