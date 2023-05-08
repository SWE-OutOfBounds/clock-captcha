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
     */
    public generateImage(hours: number, minutes: number): string {
        return this.strategy.generate(hours, minutes);
    }

    private strategy: ClockImageGenerationStrategy;
}