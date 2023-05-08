import { HTMLCanvasStrategy } from "./HTMLCanvasStrategy";

export abstract class HTMLCanvasDecorator implements HTMLCanvasStrategy{
    /**
     * Assegna all'attributo privato l'oggetto passato
     * @param component HTMLCanvasStrategy
     */
    constructor(component: HTMLCanvasStrategy) {
        this.component = component;
    }

    /**
     * Genera l'immagine che rappresenta un orario utilizzando i parametri d'ingresso
     * @param hours : Ore
     * @param minutes : Minuti
     * @returns Immgine in formato stringa
     */
    generate(hours: number, minutes: number): string {
        return this.component.generate(hours, minutes);
    }

    protected component: HTMLCanvasStrategy;
}