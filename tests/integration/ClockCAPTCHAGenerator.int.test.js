import { ClockCAPTCHAGenerator } from "../../src/back-end/ClockCAPTCHAGenerator";

describe("ClockCAPTCHAGenerator integration tests", () => {

    test("validateUserInput() ritorna true per un orario compreso tra 00:00 e 11:59 con password conosciuta", () => {
        let password = "password";
        let tested = new ClockCAPTCHAGenerator(password);

        let hours = 0;
        let minutes = 0;
        let flag = false;

        for (let i = 0; i < 12 && !flag; i++) {
            for (let j = 0; j < 60 && !flag; j++) {
                let input = (i < 10 ? "0" + i.toString() : i.toString()) + ":" + (j < 10 ? "0" + j.toString() : j.toString());
                flag = ClockCAPTCHAGenerator.verifyUserInput(tested.getToken(), password, input);
            }
        }

        expect(flag).toBe(true);
    })

})