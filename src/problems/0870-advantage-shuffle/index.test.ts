import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { permutations } from "../0046-permutations";
import { advantageShuffle as advantageCount } from ".";

const advantage = (a: number[], b: number[]): number =>
	a.filter((value, i) => value > (b[i] ?? 0)).length;

describe("870. Advantage Shuffle", () => {
	it("solves the examples from the problem statement", () => {
		expect(advantageCount([2, 7, 11, 15], [1, 10, 4, 11])).toEqual([
			2, 11, 7, 15,
		]);
		expect(
			advantage(
				advantageCount([12, 24, 8, 32], [13, 25, 32, 11]),
				[13, 25, 32, 11],
			),
		).toBe(3);
	});

	it("reaches the best advantage of any rearrangement on random inputs", () => {
		const random = createRandom(870);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 6);
			const nums1 = random.array(n, 0, 8);
			const nums2 = random.array(n, 0, 8);
			const result = advantageCount(nums1, nums2);
			expect(result.toSorted((a, b) => a - b)).toEqual(
				nums1.toSorted((a, b) => a - b),
			);
			expect(advantage(result, nums2)).toBe(
				Math.max(...permutations(nums1).map((p) => advantage(p, nums2))),
			);
		}
	});
});
