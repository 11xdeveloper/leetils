import { describe, expect, it } from "bun:test";
import { minimumSensorsToCoverGrid as minSensors } from ".";

describe("3648. Minimum Sensors to Cover Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(minSensors(5, 5, 1)).toBe(4);
		expect(minSensors(2, 2, 2)).toBe(1);
	});

	it("needs a sensor per cell when k is 0", () => {
		expect(minSensors(3, 4, 0)).toBe(12);
	});
});
