import { describe, expect, it } from "bun:test";
import { minimumEnergyToMaintainBrightness as minEnergy } from ".";

describe("3951. Minimum Energy to Maintain Brightness", () => {
	it("solves the examples from the problem statement", () => {
		expect(minEnergy(5, 5, [[6, 12]])).toBe(14);
		expect(
			minEnergy(2, 1, [
				[0, 0],
				[2, 2],
			]),
		).toBe(2);
		expect(
			minEnergy(4, 2, [
				[1, 3],
				[2, 4],
			]),
		).toBe(4);
	});

	it("merges touching intervals", () => {
		expect(
			minEnergy(9, 9, [
				[0, 1],
				[2, 3],
			]),
		).toBe(12);
	});
});
