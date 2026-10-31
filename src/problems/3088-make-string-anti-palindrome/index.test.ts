import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { makeStringAntiPalindrome } from ".";

/** Tries every permutation. */
const byBruteForce = (s: string): string => {
	let best: string | undefined;
	const permute = (prefix: string, rest: string): void => {
		if (rest === "") {
			const n = prefix.length;
			if (
				[...prefix].every((c, i) => c !== prefix[n - 1 - i]) &&
				(best === undefined || prefix < best)
			)
				best = prefix;
			return;
		}
		for (let i = 0; i < rest.length; i++)
			if (rest.indexOf(rest.charAt(i)) === i)
				permute(prefix + rest.charAt(i), rest.slice(0, i) + rest.slice(i + 1));
	};
	permute("", s);
	return best ?? "-1";
};

describe("3088. Make String Anti-palindrome", () => {
	it("solves the examples from the problem statement", () => {
		expect(makeStringAntiPalindrome("abca")).toBe("aabc");
		expect(makeStringAntiPalindrome("abba")).toBe("aabb");
		expect(makeStringAntiPalindrome("cccd")).toBe("-1");
	});

	it("matches trying every permutation on random strings", () => {
		const random = createRandom(3088);
		for (let run = 0; run < 200; run++) {
			const s = random.string(2 * random.int(1, 4), "abc");
			expect(makeStringAntiPalindrome(s)).toBe(byBruteForce(s));
		}
	});
});
