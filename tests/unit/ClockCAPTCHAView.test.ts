import { JSDOM } from "jsdom";
const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;

import { ClockCAPTCHAView } from "../../src";

describe("NoiseDecorator unit tests", () => {
  let tested = new ClockCAPTCHAView();
  tested.fill("image", "token");
  let voidElement = new ClockCAPTCHAView();

  describe("Interfaccia", () => {
    it("Fornisce metodo getInput()", () => {
      expect(typeof tested.getInput).toBe("function");
    });
    it("Fornisce metodo getToken()", () => {
      expect(typeof tested.getToken).toBe("function");
    });
    it("Fornisce metodo inject()", () => {
      expect(typeof tested.inject).toBe("function");
    });
    it("Fornisce metodo error()", () => {
      expect(typeof tested.error).toBe("function");
    });
    it("Fornisce metodo clear()", () => {
      expect(typeof tested.clear).toBe("function");
    });
    it("Fornisce metodo message()", () => {
      expect(typeof tested.message).toBe("function");
    });
    it("Fornisce metodo fill()", () => {
      expect(typeof tested.fill).toBe("function");
    });
  });

  describe("Funzionamento della funzione getToken()", () => {
    it("Chiamata su oggetto con paramtro vuoto vuoto lancia eccezione", () => {
      const wrap = () => {
        voidElement.getToken();
      };
      expect(wrap).toThrow(Error);
    });
    it("Chiamata su oggetto con parametro ben formato ritorna string", () => {
      expect(tested.getToken()).toEqual(expect.any(String));
    });
  });

  describe("Funzionamento della funzione getInput()", () => {
    it("Chiamata su oggetto con input vuoto ritorna stringa vuota", () => {
      expect(tested.getInput()).toBe("");
    });
  });

  describe("Funzionamento della funzione inject()", () => {
    it("Chiamata con parametro null lancia eccezione", () => {
      const wrap = () => {
        tested.inject(null);
      };
      expect(wrap).toThrow(Error);
    });
  });

  describe("Funzionamento della funzione error()", () => {
    it("Chiamata con parametro vuoto lancia eccezione", () => {
      const wrap = () => {
        tested.error("");
      };
      expect(wrap).toThrow(Error);
    });
  });

  describe("Funzionamento della funzione message()", () => {
    it("Chiamata con parametro vuoto lancia eccezione", () => {
      const wrap = () => {
        tested.message("");
      };
      expect(wrap).toThrow(Error);
    });
  });

  describe("Funzionamento della funzione clear()", () => {
    it("Chiamata pulisce il token", () => {
      tested.clear();
      const wrap = () => {
        tested.getToken();
      };
      expect(wrap).toThrow(Error);
      // Reset tested
      tested.fill("image", "token");
    });
  });

  describe("Funzionamento della funzione fill()", () => {
    it("Chiamata con parametri vuoti lancia eccezione", () => {
      const wrap = () => {
        tested.fill("", "");
      };
      expect(wrap).toThrow(Error);
    });
  });
});
