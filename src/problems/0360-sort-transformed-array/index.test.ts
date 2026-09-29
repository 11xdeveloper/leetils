import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sortTransformedArray } from ".";

describe("360. Sort Transformed Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(sortTransformedArray([-4, -2, 2, 4], 1, 3, 5)).toEqual([
			3, 9, 15, 33,
		]);
		expect(sortTransformedArray([-4, -2, 2, 4], -1, 3, 5)).toEqual([
			-23, -5, 1, 7,
		]);
	});

	it("handles straight lines with either slope", () => {
		expect(sortTransformedArray([1, 2, 3], 0, -2, 0)).toEqual([-6, -4, -2]);
		expect(sortTransformedArray([1, 2, 3], 0, 2, 1)).toEqual([3, 5, 7]);
	});

	it("matches transforming and sorting on random inputs", () => {
		const random = createRandom(360);
		for (let run = 0; run < 1000; run++) {
			const nums = random
				.array(random.int(1, 15), -100, 100)
				.toSorted((x, y) => x - y);
			const [a, b, c] = [
				random.int(-100, 100),
				random.int(-100, 100),
				random.int(-100, 100),
			];
			expect(sortTransformedArray(nums, a, b, c)).toEqual(
				nums.map((x) => a * x * x + b * x + c).toSorted((x, y) => x - y),
			);
		}
	});
});
