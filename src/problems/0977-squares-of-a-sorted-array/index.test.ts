import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { squaresOfASortedArray as sortedSquares } from ".";

describe("977. Squares of a Sorted Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(sortedSquares([-4, -1, 0, 3, 10])).toEqual([0, 1, 9, 16, 100]);
		expect(sortedSquares([-7, -3, 2, 3, 11])).toEqual([4, 9, 9, 49, 121]);
	});

	it("matches squaring then sorting on random inputs", () => {
		const random = createRandom(977);
		for (let run = 0; run < 1000; run++) {
			const nums = random
				.array(random.int(1, 15), -20, 20)
				.sort((a, b) => a - b);
			expect(sortedSquares(nums)).toEqual(
				nums.map((x) => x * x).sort((a, b) => a - b),
			);
		}
	});
});
