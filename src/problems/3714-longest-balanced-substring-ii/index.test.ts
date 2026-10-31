import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestBalancedSubstringI } from "../3713-longest-balanced-substring-i";
import { longestBalancedSubstringII as longestBalanced } from ".";

describe("3714. Longest Balanced Substring II", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestBalanced("abbac")).toBe(4);
		expect(longestBalanced("aabcc")).toBe(3);
		expect(longestBalanced("aba")).toBe(2);
	});

	it("matches part I on random strings", () => {
		const random = createRandom(3714);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 15), "abc");
			expect(longestBalanced(s)).toBe(longestBalancedSubstringI(s));
		}
	});
});
