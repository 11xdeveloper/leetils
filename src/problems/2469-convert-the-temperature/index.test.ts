import { describe, expect, it } from "bun:test";
import { convertTheTemperature } from ".";

describe("2469. Convert the Temperature", () => {
	it("solves the examples from the problem statement", () => {
		const [kelvin = 0, fahrenheit = 0] = convertTheTemperature(36.5);
		expect(kelvin).toBeCloseTo(309.65, 5);
		expect(fahrenheit).toBeCloseTo(97.7, 5);
		const [k2 = 0, f2 = 0] = convertTheTemperature(122.11);
		expect(k2).toBeCloseTo(395.26, 5);
		expect(f2).toBeCloseTo(251.798, 5);
	});
});
