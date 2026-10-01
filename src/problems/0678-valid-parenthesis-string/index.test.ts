import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { validParenthesisString as checkValidString } from ".";

/** Tries every reading of each *. */
const byBruteForce = (s: string): boolean => {
	const search = (i: number, open: number): boolean => {
		if (open < 0) return false;
		if (i === s.length) return open === 0;
		const char = s.charAt(i);
		if (char === "(") return search(i + 1, open + 1);
		if (char === ")") return search(i + 1, open - 1);
		return (
			search(i + 1, open + 1) || search(i + 1, open - 1) || search(i + 1, open)
		);
	};
	return search(0, 0);
};

describe("678. Valid Parenthesis String", () => {
	it("solves the examples from the problem statement", () => {
		expect(checkValidString("()")).toBeTrue();
		expect(checkValidString("(*)")).toBeTrue();
		expect(checkValidString("(*))")).toBeTrue();
	});

	it("matches trying every reading on random strings", () => {
		const random = createRandom(678);
		for (let run = 0; run < 1000; run++) {
			const s = random.string(random.int(1, 10), "()*");
			expect(checkValidString(s)).toBe(byBruteForce(s));
		}
	});
});
