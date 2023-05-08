import { ClockImageGenerator } from './ClockImageGenerator';

import * as CryptoJS from 'crypto-js';

export class ClockCAPTCHA{

    public generateData(password: string, ImageGenerator: ClockImageGenerator): Object {
        let hours: number = Math.floor(Math.random() * 11), minutes: number = Math.floor(Math.random() * 59);
        let timestamp: string = (hours < 10 ? "0" + hours.toString() : hours.toString()) + ':' + (minutes < 10 ? "0" + minutes.toString() : minutes.toString())
        return {
            image: ImageGenerator.generateImage(hours, minutes),
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
}