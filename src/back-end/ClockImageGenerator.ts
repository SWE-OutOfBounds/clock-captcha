import { ClockImageGenerationStrategy } from "./ClockImageGeneratorStrategy/ClockImageGeneratorStrategy";
export class ClockImageGenerator{

    /**
     * Assegna al campo dati privato l'oggetto fornito  
     * @param strategy : Strategia di generazione dell'immagine
     */
    constructor(strategy: ClockImageGenerationStrategy) {
        this.strategy = strategy;
    }

    /**
     * Genera un immagine a partire da un orario rappresentato dai parametri d'ingresso
     * @param hours : Ora dell'orario
     * @param minutes : Minuti dell'orario
     * @returns Immagine in formato stringa
     * @throws Error:
     *              -Invalid hours format. : hours non compreso tra 0 e 11
     *              -Invalid minutes format. : minutes non compreso tra 0 e 59
     */
    public generateImage(hours: number, minutes: number): string {
        if(hours < 0 || hours > 11) throw Error("Invalid hours format.");
        if(minutes < 0 || minutes > 59) throw Error("Invalid minutes format.");
        return this.strategy.generate(hours, minutes);
    }

    private strategy: ClockImageGenerationStrategy;
}