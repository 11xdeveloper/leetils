import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { lexicographicallyLargestPowerArray as largestPower } from ".";

/** Tries every ordering. */
const byBruteForce = (nums: number[]): number[] => {
	let best: number[] = [];
	const greater = (a: number[], b: number[]) => {
		for (let i = 0; i < a.length; i++)
			if (a[i] !== b[i]) return (a[i] ?? 0) > (b[i] ?? 0);
		return false;
	};
	const go = (perm: number[], rest: number[]): void => {
		if (rest.length === 0) {
			const power = Array.from({ length: 15 }, (_, i) => {
				let j = 0;
				while (j < perm.length && ((perm[j] ?? 0) >> (14 - i)) & 1) j++;
				return j;
			});
			if (best.length === 0 || greater(power, best)) best = power;
			return;
		}
		rest.forEach((x, i) => {
			go(
				[...perm, x],
				rest.filter((_, j) => j !== i),
			);
		});
	};
	go([], nums);
	return best;
};

describe("4059. Lexicographically Largest Power Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(largestPower([7, 5])).toEqual([
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 2,
		]);
		expect(largestPower([3, 1, 7])).toEqual([
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3,
		]);
	});

	it("matches trying every ordering on random arrays", () => {
		const random = createRandom(4059);
		for (let run = 0; run < 100; run++) {
			const nums = random.array(random.int(1, 6), 0, 15);
			expect(largestPower(nums)).toEqual(byBruteForce(nums));
		}
	});
});
