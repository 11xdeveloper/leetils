import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { transformArrayToAllEqualElements as canMakeEqual } from ".";

/** Searches every sequence of operations. */
const byBruteForce = (nums: number[], k: number): boolean => {
	const seen = new Map<string, number>([[nums.join(), 0]]);
	const queue = [nums];
	for (let q = 0; q < queue.length; q++) {
		const arr = queue[q] ?? [];
		const steps = seen.get(arr.join()) ?? 0;
		if (new Set(arr).size === 1) return steps <= k;
		for (let i = 0; i + 1 < arr.length; i++) {
			const next = [...arr];
			next[i] = -(next[i] ?? 0);
			next[i + 1] = -(next[i + 1] ?? 0);
			if (!seen.has(next.join())) {
				seen.set(next.join(), steps + 1);
				queue.push(next);
			}
		}
	}
	return false;
};

describe("3576. Transform Array to All Equal Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(canMakeEqual([1, -1, 1, -1, 1], 3)).toBeTrue();
		expect(canMakeEqual([-1, -1, -1, 1, 1, 1], 5)).toBeFalse();
	});

	it("matches searching every operation on random arrays", () => {
		const random = createRandom(3576);
		for (let run = 0; run < 200; run++) {
			const nums = random
				.array(random.int(1, 8), 0, 1)
				.map((b) => (b ? 1 : -1));
			const k = random.int(0, 8);
			expect(canMakeEqual(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
