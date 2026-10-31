/**
 * 2469. Convert the Temperature
 *
 * Converts degrees Celsius to `[Kelvin, Fahrenheit]`.
 *
 * @see https://leetcode.com/problems/convert-the-temperature/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * convertTheTemperature(36.5); // [309.65, 97.7]
 */
export const convertTheTemperature = (celsius: number): number[] => [
	celsius + 273.15,
	celsius * 1.8 + 32,
];
