import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { checkIfWordIsValidAfterSubstitutions as isValid } from ".";

describe("1003. Check If Word Is Valid After Substitutions", () => {
	it("solves the examples from the problem statement", () => {
		expect(isValid("aabcbc")).toBeTrue();
		expect(isValid("abcabcababcc")).toBeTrue();
		expect(isValid("abccba")).toBeFalse();
	});

	it("matches removing abc repeatedly on random strings", () => {
		const random = createRandom(1003);
		for (let run = 0; run < 1000; run++) {
			let s = "";
			if (random.int(0, 1)) {
				for (let i = random.int(1, 5); i > 0; i--) {
					const at = random.int(0, s.length);
					s = `${s.slice(0, at)}abc${s.slice(at)}`;
				}
			} else {
				s = random.string(3 * random.int(1, 4), "abc");
			}
			let reduced = s;
			while (reduced.includes("abc")) reduced = reduced.replace("abc", "");
			expect(isValid(s)).toBe(reduced === "");
		}
	});
});
