import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findAValueOfAMysteriousFunctionClosestToTarget as closestToTarget } from ".";

/** ANDs every subarray. */
const byBruteForce = (arr: number[], target: number): number => {
	let best = Infinity;
	for (let l = 0; l < arr.length; l++) {
		let and = -1;
		for (let r = l; r < arr.length; r++) {
			and &= arr[r] ?? 0;
			best = Math.min(best, Math.abs(and - target));
		}
	}
	return best;
};

describe("1521. Find a Value of a Mysterious Function Closest to Target", () => {
	it("solves the examples from the problem statement", () => {
		expect(closestToTarget([9, 12, 3, 7, 15], 5)).toBe(2);
		expect(closestToTarget([1000000, 1000000, 1000000], 1)).toBe(999999);
		expect(closestToTarget([1, 2, 4, 8, 16], 0)).toBe(0);
	});

	it("matches ANDing every subarray on random inputs", () => {
		const random = createRandom(1521);
		for (let run = 0; run < 300; run++) {
			const arr = random.array(random.int(1, 12), 1, 63);
			const target = random.int(0, 70);
			expect(closestToTarget(arr, target)).toBe(byBruteForce(arr, target));
		}
	});
});
