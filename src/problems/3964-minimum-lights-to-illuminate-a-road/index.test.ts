import { describe, expect, it } from "bun:test";
import { minimumLightsToIlluminateARoad as minLights } from ".";

describe("3964. Minimum Lights to Illuminate a Road", () => {
	it("solves the examples from the problem statement", () => {
		expect(minLights([0, 0, 0, 0])).toBe(2);
		expect(minLights([0, 0, 0, 2, 0])).toBe(1);
	});

	it("shares one bulb between nearby dark spots", () => {
		expect(minLights([0, 1, 0, 0, 0])).toBe(1);
	});
});
