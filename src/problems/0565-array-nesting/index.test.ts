import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { arrayNesting } from ".";

const byBruteForce = (nums: number[]): number =>
	Math.max(
		...nums.map((_, k) => {
			const set = new Set<number>();
			for (let value = nums[k] ?? 0; !set.has(value); value = nums[value] ?? 0)
				set.add(value);
			return set.size;
		}),
	);

describe("565. Array Nesting", () => {
	it("solves the examples from the problem statement", () => {
		expect(arrayNesting([5, 4, 0, 3, 1, 6, 2])).toBe(4);
		expect(arrayNesting([0, 1, 2])).toBe(1);
	});

	it("matches building every set on random permutations", () => {
		const random = createRandom(565);
		for (let run = 0; run < 500; run++) {
			const nums = Array.from({ length: random.int(1, 15) }, (_, i) => i).sort(
				() => random.next() - 0.5,
			);
			expect(arrayNesting(nums)).toBe(byBruteForce(nums));
		}
	});
});
