import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumOperationsToMakeArrayParityAlternating as makeParityAlternating } from ".";

/** Tries every set of ±1 moves for each pattern. */
const byBruteForce = (nums: number[]): number[] => {
	const parity = (x: number) => ((x % 2) + 2) % 2;
	let [ops, range] = [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY];
	for (const first of [0, 1]) {
		const wrong = nums.map((x, i) => parity(x) !== (first + i) % 2);
		const count = wrong.filter(Boolean).length;
		if (count > ops) continue;
		let best = Number.POSITIVE_INFINITY;
		for (let mask = 0; mask < 1 << nums.length; mask++) {
			const arr = nums.map((x, i) =>
				wrong[i] ? ((mask >> i) & 1 ? x + 1 : x - 1) : x,
			);
			best = Math.min(best, Math.max(...arr) - Math.min(...arr));
		}
		if (count < ops) [ops, range] = [count, best];
		else range = Math.min(range, best);
	}
	return [ops, range];
};

describe("3854. Minimum Operations to Make Array Parity Alternating", () => {
	it("solves the examples from the problem statement", () => {
		expect(makeParityAlternating([-2, -3, 1, 4])).toEqual([2, 6]);
		expect(makeParityAlternating([0, 2, -2])).toEqual([1, 3]);
		expect(makeParityAlternating([7])).toEqual([0, 0]);
	});

	it("matches trying every move on random arrays", () => {
		const random = createRandom(3854);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 8), -6, 6);
			expect(makeParityAlternating(nums)).toEqual(byBruteForce(nums));
		}
	});
});
