import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { replaceTheSubstringForBalancedString as balancedString } from ".";

/** Checks every substring, shortest first. */
const byBruteForce = (s: string): number => {
	const quota = s.length / 4;
	for (let length = 0; length <= s.length; length++) {
		for (let i = 0; i + length <= s.length; i++) {
			const rest = s.slice(0, i) + s.slice(i + length);
			if ([..."QWER"].every((char) => rest.split(char).length - 1 <= quota))
				return length;
		}
	}
	return s.length;
};

describe("1234. Replace the Substring for Balanced String", () => {
	it("solves the examples from the problem statement", () => {
		expect(balancedString("QWER")).toBe(0);
		expect(balancedString("QQWE")).toBe(1);
		expect(balancedString("QQQW")).toBe(2);
	});

	it("handles a string of one letter", () => {
		expect(balancedString("Q".repeat(400))).toBe(300);
	});

	it("matches checking every substring on random inputs", () => {
		const random = createRandom(1234);
		for (let run = 0; run < 300; run++) {
			const s = random.string(4 * random.int(1, 4), "QWER");
			expect(balancedString(s)).toBe(byBruteForce(s));
		}
	});
});
