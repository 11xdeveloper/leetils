import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumScoreAfterSplittingAString as maxScore } from ".";

describe("1422. Maximum Score After Splitting a String", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxScore("011101")).toBe(5);
		expect(maxScore("00111")).toBe(5);
		expect(maxScore("1111")).toBe(3);
	});

	it("matches scoring every split on random inputs", () => {
		const random = createRandom(1422);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(2, 15), "01");
			let best = 0;
			for (let i = 1; i < s.length; i++) {
				best = Math.max(
					best,
					s.slice(0, i).split("0").length -
						1 +
						s.slice(i).split("1").length -
						1,
				);
			}
			expect(maxScore(s)).toBe(best);
		}
	});
});
