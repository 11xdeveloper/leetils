import { describe, expect, it } from "bun:test";
import { pourWaterBetweenBucketsToMakeWaterLevelsEqual as equalizeWater } from ".";

describe("2137. Pour Water Between Buckets to Make Water Levels Equal", () => {
	it("solves the examples from the problem statement", () => {
		expect(equalizeWater([1, 2, 7], 80)).toBeCloseTo(2, 5);
		expect(equalizeWater([2, 4, 6], 50)).toBeCloseTo(3.5, 5);
		expect(equalizeWater([3, 3, 3, 3], 40)).toBeCloseTo(3, 5);
	});

	it("averages when nothing spills", () => {
		expect(equalizeWater([0, 10], 0)).toBeCloseTo(5, 5);
	});
});
