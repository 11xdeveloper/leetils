import { describe, expect, it } from "bun:test";
import { countGoodTriplets } from ".";

describe("1534. Count Good Triplets", () => {
	it("solves the examples from the problem statement", () => {
		expect(countGoodTriplets([3, 0, 1, 1, 9, 7], 7, 2, 3)).toBe(4);
		expect(countGoodTriplets([1, 1, 2, 2, 3], 0, 0, 1)).toBe(0);
	});

	it("counts every triple when the limits are loose", () => {
		expect(countGoodTriplets(new Array<number>(100).fill(5), 0, 0, 0)).toBe(
			(100 * 99 * 98) / 6,
		);
	});
});
