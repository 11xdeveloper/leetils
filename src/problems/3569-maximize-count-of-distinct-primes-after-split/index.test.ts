import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximizeCountOfDistinctPrimesAfterSplit as maximumCount } from ".";

const isPrime = (x: number) => {
	if (x < 2) return false;
	for (let d = 2; d * d <= x; d++) if (x % d === 0) return false;
	return true;
};

/** Tries every split after each update. */
const byBruteForce = (nums: number[], queries: number[][]): number[] => {
	const arr = [...nums];
	return queries.map(([index = 0, value = 0]) => {
		arr[index] = value;
		let best = 0;
		for (let k = 1; k < arr.length; k++) {
			const left = new Set(arr.slice(0, k).filter(isPrime));
			const right = new Set(arr.slice(k).filter(isPrime));
			best = Math.max(best, left.size + right.size);
		}
		return best;
	});
};

describe("3569. Maximize Count of Distinct Primes After Split", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maximumCount(
				[2, 1, 3, 1, 2],
				[
					[1, 2],
					[3, 3],
				],
			),
		).toEqual([3, 4]);
		expect(maximumCount([2, 1, 4], [[0, 1]])).toEqual([0]);
	});

	it("matches trying every split on random updates", () => {
		const random = createRandom(3569);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(2, 8), 1, 12);
			const queries = Array.from({ length: random.int(1, 6) }, () => [
				random.int(0, nums.length - 1),
				random.int(1, 12),
			]);
			expect(maximumCount(nums, queries)).toEqual(byBruteForce(nums, queries));
		}
	});
});
