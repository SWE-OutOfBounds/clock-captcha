import * as stylist from './stylist';
export class ClockCAPTCHAView {

    constructor() {
        this._canvas.id = "mainContainer";
        this.moduleBuild();
        this.waiting();
    }

    /**
    * Aggiunge il corpo del modulo al contenitore specificato.
    * 
    * @param {HTMLElement | null} container - Il contenitore a cui aggiungere il corpo del modulo.
    * @returns {boolean} true se l'iniezione è avvenuta con successo, false altrimenti.
    */
    public inject(container: HTMLElement | null): boolean {
        if (container)
            container.appendChild(this._moduleBody);
        else return false;
        return true;
    }

    /**
    * Aggiunge un ascoltatore per il click del pulsante.
    *
    * @param {EventListener} fun - La funzione da eseguire quando il pulsante viene cliccato.
    * @returns {boolean} true se il sistema non si trova in uno stato di errore, false altrimenti.
    */
    public addButtonListener(fun: EventListener): void {
        this._checkButton.addEventListener('click', fun);
    }

    /**
     * Gettter del seed generato in fase di costruzione dal modulo da usare nel validator
     * 
     * @returns {String} seed generato dal modulo
     */
    public getToken(): string {
        return this._token;
    }

    /**
     * Getter dell'input inserito nel modulo
     * 
     * @returns {String} Valore presente all'interno del campo d'inserimento del modulo
     */
    public getInput(): string {
        return this._input.value;
    }

    /**
     * Setter per il titolo del modulo
     * 
     * @param {string} title nuovo titolo per il modulo di test 
     */
    public error(err: string): void {
        this._title.style.color = "red";
        this._title.innerHTML = err;
    }

    public clear(): void {
        this.waiting();
        this._input.value = '';
        this._title.style.color = "white";
        this._title.textContent = 'Tell the time!';
    }

    public message(msg: string): void {
        this._title.innerHTML = msg;
    }

    public fill(image_src: string, token: string): void {
        //TODO : check if image_src is consistent
        this.done();
        this._token = token;
        
        const aux = this._canvas.getContext('2d');
        aux.clearRect(0, 0, this._canvas.width, this._canvas.height);
        var destinationImage = new Image;
        
        destinationImage.onload = function () {
            aux?.drawImage(destinationImage, 0, 0, 100, 100);
        };

        destinationImage.src = image_src;
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
        stylist.buttonDressing(this._checkButton);
        this._checkButton.type = "button";
        this._checkButton.textContent = "CHECK";
        stylist.rightColumnDressing(rightColumn);
        stylist.inputContainerDressing(inputContainer);

        inputContainer.appendChild(this._input);
        inputContainer.appendChild(this._checkButton);

        rightColumn.appendChild(this._title);
        rightColumn.appendChild(inputContainer);

        this._moduleBody.appendChild(this._canvas);
        this._moduleBody.appendChild(rightColumn);

        this._checkButton.style.display = "none";

        this._checkButton.addEventListener('click', e => {
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
                        this._checkButton.style.display = "none";
                    }
                }
            }
        })
    }

    private waiting() : void{
        var ctx = this._canvas.getContext('2d'), spinnerVal = 0;
        this._spinner = setInterval(()=>{
            ctx.clearRect(0,0,this._canvas.width, this._canvas.height);
            ctx.textAlign = "center";
            spinnerVal%3 == 0 ? ctx.font = "40px Verdana" : ctx.font = "30px Verdana";
            ctx.fillText('.', 40, 50);
            spinnerVal%3 == 1 ? ctx.font = "40px Verdana" : ctx.font = "30px Verdana";
            ctx.fillText('.', 50, 50);
            spinnerVal%3 == 2 ? ctx.font = "40px Verdana" : ctx.font = "30px Verdana";
            ctx.fillText('.', 60, 50);
            spinnerVal++;
        }, 114);
    }
    private done() : void{
        clearTimeout(this._spinner);
    }

    private _token: string;

    private _spinner : NodeJS.Timer;
    public _canvas: HTMLCanvasElement = document.createElement('canvas');
    private _moduleBody: HTMLElement = document.createElement('div');
    private _checkButton: HTMLButtonElement = document.createElement('button');
    private _input: HTMLInputElement = document.createElement('input');
    private _title: HTMLElement = document.createElement('p');
}