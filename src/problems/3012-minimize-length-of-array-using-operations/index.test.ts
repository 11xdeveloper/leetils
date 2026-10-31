import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimizeLengthOfArrayUsingOperations as minimumArrayLength } from ".";

/** Searches every sequence of operations. */
const byBruteForce = (nums: number[]): number => {
	const seen = new Map<string, number>();
	const search = (arr: number[]): number => {
		const key = arr.toSorted((a, b) => a - b).join();
		const cached = seen.get(key);
		if (cached !== undefined) return cached;
		let best = arr.length;
		for (let i = 0; i < arr.length; i++)
			for (let j = 0; j < arr.length; j++) {
				const [a = 0, b = 0] = [arr[i], arr[j]];
				if (i === j || a <= 0 || b <= 0) continue;
				const rest = arr.filter((_, k) => k !== i && k !== j);
				best = Math.min(best, search([...rest, a % b]));
			}
		seen.set(key, best);
		return best;
	};
	return search(nums);
};

describe("3012. Minimize Length of Array Using Operations", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumArrayLength([1, 4, 3, 1])).toBe(1);
		expect(minimumArrayLength([5, 5, 5, 10, 5])).toBe(2);
		expect(minimumArrayLength([2, 3, 4])).toBe(1);
	});

	it("matches searching every operation on random arrays", () => {
		const random = createRandom(3012);
		for (let run = 0; run < 150; run++) {
			const nums = random.array(random.int(1, 6), 1, 8);
			expect(minimumArrayLength(nums)).toBe(byBruteForce(nums));
		}
	});
});
