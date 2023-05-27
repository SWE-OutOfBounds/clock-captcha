import { ClockImageGenerator } from './ClockImageGenerator';

import * as CryptoJS from 'crypto-js';

export class ClockCAPTCHA{

    /**
     * Genera un oggetto utilizzabile nel modulo di captcha ClockCaptchaView 
     *      
     * @param password : password usata per crittare l'orario nel token
     * @param ImageGenerator : generatore d'immagini che rappresentano un orario
     * @returns Object =    {
     *                          image: immagine rappresentante un orario
     *                          token: stringa contenente l'orario rappresentato da image
     *                      }
     * @throws Error:
     *              - "Invalid password format." : Ricevuta password vuota in ingresso.
     */
    static generateData(password: string, ImageGenerator: ClockImageGenerator): Object {
        if(password.length == 0 || password == "") throw Error("Invalid password format.");
        if(!ImageGenerator) throw Error('Image generator needed.');
        let hours: number = Math.floor(Math.random() * 11), minutes: number = Math.floor(Math.random() * 59);
        let timestamp: string = (hours < 10 ? "0" + hours.toString() : hours.toString()) + ':' + (minutes < 10 ? "0" + minutes.toString() : minutes.toString())
        return {
            image: ImageGenerator.generateImage(hours, minutes),
            token: CryptoJS.AES.encrypt(timestamp, password).toString()
        }
    }

    /**
     * Controlla se l'input di un utente corrisponde all'orario nascosto nel token crittato con la password inserita come secondo parametro
     * @param data : Oggetto contenente {
     *                                      token : token generato dalla funzione generateData
     *                                      input : stringa rappresentante un orario
     *                                  }
     * @param psw : password da usare per decrittare il token in ingresso
     * @returns risultato dell'operazione di verifica
     * @throws Error :
     *                  - Missing token: campo token non presente nell'oggetto data
     *                  - Missing input: campo input non presente nell'oggetto data
     *                  - Too many arguments in object: presenti più campi dati di quelli necessari(token, input)
     *                  - Invalid password format: ricevuta password vuota
     */
    static validateData(data: Object, psw: string): boolean {
        if(psw == "" || psw.length == 0) throw Error("Invalid password format.")
        if (data.hasOwnProperty('token') && data.hasOwnProperty('input') && Object.keys(data).length == 2) {
            if(data['token'] == '') throw Error('Invalid token format.');
            else if(data['input'] == '') throw Error('Invalid input format.');
            else return CryptoJS.AES.decrypt(data['token'], psw).toString(CryptoJS.enc.Utf8) == data['input'];
        } else {
            if (!data.hasOwnProperty('token')) throw Error('Missing token.');
            if (!data.hasOwnProperty('input')) throw Error('Missing input.');
            if (Object.keys(data).length > 2) throw Error('Too many arguments in object.')
        }
    }
}