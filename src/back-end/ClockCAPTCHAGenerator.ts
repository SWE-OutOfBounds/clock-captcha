import { ClockCAPTCHAGeneratorInterface } from './ClockCAPTCHAGeneratorInterface';

import * as CryptoJS from 'crypto-js';
import * as Canvas from 'canvas';

export interface ImageGeneratorStrategy {
    generate(hours: number, minutes: number): string;
}

export interface HTMLCanvasStrategy extends ImageGeneratorStrategy {
    generate(hours: number, minutes: number): string;
}

export class HTMLCanvasGenerator implements HTMLCanvasStrategy {
    generate(hours: number, minutes: number): string {
        const aux = Canvas.createCanvas(100, 100);
        let ctx = aux.getContext('2d');

        const width = aux.width;
        const height = aux.height;

        // Calcoliamo le posizioni delle lancette
        const minuteAngle = minutes * Math.PI / 30;
        const hourAngle = (hours % 12) * Math.PI / 6 + ((minuteAngle * 30) / 360);

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

        return aux.toDataURL();
    }
}

export abstract class HTMLCanvasDecorator implements HTMLCanvasStrategy {

    constructor(component: HTMLCanvasStrategy) {
        this.component = component;
    }

    generate(hours: number, minutes: number): string {
        return this.component.generate(hours, minutes);
    }

    protected component: HTMLCanvasStrategy;
}

export class ShapeDecorator extends HTMLCanvasDecorator {

    constructor(component: HTMLCanvasStrategy, shapePresence: number) {
        super(component);
        this._shapePresence = shapePresence;
    }

    generate(hours: number, minutes: number): string {
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

export class ImageGenerator {
    constructor(strategy: ImageGeneratorStrategy) {
        this.strategy = strategy;
    }
    public generateImage(hours: number, minutes: number): string {
        return this.strategy.generate(hours, minutes);
    }

    private strategy: ImageGeneratorStrategy;
}

export class ClockCAPTCHA {

    constructor(imageGenerator: ImageGenerator) {
        this._imageGenerator = imageGenerator;
    }

    public generateData(password: string): Object {
        let hours: number = Math.floor(Math.random() * 11), minutes: number = Math.floor(Math.random() * 59);
        let timestamp: string = (hours < 10 ? "0" + hours.toString() : hours.toString()) + ':' + (minutes < 10 ? "0" + minutes.toString() : minutes.toString())
        return {
            image: this._imageGenerator.generateImage(hours, minutes),
            token: this.encrypt(timestamp, password)
        }
    }

    public validateData(data: Object, psw: string): boolean {
        if (data.hasOwnProperty('token') && data.hasOwnProperty('input') && Object.keys(data).length == 2) {
            return this.decrypt(data['token'], psw) == data['input'];
        } else {
            if (!data.hasOwnProperty('token')) throw Error('token missing.');
            if (!data.hasOwnProperty('input')) throw Error('input missing.');
            if (Object.keys(data).length > 2) throw Error('Too many data arguments.')
        }
    }

    private encrypt(data: string, psw: string): string {
        return CryptoJS.AES.encrypt(data, psw).toString();
    }

    private decrypt(token: string, psw: string): boolean {
        return CryptoJS.AES.decrypt(token, psw).toString(CryptoJS.enc.Utf8);
    }

    private _imageGenerator: ImageGenerator;
}

// export class ClockCAPTCHAGenerator implements ClockCAPTCHAGeneratorInterface {

//     constructor(psw: string) {
//         this._psw = psw;
//         this.draw();
//     }

//     /**
//      * Disegna un orologio analogico all'interno del canvas nell'orario rappresentato dal seed generato casualmente
//      * Inizializza il campo dati _seed
//      */
//     public draw(): void {
//         let hours = Math.floor(Math.random() * 11), minutes = Math.floor(Math.random() * 59);
//         this._token = this.generateToken((hours < 10 ? "0" + hours.toString() : hours.toString()) + ':' + (minutes < 10 ? "0" + minutes.toString() : minutes.toString()));

//         // Otteniamo il contesto del canvas
//         const ctx = this._canvas.getContext('2d');
//         const width = this._canvas.width;
//         const height = this._canvas.height;

//         // Calcoliamo le posizioni delle lancette
//         const minuteAngle = minutes * Math.PI / 30;
//         const hourAngle = (hours % 12) * Math.PI / 6 + ((minuteAngle * 30) / 360);

//         // Disegna il quadrante dell'orologio
//         ctx.clearRect(0, 0, width, height);
//         ctx.beginPath();
//         ctx.arc(width / 2, height / 2, width / 2 - 10, 0, 2 * Math.PI);
//         ctx.stroke();

//         //Disegna i tick delle ore
//         ctx.save();
//         ctx.translate(width / 2, height / 2);
//         for (let i = 0; i < 12; i++) {
//             ctx.rotate(Math.PI / 6);
//             ctx.beginPath();
//             ctx.moveTo(0, -width / 2 + 10);
//             ctx.lineTo(0, -width / 2 + 15);
//             ctx.lineWidth = 2;
//             ctx.stroke();
//         }
//         ctx.restore();

//         //Disegna i tick dei minuti
//         ctx.save();
//         ctx.translate(width / 2, height / 2);
//         for (let i = 0; i < 60; i++) {
//             ctx.rotate(Math.PI / 30);
//             ctx.beginPath();
//             ctx.moveTo(0, -width / 2 + 10);
//             ctx.lineTo(0, -width / 2 + 13);
//             ctx.stroke();
//         }
//         ctx.restore();

//         // Disegna la lancetta delle ore
//         ctx.save();
//         ctx.translate(width / 2, height / 2);
//         ctx.rotate(hourAngle);
//         ctx.beginPath();
//         ctx.moveTo(0, -5);
//         ctx.lineTo(0, -width / 4);
//         ctx.stroke();
//         ctx.restore();

//         // Disegna la lancetta dei minuti
//         ctx.save();
//         ctx.translate(width / 2, height / 2);
//         ctx.rotate(minuteAngle);
//         ctx.beginPath();
//         ctx.moveTo(0, -5);
//         ctx.lineTo(0, -width / 3);
//         ctx.stroke();
//         ctx.restore();


//     }

//     private generateToken(message: string): string {
//         return CryptoJS.AES.encrypt(message, this._psw).toString();
//     }

//     // public verifyUserInput(token: string, psw: string, input: string) : boolean{
//     //     return CryptoJS.AES.decrypt(token, psw)
//     // }

//     public static verifyUserInput(token: string, psw: string, input: string): boolean {
//         return CryptoJS.AES.decrypt(token, psw).toString(CryptoJS.enc.Utf8) == input;
//     }

//     public getImage(): string {
//         return this._canvas.toDataURL();
//     }

//     public getToken(): string {
//         return this._token;
//     }

//     public getCanvas(): Canvas.Canvas {
//         return this._canvas;
//     }


//     private _token: string;
//     private _canvas: Canvas.Canvas = Canvas.createCanvas(100, 100);
//     private _psw: string = "";
// }
