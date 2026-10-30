import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { beautifulTowersI } from "../2865-beautiful-towers-i";
import { beautifulTowersII as maximumSumOfHeights } from ".";

describe("2866. Beautiful Towers II", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumSumOfHeights([5, 3, 4, 1, 1])).toBe(13);
		expect(maximumSumOfHeights([6, 5, 3, 9, 2, 7])).toBe(22);
		expect(maximumSumOfHeights([3, 2, 5, 5, 2, 3])).toBe(18);
	});

	it("matches trying every peak on random inputs", () => {
		const random = createRandom(2866);
		for (let run = 0; run < 300; run++) {
			const heights = random.array(random.int(1, 12), 1, 10);
			expect(maximumSumOfHeights(heights)).toBe(beautifulTowersI(heights));
		}
	});
});
