import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumTimeToRemoveAllCarsContainingIllegalGoods as minimumTime } from ".";

/** Tries every prefix and suffix to remove from the ends. */
const byBruteForce = (s: string): number => {
	let best = Infinity;
	for (let i = 0; i <= s.length; i++) {
		for (let j = i; j <= s.length; j++) {
			const middle = s.slice(i, j).split("1").length - 1;
			best = Math.min(best, i + (s.length - j) + 2 * middle);
		}
	}
	return best;
};

describe("2167. Minimum Time to Remove All Cars Containing Illegal Goods", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumTime("1100101")).toBe(5);
		expect(minimumTime("0010")).toBe(2);
	});

	it("matches trying every split on random trains", () => {
		const random = createRandom(2167);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 15), "01");
			expect(minimumTime(s)).toBe(byBruteForce(s));
		}
	});
});
