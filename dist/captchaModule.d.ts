interface CAPTCHA {
    _canvasContent: HTMLElement;
    _seed: string;
    _filters: Array<HTMLElement>;
    draw(): void;
    inject(container: HTMLElement | null): void;
    isHuman(): boolean;
}
export declare class ClockCAPTCHA implements CAPTCHA {
    private _status;
    private _errors;
    private _moduleBody;
    private _checkButtonElement;
    private _userInputElement;
    private _canvas;
    private _message;
    _seed: string;
    _canvasContent: HTMLElement;
    _filters: Array<HTMLElement>;
    constructor();
    draw(): void;
    inject(container: HTMLElement | null): void;
    isHuman(): boolean;
    protected moduleBuild(): void;
    protected moduleInit(): void;
    private svgToCanvas;
}
declare class Decorator implements CAPTCHA {
    protected _component: CAPTCHA;
    _seed: string;
    _canvasContent: HTMLElement;
    _filters: HTMLElement[];
    constructor(component: CAPTCHA);
    draw(): void;
    isHuman(): boolean;
    inject(container: HTMLElement | null): void;
}
export declare class NoisyClockCAPTCHA extends Decorator {
    private _Noisefactor;
    constructor(component: CAPTCHA, factor: number);
    draw(): void;
}
export declare class DistortionDecorator extends Decorator {
    private _factor;
    constructor(component: CAPTCHA, distorctionFactor: number);
    draw(): void;
}
export {};
