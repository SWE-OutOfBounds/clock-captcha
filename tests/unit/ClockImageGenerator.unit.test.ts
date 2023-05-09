import { ClockImageGenerator, HTMLCanvasGenerator } from "../../src/index";

describe("ClockImageGenerator unit tests", () => {
    let ImageGenerationStrategy = new HTMLCanvasGenerator();
    let ImageGenerator = new ClockImageGenerator(ImageGenerationStrategy);

    describe("Interfaccia", () => {

        it("Fornisce il metodo generateImage()", () => {
            expect(typeof ImageGenerator.generateImage).toBe('function');
        })

    })

    describe("Funzionamento di base di generateImage()", () => {

        it("Chiamata con parametri fuori range solleva eccezione", () => {
            const outOfRangeParameters = () => {
                ImageGenerator.generateImage(123, 123);
            }
            expect(outOfRangeParameters).toThrow(Error);
        })

        it("Chiamata con parametri corretti ritorna una stringa", () => {
            expect(ImageGenerator.generateImage(10, 10)).toEqual(expect.any(String));
        })

        it("Stringa ritornata del giusto formato", ()=>{
            expect(ImageGenerator.generateImage(10, 10).length).toBeGreaterThan(0);
        })

    })

})