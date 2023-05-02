import { ClockCAPTCHAGeneratorInterface } from "./ClockCAPTCHAGeneratorInterface";
import { Decorator } from "./Decorator";

export class DistortionDecorator extends Decorator {
    constructor(component: ClockCAPTCHAGeneratorInterface, distortionFactor: number) {
        super(component);
        //component() => component.draw()
        this._distortionFactor = distortionFactor;
        this.draw();
    }

    public draw(): void {
        const ctx = this._component.getCanvas().getContext('2d');
        const width = this._component.getCanvas().width;
        const height = this._component.getCanvas().height;

       
    }

    private distortionCurveGeneration(canvasWidth : number, canvasHeight : number) : Array<number>{
        var curve: Array<number> = [Math.trunc(Math.random()*canvasWidth)];

        //Scelgo randomicamente se salie o scendere
        let direction: boolean = Math.random() < 0.5;
        
        while (canvasHeight > 0) {
            //calcolo l'altezza della sezione della curva come massimo 60% e minimo 40% della larghezza disponibile
            let amplitude = Math.trunc(Math.random() * (canvasWidth * 0.2) + (canvasWidth * 0.4)), flexPoint = Math.trunc(amplitude / 2);
            if (amplitude % 2 == 0) amplitude++;
        
            while (amplitude > 0 && canvasHeight > 0) {
                if (amplitude == flexPoint) direction = !direction;
                else curve.push(direction == true ? curve[curve.length - 1] + 1 : curve[curve.length - 1] -1);
                canvasHeight--;
                amplitude--;
            }
        
        }

        return curve;
    }

    private _distortionFactor: number;
}