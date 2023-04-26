import { ShapesDecorator } from '../../src/back-end/ShapeDecorator';
import { ClockCAPTCHAGenerator } from '../../src/back-end/ClockCAPTCHAGenerator';

class ShapesDecoratorTester extends ShapesDecorator{
    public getShapePresence() : number{
        return this._shapePresence;
    }
}

describe("ShapesDecorator unit tests", ()=>{

    describe("Interfaccia", ()=>{
        let tested = new ShapesDecorator(new ClockCAPTCHAGenerator(""),1);
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
        let tested = new ShapesDecorator(new ClockCAPTCHAGenerator(""),1);
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

    describe("Funzionamento", ()=>{
        test("constructor() assegna il valore corretto all'attributo _shapeNumber", ()=>{
            let shapeNumber = 10;
            let tested = new ShapesDecoratorTester(new ClockCAPTCHAGenerator(""), shapeNumber);
            
            expect(tested.getShapePresence()).toEqual(shapeNumber);
        })

        test("constructor() crea il contenuto della canvas", ()=>{
            let tested = new ShapesDecoratorTester(new ClockCAPTCHAGenerator(""), 1);
            
            expect(0 - tested.getCanvas.toString().length).toBeLessThan(0);
        })
        
        test("", ()=>{

        })
    })
})