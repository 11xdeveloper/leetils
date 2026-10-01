import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sumOfAbsoluteDifferencesInASortedArray as getSumAbsoluteDifferences } from ".";

describe("1685. Sum of Absolute Differences in a Sorted Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(getSumAbsoluteDifferences([2, 3, 5])).toEqual([4, 3, 5]);
		expect(getSumAbsoluteDifferences([1, 4, 6, 8, 10])).toEqual([
			24, 15, 13, 15, 21,
		]);
	});

	it("matches summing every difference on random inputs", () => {
		const random = createRandom(1685);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(2, 10), 1, 20).sort((a, b) => a - b);
			const expected = nums.map((x) =>
				nums.reduce((sum, y) => sum + Math.abs(x - y), 0),
			);
			expect(getSumAbsoluteDifferences(nums)).toEqual(expected);
		}
	});
});
