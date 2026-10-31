import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { checkIfAParenthesesStringCanBeValid as canBeValid } from ".";

/** Tries every choice for the unlocked characters. */
const byBruteForce = (s: string, locked: string): boolean => {
	const free = [...locked].flatMap((bit, i) => (bit === "0" ? [i] : []));
	for (let mask = 0; mask < 1 << free.length; mask++) {
		const chars = [...s];
		for (const [b, i] of free.entries()) chars[i] = mask & (1 << b) ? "(" : ")";
		let balance = 0;
		for (const char of chars) {
			balance += char === "(" ? 1 : -1;
			if (balance < 0) break;
		}
		if (balance === 0) return true;
	}
	return false;
};

describe("2116. Check if a Parentheses String Can Be Valid", () => {
	it("solves the examples from the problem statement", () => {
		expect(canBeValid("))()))", "010100")).toBeTrue();
		expect(canBeValid("()()", "0000")).toBeTrue();
		expect(canBeValid(")", "0")).toBeFalse();
	});

	it("matches trying every choice on random strings", () => {
		const random = createRandom(2116);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 10);
			const s = random.string(n, "()");
			const locked = random.string(n, "01");
			expect(canBeValid(s, locked)).toBe(byBruteForce(s, locked));
		}
	});
});
