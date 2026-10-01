import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { makeTheXorOfAllSegmentsEqualToZero as minChanges } from ".";

/** Tries every choice of the first k − 1 values (below 8); the last is forced. */
const byBruteForce = (nums: number[], k: number): number => {
	let best = Infinity;
	for (let code = 0; code < 8 ** (k - 1); code++) {
		const chosen = Array.from(
			{ length: k - 1 },
			(_, i) => Math.floor(code / 8 ** i) % 8,
		);
		chosen.push(chosen.reduce((x, v) => x ^ v, 0));
		const changes = nums.filter((value, i) => value !== chosen[i % k]).length;
		best = Math.min(best, changes);
	}
	return best;
};

describe("1787. Make the XOR of All Segments Equal to Zero", () => {
	it("solves the examples from the problem statement", () => {
		expect(minChanges([1, 2, 0, 3, 0], 1)).toBe(3);
		expect(minChanges([3, 4, 5, 2, 1, 7, 3, 4, 7], 3)).toBe(3);
		expect(minChanges([1, 2, 4, 1, 2, 5, 1, 2, 6], 3)).toBe(3);
	});

	it("matches trying every periodic array on random inputs", () => {
		const random = createRandom(1787);
		for (let run = 0; run < 150; run++) {
			const nums = random.array(random.int(1, 10), 0, 7);
			const k = random.int(1, Math.min(4, nums.length));
			expect(minChanges(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
