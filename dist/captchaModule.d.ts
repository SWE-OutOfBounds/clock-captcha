export declare class captchaModule {
    private _moduleBody;
    private _userInputElement;
    private _checkButtonElement;
    private _canvas;
    private _title;
    private _timeInSec;
    private _status;
    private _errors;
    private canvasInit;
    private moduleBuild;
    private addEventListeners;
    constructor();
    show(container: HTMLElement | null): void;
    isHuman(): boolean;
}
