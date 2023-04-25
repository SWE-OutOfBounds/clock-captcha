import { Canvas } from "canvas";
import { ClockCAPTCHAGenerator } from "../../src/back-end/ClockCAPTCHAGenerator";
describe("ClockCAPTCHAGenerator", () => {


    describe("Interfaccia", () => {
        let tested = new ClockCAPTCHAGenerator("")
        test("Funzione draw() disponibile", () => {
            expect(typeof tested.draw).toBe("function");
        })
        test("Funzione getImage() disponibile", () => {
            expect(typeof tested.getImage).toBe("function");
        })
        test("Funzione getToken() disponibile", () => {
            expect(typeof tested.getToken).toBe("function");
        })
        test("Funzione getCanvas() disponibile", () => {
            expect(typeof tested.getCanvas).toBe("function");
        })
    })

    describe("Coerenza tipi di ritorno", () => {
        let tested = new ClockCAPTCHAGenerator("")
        test("Funzione draw() ritorna void", () => {
            expect(tested.draw()).toBeUndefined();
        })
        test("Funzione getImage() ritorna string", () => {
            expect(typeof tested.getImage()).toBe("string");
        })
        test("Funzione getToken() ritorna string", () => {
            expect(typeof tested.getToken()).toBe("string");
        })
        test("Funzione getCanvas() ritorna un oggetto", () => {
            expect(typeof tested.getCanvas()).toBe("object");
        })
    })

    describe("Funzionamento", () => {
        let generator = new ClockCAPTCHAGenerator("");
        let drawSpy = jest.spyOn(generator, "draw");


    })

})