export interface ClockImageGenerationStrategy{
    generate(hours: number, minutes: number): string;
}