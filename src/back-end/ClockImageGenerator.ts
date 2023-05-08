import { ClockImageGenerationStrategy } from "./ClockImageGeneratorStrategy/ClockImageGeneratorStrategy";
export class ClockImageGenerator{
    constructor(strategy: ClockImageGenerationStrategy) {
        this.strategy = strategy;
    }

    public generateImage(hours: number, minutes: number): string {
        return this.strategy.generate(hours, minutes);
    }

    private strategy: ClockImageGenerationStrategy;
}