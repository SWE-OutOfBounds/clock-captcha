import { ClockCAPTCHA } from "../../src/index";

describe('ClockCAPTCHA unit tests', ()=>{
    
    describe('Interfaccia', ()=>{
        
        it('Fornisce il metodo generateData()', ()=>{
            expect(typeof ClockCAPTCHA.generateData).toBe('function');
        })
        
        it('Fornisce il metodo validateData()', ()=>{
            expect(typeof ClockCAPTCHA.validateData).toBe('function');
        })
    
    })

    describe('Gestione degli errori', ()=>{
        
        describe('generateData()', ()=>{
            
            it('Chiamata senza parametri', ()=>{

            })
        
        })
    
    })
})