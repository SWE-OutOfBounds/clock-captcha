interface absClockCAPTCHA {
    draw(): void;
    addButtonListener(fun: Function): any;
    inject(container: HTMLElement | null): void;
    reset(): void;
    getSeed(): String;
    getInput(): String;
    setTitle(title: string): void;
}
export declare class ClockCAPTCHA implements absClockCAPTCHA {
    constructor();
    /**
     * Disegna un orologio analogico all'interno del canvas nell'orario rappresentato dal seed generato casualmente
     * Inizializza il campo dati _seed
     */
    draw(): void;
    /**
    * Aggiunge un ascoltatore per il click del pulsante.
    *
    * @param {EventListener} fun - La funzione da eseguire quando il pulsante viene cliccato.
    * @returns {boolean} true se il sistema non si trova in uno stato di errore, false altrimenti.
    */
    addButtonListener(fun: EventListener): boolean;
    /**
    * Aggiunge il corpo del modulo al contenitore specificato.
    *
    * @param {HTMLElement | null} container - Il contenitore a cui aggiungere il corpo del modulo.
    * @returns {boolean} true se l'iniezione è avvenuta con successo, false altrimenti.
    */
    inject(container: HTMLElement | null): boolean;
    reset(): void;
    /**
     * Gettter del seed generato in fase di costruzione dal modulo da usare nel validator
     *
     * @returns {String} seed generato dal modulo
     */
    getSeed(): String;
    /**
     * Gettter dell'input inserito nel modulo
     *
     * @returns {String} Valore presente all'interno del campo d'inserimento del modulo
     */
    getInput(): String;
    /**
     * Setter per il titolo del modulo
     *
     * @param {string} title nuovo titolo per il modulo di test
     */
    setTitle(title: string): void;
    /**
     * Costruzione della parte visiva del modulo e inizializzazione del suo comportamento di base
     */
    private moduleBuild;
    /**
     * Inizializzazione del comportamento di base del modulo
     */
    private moduleInit;
    private _seed;
    private _errorLog;
    private _errorFlag;
    private _canvas;
    private _moduleBody;
    private _button;
    private _input;
    private _title;
}
export {};
