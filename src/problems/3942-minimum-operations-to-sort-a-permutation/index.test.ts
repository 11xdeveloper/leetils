import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumOperationsToSortAPermutation as minOperations } from ".";

/** Breadth-first search over arrays. */
const byBruteForce = (nums: number[]): number => {
	const goal = [...nums].sort((a, b) => a - b).join();
	const distance = new Map([[nums.join(), 0]]);
	const queue = [nums];
	for (let q = 0; q < queue.length; q++) {
		const arr = queue[q] ?? [];
		if (arr.join() === goal) return distance.get(arr.join()) ?? 0;
		for (const next of [[...arr].reverse(), [...arr.slice(1), arr[0] ?? 0]])
			if (!distance.has(next.join())) {
				distance.set(next.join(), (distance.get(arr.join()) ?? 0) + 1);
				queue.push(next);
			}
	}
	return -1;
};

describe("3942. Minimum Operations to Sort a Permutation", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([0, 2, 1])).toBe(2);
		expect(minOperations([1, 0, 2])).toBe(2);
		expect(minOperations([2, 0, 1, 3])).toBe(-1);
	});

	it("matches searching arrays on random permutations", () => {
		const random = createRandom(3942);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 7);
			const base = Array.from({ length: n }, (_, i) => i);
			const shift = random.int(0, n - 1);
			let nums = [...base.slice(shift), ...base.slice(0, shift)];
			if (random.int(0, 1)) nums.reverse();
			if (random.int(0, 3) === 0) nums = nums.sort(() => random.next() - 0.5);
			expect(minOperations(nums)).toBe(byBruteForce(nums));
		}
	});
});
