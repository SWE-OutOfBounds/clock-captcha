import { ClockCAPTCHA, ClockImageGenerator, HTMLCanvasGenerator } from "../../src/index";
describe("HTMLCanvasGenerator unit tests", ()=>{

    let tested = new HTMLCanvasGenerator();

    describe("Interfaccia", ()=>{

        it("Fornisce metodo generate", ()=>{
            expect(typeof tested.generate).toBe('function');
        })

    })

})