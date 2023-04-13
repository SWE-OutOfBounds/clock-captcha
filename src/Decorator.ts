import { ClockCAPTCHAInterface } from "./ClockCAPTCHAInterface";

export class Decorator implements ClockCAPTCHAInterface {
    constructor(component: ClockCAPTCHAInterface) {
        this._component = component;
    }

    public draw(): void {
        this._component.draw();
    }
    public addButtonListener(fun: EventListener) {
        this._component.addButtonListener(fun);
    }
    public inject(container: HTMLElement | null): void {
        this._component.inject(container);
    }
    public reset(): void {
        this._component.reset();
    }
    public getSeed(): String {
        return this._component.getSeed();
    }
    public getInput(): String {
        return this._component.getInput();
    }
    public getCanvas(): HTMLCanvasElement {
        return this._component.getCanvas();
    }
    public setTitle(title: string): void {
        this._component.setTitle(title);
    }

    protected _component: ClockCAPTCHAInterface;
}