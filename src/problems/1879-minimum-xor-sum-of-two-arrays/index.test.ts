import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumXorSumOfTwoArrays as minimumXORSum } from ".";

describe("1879. Minimum XOR Sum of Two Arrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumXORSum([1, 2], [2, 3])).toBe(2);
		expect(minimumXORSum([1, 0, 3], [5, 3, 4])).toBe(8);
	});

	it("matches trying every permutation on random inputs", () => {
		const random = createRandom(1879);
		for (let run = 0; run < 100; run++) {
			const n = random.int(1, 6);
			const [a, b] = [random.array(n, 0, 30), random.array(n, 0, 30)];
			let best = Infinity;
			const permute = (left: number[], i: number, sum: number) => {
				if (left.length === 0) best = Math.min(best, sum);
				for (const [k, value] of left.entries())
					permute(
						left.filter((_, j) => j !== k),
						i + 1,
						sum + ((a[i] ?? 0) ^ value),
					);
			};
			permute(b, 0, 0);
			expect(minimumXORSum(a, b)).toBe(best);
		}
	});
});
