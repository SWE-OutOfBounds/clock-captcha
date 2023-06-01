import { ClockImageGenerationStrategy } from "../../ClockImageGeneratorStrategy";

export interface HTMLCanvasStrategy extends ClockImageGenerationStrategy {
  generate(hours: number, minutes: number): string;
}
