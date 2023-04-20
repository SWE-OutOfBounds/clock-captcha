import { ClockCAPTCHAGeneratorInterface } from "./ClockCAPTCHAGeneratorInterface";
import { Decorator } from "./Decorator";

export class ShapesDecorator extends Decorator {
    constructor(component: ClockCAPTCHAGeneratorInterface, shapesPresence: number) {
        super(component);
        //component() => component.draw()
        this._shapePresence = shapesPresence;
        this.draw();
        //this.draw()
    }

    public draw(): void {
        const ctx = this._component.getCanvas().getContext('2d');
        const width = this._component.getCanvas().width;
        const height = this._component.getCanvas().height;

        // Crea un'array di forme geometriche possibili
        const shapes = ['square', 'circle', 'triangle'];

        // Disegna il numero specificato di forme casuali
        for (let i = 0; i < this._shapePresence; i++) {
            // Scegli una forma casuale dall'array
            const shape = shapes[Math.floor(Math.random() * shapes.length)];

            // Genera una posizione e una rotazione casuali
            const x = Math.random() * width;
            const y = Math.random() * height;
            const angle = Math.random() * Math.PI * 2;
            const size = Math.random() * 40 + 10;// dimensione tra 10 e 50 pixel

            // Disegna la forma nella posizione e rotazione specificate
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
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
    }

    private _shapePresence: number;
}