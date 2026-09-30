import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumNumberOfBalloons as maxNumberOfBalloons } from ".";

/** Crosses off one "balloon" at a time until it can't. */
const byBruteForce = (text: string): number => {
	const left = [...text];
	for (let count = 0; ; count++) {
		for (const char of "balloon") {
			const i = left.indexOf(char);
			if (i === -1) return count;
			left.splice(i, 1);
		}
	}
};

describe("1189. Maximum Number of Balloons", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxNumberOfBalloons("nlaebolko")).toBe(1);
		expect(maxNumberOfBalloons("loonbalxballpoon")).toBe(2);
		expect(maxNumberOfBalloons("leetcode")).toBe(0);
	});

	it("matches crossing off letters on random inputs", () => {
		const random = createRandom(1189);
		for (let run = 0; run < 300; run++) {
			const text = random.string(random.int(1, 40), "balonx");
			expect(maxNumberOfBalloons(text)).toBe(byBruteForce(text));
		}
	});
});
