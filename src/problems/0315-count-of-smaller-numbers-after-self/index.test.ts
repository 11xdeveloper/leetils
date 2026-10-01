import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countOfSmallerNumbersAfterSelf as countSmaller } from ".";

const byBruteForce = (nums: number[]): number[] =>
	nums.map((num, i) => nums.slice(i + 1).filter((other) => other < num).length);

describe("315. Count of Smaller Numbers After Self", () => {
	it("solves the examples from the problem statement", () => {
		expect(countSmaller([5, 2, 6, 1])).toEqual([2, 1, 1, 0]);
		expect(countSmaller([-1])).toEqual([0]);
		expect(countSmaller([-1, -1])).toEqual([0, 0]);
	});

	it("handles values at the limits of the constraints", () => {
		expect(countSmaller([1e4, -1e4, 0])).toEqual([2, 0, 0]);
	});

	it("matches checking every later element on random inputs", () => {
		const random = createRandom(315);
		for (let run = 0; run < 500; run++) {
			const nums = random.array(random.int(1, 25), -10, 10);
			expect(countSmaller(nums)).toEqual(byBruteForce(nums));
		}
	});
});
