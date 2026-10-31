import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximizeConsecutiveElementsInAnArrayAfterModification as maxSelectedElements } from ".";

/** Tries every choice of elements to raise. */
const byBruteForce = (nums: number[]): number => {
	let best = 0;
	for (let mask = 0; mask < 1 << nums.length; mask++) {
		const values = [...new Set(nums.map((v, i) => v + ((mask >> i) & 1)))].sort(
			(a, b) => a - b,
		);
		let run = 0;
		for (let i = 0; i < values.length; i++) {
			run = i > 0 && values[i] === (values[i - 1] ?? 0) + 1 ? run + 1 : 1;
			best = Math.max(best, run);
		}
	}
	return best;
};

describe("3041. Maximize Consecutive Elements in an Array After Modification", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxSelectedElements([2, 1, 5, 1, 1])).toBe(3);
		expect(maxSelectedElements([1, 4, 7, 10])).toBe(1);
	});

	it("matches trying every modification on random arrays", () => {
		const random = createRandom(3041);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 9), 1, 8);
			expect(maxSelectedElements(nums)).toBe(byBruteForce(nums));
		}
	});
});
