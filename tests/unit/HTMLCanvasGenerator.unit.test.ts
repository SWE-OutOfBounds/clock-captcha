import { ClockCAPTCHA, ClockImageGenerator, HTMLCanvasGenerator } from "../../src/index";
describe("HTMLCanvasGenerator unit tests", ()=>{

    let tested = new HTMLCanvasGenerator();
    let generateResult = tested.generate(0,0);

    describe("Interfaccia", ()=>{

        it("Fornisce metodo generate()", ()=>{
            expect(typeof tested.generate).toBe('function');
        })

    })

    describe("Funzionamento di base di generate()", ()=>{

        it("Chiamata con valori fuori range", ()=>{
            const NegativeValue = ()=>{
                tested.generate(-1,-1);
            }
            const HoursOutOfRange = ()=>{
                tested.generate(13,0);
            }
            const MinutesOutOfRange = ()=>{
                tested.generate(0,62);
            }
            const OutOfRange = ()=>{
                tested.generate(100, 100);
            }

            expect(NegativeValue).toThrowError();
            expect(HoursOutOfRange).toThrowError();
            expect(MinutesOutOfRange).toThrowError();
            expect(OutOfRange).toThrowError();
        })

        it("Chiamata senza errori nei parametri ritorna una stringa", ()=>{
            expect(generateResult).toEqual(expect.any(String));
        })

        it("Stringa ritornata ben formata", ()=>{
            expect(generateResult.length).toBeGreaterThan(0);
        })

    })

})