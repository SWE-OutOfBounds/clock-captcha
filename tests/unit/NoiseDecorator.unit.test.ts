import { NoiseDecorator } from '../../src/back-end/NoiseDecorator';
import { ClockCAPTCHAGenerator } from '../../src/back-end/ClockCAPTCHAGenerator';

describe('test', ()=>{
    test('test', ()=>{
        let cc = new ClockCAPTCHAGenerator("");
        console.log(cc.getCanvas().toDataURL());
        let dd = new NoiseDecorator(cc, 30);
        console.log(dd.getCanvas().toDataURL());
    })
})