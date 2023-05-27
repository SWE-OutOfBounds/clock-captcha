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
    public generateData(password: string, ImageGenerator: ClockImageGenerator): Object {
        if(password.length == 0 || password == "") throw Error("Invalid password format.");
        let hours: number = Math.floor(Math.random() * 11), minutes: number = Math.floor(Math.random() * 59);
        let timestamp: string = (hours < 10 ? "0" + hours.toString() : hours.toString()) + ':' + (minutes < 10 ? "0" + minutes.toString() : minutes.toString())
        return {
            image: ImageGenerator.generateImage(hours, minutes),
            token: this.encrypt(timestamp, password)
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
     *                  - Too manu arguments in object: presenti più campi dati di quelli necessari(token, input)
     *                  - Invalid password format. : Ricevuta password vuota
     */
    public validateData(data: Object, psw: string): boolean {
        if(psw == "" || psw.length == 0) throw Error("Invalid password format.")
        if (data.hasOwnProperty('token') && data.hasOwnProperty('input') && Object.keys(data).length == 2) {
            return this.decrypt(data['token'], psw) == data['input'];
        } else {
            if (!data.hasOwnProperty('token')) throw Error('Missing token.');
            if (!data.hasOwnProperty('input')) throw Error('Missing input.');
            if (Object.keys(data).length > 2) throw Error('Too many arguments in object.')
        }
    }
    /**
     * Critta dei dati utilizzando una password
     * @param data : Dati da crittare
     * @param psw : Password utilizzata nella fase di crittazione
     * @returns Dati crittati
     */
    private encrypt(data: string, psw: string): string {
        return CryptoJS.AES.encrypt(data, psw).toString();
    }

    /**
     * Decritta dei dati utilizzando una password
     * @param data : Dati da decrittare
     * @param psw : Password utilizzata nella fase di decrittazione
     * @returns Dati decrittati
     */
    private decrypt(token: string, psw: string): boolean {
        return CryptoJS.AES.decrypt(token, psw).toString(CryptoJS.enc.Utf8);
    }
}