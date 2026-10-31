import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countTheNumberOfSubstringsWithDominantOnes as numberOfSubstrings } from ".";

/** Checks every substring. */
const byBruteForce = (s: string): number => {
	let count = 0;
	for (let i = 0; i < s.length; i++) {
		let ones = 0;
		let zeros = 0;
		for (let j = i; j < s.length; j++) {
			if (s[j] === "1") ones++;
			else zeros++;
			if (ones >= zeros * zeros) count++;
		}
	}
	return count;
};

describe("3234. Count the Number of Substrings With Dominant Ones", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfSubstrings("00011")).toBe(5);
		expect(numberOfSubstrings("101101")).toBe(16);
	});

	it("matches checking every substring on random strings", () => {
		const random = createRandom(3234);
		for (let run = 0; run < 300; run++) {
			const s = random.string(
				random.int(1, 30),
				random.int(0, 1) ? "01" : "0111",
			);
			expect(numberOfSubstrings(s)).toBe(byBruteForce(s));
		}
	});
});
