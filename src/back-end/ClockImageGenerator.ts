import { ClockImageGenerationStrategy } from "./ClockImageGenerationStrategy";
export class ClockImageGenerator{
    public generateImage(hours: number, minutes: number): string{
        return this._strategy.generate(hours, minutes);
    }
    private _strategy: ClockImageGenerationStrategy;
}