import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { nextGreaterElementIV as secondGreaterElement } from ".";

/** Scans forward from each element. */
const byBruteForce = (nums: number[]): number[] =>
	nums.map((num, i) => nums.slice(i + 1).filter((v) => v > num)[1] ?? -1);

describe("2454. Next Greater Element IV", () => {
	it("solves the examples from the problem statement", () => {
		expect(secondGreaterElement([2, 4, 0, 9, 6])).toEqual([9, 6, 6, -1, -1]);
		expect(secondGreaterElement([3, 3])).toEqual([-1, -1]);
	});

	it("matches scanning forward on random inputs", () => {
		const random = createRandom(2454);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), 0, 8);
			expect(secondGreaterElement(nums)).toEqual(byBruteForce(nums));
		}
	});
});
