import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumUnlockedIndicesToSortNums as minUnlockedIndices } from ".";

/** Tries every set of unlocks with a search over reachable arrangements. */
const byBruteForce = (nums: number[], locked: number[]): number => {
	const n = nums.length;
	const sorted = nums.toSorted((a, b) => a - b).join();
	let best = -1;
	for (let mask = 0; mask < 1 << n; mask++) {
		const open = locked.map((l, i) => l === 0 || ((mask >> i) & 1) === 1);
		const unlocks = locked.filter((l, i) => l === 1 && (mask >> i) & 1).length;
		if (best !== -1 && unlocks >= best) continue;
		const seen = new Set([nums.join()]);
		const queue = [nums];
		let reached = false;
		for (let q = 0; q < queue.length && !reached; q++) {
			const arr = queue[q] ?? [];
			if (arr.join() === sorted) reached = true;
			for (let i = 0; i + 1 < n; i++)
				if (open[i] && (arr[i] ?? 0) - (arr[i + 1] ?? 0) === 1) {
					const next = [...arr];
					[next[i], next[i + 1]] = [next[i + 1] ?? 0, next[i] ?? 0];
					if (!seen.has(next.join())) {
						seen.add(next.join());
						queue.push(next);
					}
				}
		}
		if (reached) best = unlocks;
	}
	return best;
};

describe("3431. Minimum Unlocked Indices to Sort Nums", () => {
	it("solves the examples from the problem statement", () => {
		expect(minUnlockedIndices([1, 2, 1, 2, 3, 2], [1, 0, 1, 1, 0, 1])).toBe(0);
		expect(
			minUnlockedIndices([1, 2, 1, 1, 3, 2, 2], [1, 0, 1, 1, 0, 1, 0]),
		).toBe(2);
		expect(
			minUnlockedIndices([1, 2, 1, 2, 3, 2, 1], [0, 0, 0, 0, 0, 0, 0]),
		).toBe(-1);
	});

	it("matches searching every unlock set on random arrays", () => {
		const random = createRandom(3431);
		for (let run = 0; run < 100; run++) {
			const nums = random.array(random.int(1, 7), 1, 3);
			const locked = random.array(nums.length, 0, 1);
			expect(minUnlockedIndices(nums, locked)).toBe(byBruteForce(nums, locked));
		}
	});
});
