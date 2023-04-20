import { ClockCAPTCHAGeneratorInterface } from './ClockCAPTCHAGeneratorInterface';

import * as CryptoJS from 'crypto-js';
import * as Canvas from 'canvas';


export class ClockCAPTCHAGenerator implements ClockCAPTCHAGeneratorInterface {

    constructor(psw: string) {
        this.draw();
        this._psw = psw;
    }

    /**
     * Disegna un orologio analogico all'interno del canvas nell'orario rappresentato dal seed generato casualmente
     * Inizializza il campo dati _seed
     */
    public draw(): void {
        let hours = Math.floor(Math.random() * 13), minutes = Math.floor(Math.random() * 60);
        this._token = this.makeToken(hours.toString() + minutes.toString());

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

    public getCanvas(): Canvas.Canvas {
        return this._canvas;
    }

    public getToken(): String {
        return this._token;
    }

    public getCanvasContent(): string {
        return this._canvas.toDataURL();
    }

    private makeToken(message: string): string {
        return CryptoJS.AES.encrypt(message, this._psw).toString();
    }


    private _token: string;
    private _canvas: Canvas.Canvas = Canvas.createCanvas(100, 100);
    private _psw: string = "";
}