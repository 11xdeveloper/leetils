import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumSwapsToAvoidForbiddenValues as minSwaps } from ".";

/** Breadth-first search over arrangements. */
const byBruteForce = (nums: number[], forbidden: number[]): number => {
	const ok = (arr: number[]) => arr.every((x, i) => x !== forbidden[i]);
	const distance = new Map([[nums.join(), 0]]);
	const queue = [nums];
	for (let q = 0; q < queue.length; q++) {
		const arr = queue[q] ?? [];
		const steps = distance.get(arr.join()) ?? 0;
		if (ok(arr)) return steps;
		for (let i = 0; i < arr.length; i++)
			for (let j = i + 1; j < arr.length; j++) {
				const next = [...arr];
				[next[i], next[j]] = [next[j] ?? 0, next[i] ?? 0];
				if (!distance.has(next.join())) {
					distance.set(next.join(), steps + 1);
					queue.push(next);
				}
			}
	}
	return -1;
};

describe("3785. Minimum Swaps to Avoid Forbidden Values", () => {
	it("solves the examples from the problem statement", () => {
		expect(minSwaps([1, 2, 3], [3, 2, 1])).toBe(1);
		expect(minSwaps([4, 6, 6, 5], [4, 6, 5, 5])).toBe(2);
		expect(minSwaps([7, 7], [8, 7])).toBe(-1);
		expect(minSwaps([1, 2], [2, 1])).toBe(0);
	});

	it("matches searching arrangements on random input", () => {
		const random = createRandom(3785);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 6);
			const nums = random.array(n, 1, 3);
			const forbidden = random.array(n, 1, 3);
			expect(minSwaps(nums, forbidden)).toBe(byBruteForce(nums, forbidden));
		}
	});
});
