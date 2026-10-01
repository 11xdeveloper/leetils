import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumAddToMakeParenthesesValid as minAddToMakeValid } from ".";

describe("921. Minimum Add to Make Parentheses Valid", () => {
	it("solves the examples from the problem statement", () => {
		expect(minAddToMakeValid("())")).toBe(1);
		expect(minAddToMakeValid("(((")).toBe(3);
	});

	it("matches removing matched pairs until none are left on random strings", () => {
		const random = createRandom(921);
		for (let run = 0; run < 1000; run++) {
			let s = random.string(random.int(1, 15), "()");
			const original = s;
			while (s.includes("()")) s = s.replaceAll("()", "");
			expect(minAddToMakeValid(original)).toBe(s.length);
		}
	});
});
