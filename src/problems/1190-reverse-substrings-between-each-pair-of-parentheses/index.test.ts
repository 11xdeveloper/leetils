import { describe, expect, it } from "bun:test";
import { createRandom, type Random } from "../../testing/random";
import { reverseSubstringsBetweenEachPairOfParentheses as reverseParentheses } from ".";

/** Reverses innermost pairs one at a time. */
const byBruteForce = (s: string): string => {
	let current = s;
	for (;;) {
		const next = current.replace(/\(([a-z]*)\)/, (_, inner: string) =>
			[...inner].reverse().join(""),
		);
		if (next === current) return current;
		current = next;
	}
};

const randomText = (random: Random, depth: number): string =>
	Array.from({ length: random.int(0, 3) }, () =>
		depth > 0 && random.next() < 0.4
			? `(${randomText(random, depth - 1)})`
			: random.string(1, "abc"),
	).join("");

describe("1190. Reverse Substrings Between Each Pair of Parentheses", () => {
	it("solves the examples from the problem statement", () => {
		expect(reverseParentheses("(abcd)")).toBe("dcba");
		expect(reverseParentheses("(u(love)i)")).toBe("iloveu");
		expect(reverseParentheses("(ed(et(oc))el)")).toBe("leetcode");
	});

	it("handles empty pairs and text outside", () => {
		expect(reverseParentheses("a()b")).toBe("ab");
		expect(reverseParentheses("ab(cd)ef")).toBe("abdcef");
	});

	it("matches reversing innermost pairs on random inputs", () => {
		const random = createRandom(1190);
		for (let run = 0; run < 300; run++) {
			const s = randomText(random, 4) || "a";
			expect(reverseParentheses(s)).toBe(byBruteForce(s));
		}
	});
});
