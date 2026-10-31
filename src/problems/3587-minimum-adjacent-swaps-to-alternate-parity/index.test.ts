import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumAdjacentSwapsToAlternateParity as minSwaps } from ".";

/** Searches every sequence of swaps. */
const byBruteForce = (nums: number[]): number => {
	const alternates = (arr: number[]) =>
		arr.every((x, i) => i === 0 || x % 2 !== (arr[i - 1] ?? 0) % 2);
	const seen = new Map<string, number>([[nums.join(), 0]]);
	const queue = [nums];
	for (let q = 0; q < queue.length; q++) {
		const arr = queue[q] ?? [];
		const steps = seen.get(arr.join()) ?? 0;
		if (alternates(arr)) return steps;
		for (let i = 0; i + 1 < arr.length; i++) {
			const next = [...arr];
			[next[i], next[i + 1]] = [next[i + 1] ?? 0, next[i] ?? 0];
			if (!seen.has(next.join())) {
				seen.set(next.join(), steps + 1);
				queue.push(next);
			}
		}
	}
	return -1;
};

describe("3587. Minimum Adjacent Swaps to Alternate Parity", () => {
	it("solves the examples from the problem statement", () => {
		expect(minSwaps([2, 4, 6, 5, 7])).toBe(3);
		expect(minSwaps([2, 4, 5, 7])).toBe(1);
		expect(minSwaps([1, 2, 3])).toBe(0);
		expect(minSwaps([4, 5, 6, 8])).toBe(-1);
	});

	it("matches searching every swap on random arrays", () => {
		const random = createRandom(3587);
		for (let run = 0; run < 100; run++) {
			const n = random.int(1, 7);
			const pool = Array.from({ length: 20 }, (_, i) => i + 1);
			const nums = Array.from(
				{ length: n },
				() => pool.splice(random.int(0, pool.length - 1), 1)[0] ?? 0,
			);
			expect(minSwaps(nums)).toBe(byBruteForce(nums));
		}
	});
});
