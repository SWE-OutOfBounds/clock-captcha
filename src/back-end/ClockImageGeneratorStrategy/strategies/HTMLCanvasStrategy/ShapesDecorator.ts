import { HTMLCanvasDecorator } from "./HTMLCanvasDecorator";
import { HTMLCanvasStrategy } from "./HTMLCanvasStrategy";
import * as Canvas from "canvas";

export class ShapesDecorator extends HTMLCanvasDecorator{
    /**
     * Costruttore
     * @param component Componente primario al quale applicare il disturbo
     * @param shapePresence Numero di forme da applicare all'immagine principale
     */
    constructor(component: HTMLCanvasStrategy, shapePresence: number) {
        super(component);
        this._shapePresence = shapePresence;
    }
    /**
     * Data un immagine in formato stringa ci applica sopra del disturbo sottoforma di forme geometrice di ranodmica forma e misura
     * @param hours : Ore
     * @param minutes : Minuti
     * @returns Immgine in formato stringa
     */
    public generate(hours: number, minutes: number): string {
        const aux = Canvas.createCanvas(100, 100);
        const width = aux.width;
        const height = aux.height;
        let ctx = aux.getContext('2d');

        var destinationImage = new Canvas.Image();
        destinationImage.src = super.generate(hours, minutes);
        ctx.drawImage(destinationImage, 0, 0, 100, 100);
        
        const shapes = ['square', 'circle', 'triangle', 'tringle'];

        // Disegna il numero specificato di forme casuali
        for (let i = 0; i < this._shapePresence; i++) {
            // Scegli una forma casuale dall'array
            const shape = shapes[Math.floor(Math.random() * shapes.length)];

            // Genera una posizione e una rotazione casuali
            const x = (0.2 * width) + (Math.random() * (0.6 * width));
            const y = (0.2 * height) + (Math.random() * (0.6 * height));
            const angle = Math.random() * Math.PI * 2;
            const size = Math.random() * 20 + 10;// dimensione tra 10 e 40 pixel

            // Disegna la forma nella posizione e rotazione specificate
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            // ctx.strokeStyle = '#'+(Math.trunc(Math.random() * 16777215)).toString(16);
            switch (shape) {
                case 'square':
                    ctx.strokeRect(-size / 2, -size / 2, size, size);
                    break;
                case 'circle':
                    ctx.beginPath();
                    ctx.arc(0, 0, size / 2, 0, 2 * Math.PI);
                    ctx.stroke();
                    break;
                case 'triangle':
                    ctx.beginPath();
                    ctx.moveTo(-size / 2, size / 2);
                    ctx.lineTo(size / 2, size / 2);
                    ctx.lineTo(0, -size / 2);
                    ctx.stroke();
                    break;
            }
            ctx.restore();
        }

        return aux.toDataURL();
    }

    private _shapePresence: number;
}