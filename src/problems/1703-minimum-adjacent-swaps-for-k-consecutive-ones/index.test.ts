import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumAdjacentSwapsForKConsecutiveOnes as minMoves } from ".";

/** Breadth-first search over arrangements reached by adjacent swaps. */
const byBruteForce = (nums: number[], k: number): number => {
	const start = nums.join("");
	const goal = "1".repeat(k);
	const dist = new Map([[start, 0]]);
	const queue = [start];
	for (let i = 0; i < queue.length; i++) {
		const current = queue[i] ?? "";
		if (current.includes(goal)) return dist.get(current) ?? 0;
		for (let j = 0; j + 1 < current.length; j++) {
			if (current[j] === current[j + 1]) continue;
			const next =
				current.slice(0, j) +
				current[j + 1] +
				current[j] +
				current.slice(j + 2);
			if (dist.has(next)) continue;
			dist.set(next, (dist.get(current) ?? 0) + 1);
			queue.push(next);
		}
	}
	return -1;
};

describe("1703. Minimum Adjacent Swaps for K Consecutive Ones", () => {
	it("solves the examples from the problem statement", () => {
		expect(minMoves([1, 0, 0, 1, 0, 1], 2)).toBe(1);
		expect(minMoves([1, 0, 0, 0, 0, 0, 1, 1], 3)).toBe(5);
		expect(minMoves([1, 1, 0, 1], 2)).toBe(0);
	});

	it("matches a breadth-first search on random inputs", () => {
		const random = createRandom(1703);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 10), 0, 1);
			const ones = nums.filter((num) => num === 1).length;
			if (ones === 0) continue;
			const k = random.int(1, ones);
			expect(minMoves(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
