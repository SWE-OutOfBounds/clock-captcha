import { ClockCAPTCHA, ClockImageGenerator, HTMLCanvasGenerator } from "../../src/index";

function crackCAPTCHA(token: string, password: string): string {
    let hours = 0, minutes = 0, user_input = ((hours < 10 ? "0" + hours.toString() : hours.toString()) + ':' + (minutes < 10 ? "0" + minutes.toString() : minutes.toString())), flag = false;
    while (!flag && hours < 12) {
        minutes = 0;
        while (!flag && minutes < 60) {
            flag = ClockCAPTCHA.validateData({ token: token, input: user_input }, password);
            if (!flag) user_input = ((hours < 10 ? "0" + hours.toString() : hours.toString()) + ':' + (minutes < 10 ? "0" + minutes.toString() : minutes.toString()));
            if (!flag) minutes++;
        }
        if (!flag) hours++;
    }
    return user_input;
}

describe('ClockCAPTCHA unit tests', () => {

    describe('Interfaccia', () => {

        it('Fornisce il metodo generateData()', () => {
            expect(typeof ClockCAPTCHA.generateData).toBe('function');
        })

        it('Fornisce il metodo validateData()', () => {
            expect(typeof ClockCAPTCHA.validateData).toBe('function');
        })

    })

    describe('Funzionamento di generateData()', () => {
        const payload = ClockCAPTCHA.generateData('Password', new ClockImageGenerator(new HTMLCanvasGenerator()));

        it('Chiamata con password vuota solleva eccezione', () => {
            const wrap = () => {
                ClockCAPTCHA.generateData('', new ClockImageGenerator(new HTMLCanvasGenerator()));
            }
            expect(wrap).toThrow(Error);
        })

        it('Chiamata con password ben formata ritorna un oggetto', () => {
            expect(typeof payload).toBe("object");
        })

        it('Oggetto generato contiene campi dati corretti (token e image)', () => {
            expect(payload.hasOwnProperty('token') && payload.hasOwnProperty('image')).toBe(true);
        })

        it('Contenuto dell\'oggetto ben formato', () => {
            expect(payload['token']).toEqual(expect.any(String));
            expect(payload['image']).toEqual(expect.any(String));
        })

    })

    describe('Funzionamento di validateData()', () => {
        const payload = ClockCAPTCHA.generateData('Password', new ClockImageGenerator(new HTMLCanvasGenerator()));
        const user_input = crackCAPTCHA(payload['token'], "Password");
        const true_result = ClockCAPTCHA.validateData({ token: payload['token'], input: user_input }, "Password");
        const false_result = ClockCAPTCHA.validateData({ token: payload['token'], input: "00:00" == user_input ? "00:01" : "00:00" }, "Password");

        it("Chiamata con password vuota solleva eccezione", () => {
            const wrap = () => {
                const result = ClockCAPTCHA.validateData({ token: payload['token'], input: user_input }, "");
            }
            expect(wrap).toThrow(Error);
        })

        it("Chiamata con oggetto vuoto genera eccezione",()=>{
            const wrap = () => {
                const result = ClockCAPTCHA.validateData({}, "Password");
            }
            expect(wrap).toThrow(Error);
        })

        it("Chiamata con oggetto malformato genera eccezione",()=>{
            const onlyToken = () => {
                const result = ClockCAPTCHA.validateData({token: "token"}, "Password");
            }
            const onlyPassword = () => {
                const result = ClockCAPTCHA.validateData({password: "Password"}, "Password");
            }
            const moreThanTwoElement = () => {
                const result = ClockCAPTCHA.validateData({token: "token", password: "Password", thirdElement: "ThirdElement"}, "Password");
            }
            const twoElementWrongName = () => {
                const result = ClockCAPTCHA.validateData({tkn: "token", psw: "Password"}, "Password");
            }
            expect(onlyToken).toThrow(Error);
            expect(onlyPassword).toThrow(Error);
            expect(moreThanTwoElement).toThrow(Error);
            expect(twoElementWrongName).toThrow(Error);
        })

        it("Chiamata consistente ritorna un booleano", () => {
            expect(true_result).toEqual(expect.any(Boolean));
        })

        it("Con input corretto ritorna true", ()=>{
            expect(true_result).toBe(true);
        })

        it("Con input errato ritorna false", ()=>{
            expect(false_result).toBe(false);
        })

    })

})