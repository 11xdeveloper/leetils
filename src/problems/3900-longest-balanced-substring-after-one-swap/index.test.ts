import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestBalancedSubstringAfterOneSwap as longestBalanced } from ".";

/** Tries every swap and every substring. */
const byBruteForce = (s: string): number => {
	const longest = (t: string) => {
		let best = 0;
		for (let i = 0; i < t.length; i++) {
			let balance = 0;
			for (let j = i; j < t.length; j++) {
				balance += t[j] === "1" ? 1 : -1;
				if (balance === 0) best = Math.max(best, j - i + 1);
			}
		}
		return best;
	};
	let best = longest(s);
	for (let i = 0; i < s.length; i++)
		for (let j = i + 1; j < s.length; j++) {
			const chars = [...s];
			[chars[i], chars[j]] = [chars[j] ?? "", chars[i] ?? ""];
			best = Math.max(best, longest(chars.join("")));
		}
	return best;
};

describe("3900. Longest Balanced Substring After One Swap", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestBalanced("100001")).toBe(4);
		expect(longestBalanced("111")).toBe(0);
	});

	it("matches trying every swap on random strings", () => {
		const random = createRandom(3900);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 12), "01");
			expect(longestBalanced(s)).toBe(byBruteForce(s));
		}
	});
});
