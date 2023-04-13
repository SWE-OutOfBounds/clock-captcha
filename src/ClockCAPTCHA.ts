import { ClockCAPTCHAInterface } from './ClockCAPTCHAInterface';
import * as stylist from './stylist';

export class ClockCAPTCHA implements ClockCAPTCHAInterface {

    constructor() {
        this._canvas.id = "mainContainer";
        this.moduleBuild();
        this.draw();
    }

    /**
     * Disegna un orologio analogico all'interno del canvas nell'orario rappresentato dal seed generato casualmente
     * Inizializza il campo dati _seed
     */
    public draw(): void {
        let hours = Math.floor(Math.random() * 13), minutes = Math.floor(Math.random() * 60);
        this._seed = this.getSHA256Hash(hours.toString() + minutes.toString()).toString();
        // console.log(this._seed);
        // console.log(hours.toString() + minutes.toString())
        // console.log(this.cyrb53("556").toString());
        // Otteniamo il contesto del canvas
        const ctx = this._canvas.getContext('2d');
        const width = this._canvas.width;
        const height = this._canvas.height;

        // Calcoliamo le posizioni delle lancette
        const hourAngle = (hours % 12) * Math.PI / 6;
        const minuteAngle = minutes * Math.PI / 30;

        // Disegna il quadrante dell'orologio
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, width / 2 - 10, 0, 2 * Math.PI);
        ctx.stroke();

        //Disegna i tick delle ore
        ctx.save();
        ctx.translate(width / 2, height / 2);
        for (let i = 0; i < 12; i++) {
            ctx.rotate(Math.PI / 6);
            ctx.beginPath();
            ctx.moveTo(0, -width / 2 + 10);
            ctx.lineTo(0, -width / 2 + 15);
            ctx.lineWidth = 2;
            ctx.stroke();
        }
        ctx.restore();

        //Disegna i tick dei minuti
        ctx.save();
        ctx.translate(width / 2, height / 2);
        for (let i = 0; i < 60; i++) {
            ctx.rotate(Math.PI / 30);
            ctx.beginPath();
            ctx.moveTo(0, -width / 2 + 10);
            ctx.lineTo(0, -width / 2 + 13);
            ctx.stroke();
        }
        ctx.restore();

        // Disegna la lancetta delle ore
        ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.rotate(hourAngle);
        ctx.beginPath();
        ctx.moveTo(0, -5);
        ctx.lineTo(0, -width / 4);
        ctx.stroke();
        ctx.restore();

        // Disegna la lancetta dei minuti
        ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.rotate(minuteAngle);
        ctx.beginPath();
        ctx.moveTo(0, -5);
        ctx.lineTo(0, -width / 3);
        ctx.stroke();
        ctx.restore();
    }

    /**
    * Aggiunge un ascoltatore per il click del pulsante.
    *
    * @param {EventListener} fun - La funzione da eseguire quando il pulsante viene cliccato.
    * @returns {boolean} true se il sistema non si trova in uno stato di errore, false altrimenti.
    */
    public addButtonListener(fun: EventListener): boolean {
        this._button.addEventListener('click', fun);
        return !this._errorFlag;
    }

    /**
    * Aggiunge il corpo del modulo al contenitore specificato.
    * 
    * @param {HTMLElement | null} container - Il contenitore a cui aggiungere il corpo del modulo.
    * @returns {boolean} true se l'iniezione è avvenuta con successo, false altrimenti.
    */
    public inject(container: HTMLElement | null): boolean {
        if (container) {
            container.appendChild(this._moduleBody);
        } else {
            this._errorFlag = true;
            this._errorLog.push("No container given");
        }
        return !this._errorFlag;
    }

    /**
     * Resetta il contenuto dell'orologio e aggiorna la parte visiva
     */
    public reset(): void {

    }

    /**
     * Gettter del seed generato in fase di costruzione dal modulo da usare nel validator
     * 
     * @returns {String} seed generato dal modulo
     */
    public getSeed(): String {
        return this._seed;
    }

    /**
     * Gettter dell'input inserito nel modulo
     * 
     * @returns {String} Valore presente all'interno del campo d'inserimento del modulo
     */
    public getInput(): String {
        return this._input.value;
    }

    public getCanvas(): HTMLCanvasElement {
        return this._canvas;
    }

    /**
     * Setter per il titolo del modulo
     * 
     * @param {string} title nuovo titolo per il modulo di test 
     */
    public setTitle(title: string): void {
        this._title.innerHTML = title;
    }

    /**
     * Costruzione della parte visiva del modulo e inizializzazione del suo comportamento di base
     */
    private moduleBuild(): void {
        let rightColumn: HTMLElement = document.createElement("div");
        let inputContainer: HTMLElement = document.createElement('div');

        stylist.containerDressing(this._moduleBody);
        stylist.canvasDressing(this._canvas);
        stylist.titleDressing(this._title);
        this._title.textContent = "Tell the time!";
        stylist.inputDressing(this._input);
        this._input.placeholder = "00:00";
        this._input.maxLength = 5;
        stylist.buttonDressing(this._button);
        this._button.type = "button";
        this._button.textContent = "CHECK";
        stylist.rightColumnDressing(rightColumn);
        stylist.inputContainerDressing(inputContainer);

        inputContainer.appendChild(this._input);
        inputContainer.appendChild(this._button);

        rightColumn.appendChild(this._title);
        rightColumn.appendChild(inputContainer);

        this._moduleBody.appendChild(this._canvas);
        this._moduleBody.appendChild(rightColumn);

        this.moduleInit();
    }

    /**
     * Inizializzazione del comportamento di base del modulo
     */
    private moduleInit(): void {
        this._button.addEventListener('click', e => {
            if (this._input.value.length == 0) {
                this._title.textContent = "Use the input box above!"
                this._input.style.border = "1px solid red";
            } else if (this._input.value.length < 5) {
                this._title.textContent = "Double check your input!";
                this._input.style.border = "1px solid red";
            } else {
                let hours: number = +this._input.value.split(":")[0];
                let minutes: number = +this._input.value.split(":")[1];
                if (hours > 24 || minutes > 59) {
                    this._title.textContent = "Double check your inputt!";
                    this._input.style.border = "1px solid red";
                } else {
                    if (true) {
                        this._title.textContent = "You are a clever human!";
                        this._input.style.display = "none";
                        this._button.style.display = "none";
                        this._errorFlag = true;
                    }
                }
            }
        })
    }

    private async getSHA256Hash(input: string): Promise<string> {
        const textAsBuffer = new TextEncoder().encode(input);
        const hashBuffer = await window.crypto.subtle.digest("SHA-256", textAsBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hash = hashArray
            .map((item) => item.toString(16).padStart(2, "0"))
            .join("");
        return hash;
    };


    private _seed: String;

    private _errorLog: Array<string>;
    private _errorFlag: boolean = false;

    public _canvas: HTMLCanvasElement = document.createElement('canvas');
    private _moduleBody: HTMLElement = document.createElement('div');
    private _button: HTMLButtonElement = document.createElement('button');
    private _input: HTMLInputElement = document.createElement('input');
    private _title: HTMLElement = document.createElement('p');
}