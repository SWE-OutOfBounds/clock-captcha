import * as stylist from "./stylist";

import { Sha256 } from '@aws-crypto/sha256-js';
import glfx from 'glfx';
import { p5 } from 'p5';

export interface ClockCAPTCHAInterface {
    draw(): void;
    addButtonListener(fun: EventListener);
    inject(container: HTMLElement | null): void;

    reset(): void;

    getSeed(): String;
    getInput(): String;
    getCanvas(): HTMLCanvasElement;
    setTitle(title: string): void;
}