import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumOperationsToConvertAllElementsToZero as minOperations } from ".";

/** Breadth-first search over arrays. */
const byBruteForce = (nums: number[]): number => {
	const seen = new Set([nums.join()]);
	let frontier = [nums];
	for (let steps = 0; ; steps++) {
		if (frontier.some((arr) => arr.every((v) => v === 0))) return steps;
		const next: number[][] = [];
		for (const arr of frontier)
			for (let i = 0; i < arr.length; i++)
				for (let j = i; j < arr.length; j++) {
					const min = Math.min(...arr.slice(i, j + 1));
					const changed = arr.map((v, t) =>
						t >= i && t <= j && v === min ? 0 : v,
					);
					if (!seen.has(changed.join())) {
						seen.add(changed.join());
						next.push(changed);
					}
				}
		frontier = next;
	}
};

describe("3542. Minimum Operations to Convert All Elements to Zero", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([0, 2])).toBe(1);
		expect(minOperations([3, 1, 2, 1])).toBe(3);
		expect(minOperations([1, 2, 1, 2, 1, 2])).toBe(4);
	});

	it("matches searching every operation on random arrays", () => {
		const random = createRandom(3542);
		for (let run = 0; run < 100; run++) {
			const nums = random.array(random.int(1, 6), 0, 3);
			expect(minOperations(nums)).toBe(byBruteForce(nums));
		}
	});
});
