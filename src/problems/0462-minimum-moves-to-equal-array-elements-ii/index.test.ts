import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumMovesToEqualArrayElementsII as minMoves2 } from ".";

/** Tries every value as the target; one of them is optimal. */
const byBruteForce = (nums: number[]): number =>
	Math.min(
		...nums.map((target) =>
			nums.reduce((total, num) => total + Math.abs(num - target), 0),
		),
	);

describe("462. Minimum Moves to Equal Array Elements II", () => {
	it("solves the examples from the problem statement", () => {
		expect(minMoves2([1, 2, 3])).toBe(2);
		expect(minMoves2([1, 10, 2, 9])).toBe(16);
	});

	it("matches trying every target on random inputs", () => {
		const random = createRandom(462);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 10), -20, 20);
			expect(minMoves2(nums)).toBe(byBruteForce(nums));
		}
	});
});
