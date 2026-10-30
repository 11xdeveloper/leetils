import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumOperationsToMakeNumbersNonPositive as minOperations } from ".";

/** Breadth-first search over arrays. */
const byBruteForce = (nums: number[], x: number, y: number): number => {
	let level = [nums];
	for (let ops = 0; ; ops++) {
		if (level.some((arr) => arr.every((v) => v <= 0))) return ops;
		const seen = new Set<string>();
		const next: number[][] = [];
		for (const arr of level)
			for (let i = 0; i < arr.length; i++) {
				const after = arr.map((v, j) => Math.max(0, v - (i === j ? x : y)));
				const key = after.join(",");
				if (!seen.has(key)) {
					seen.add(key);
					next.push(after);
				}
			}
		level = next;
	}
};

describe("2702. Minimum Operations to Make Numbers Non-positive", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([3, 4, 1, 7, 6], 4, 2)).toBe(3);
		expect(minOperations([1, 2, 1], 2, 1)).toBe(1);
	});

	it("matches a breadth-first search on random inputs", () => {
		const random = createRandom(2702);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 4), 1, 12);
			const y = random.int(1, 3);
			const x = random.int(y + 1, 6);
			expect(minOperations(nums, x, y)).toBe(byBruteForce(nums, x, y));
		}
	});
});
