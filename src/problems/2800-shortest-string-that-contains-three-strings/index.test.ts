import { describe, expect, it } from "bun:test";
import { createRandom, stringsUpTo } from "../../testing/random";
import { shortestStringThatContainsThreeStrings as minimumString } from ".";

/** Scans strings by length, then alphabetically. */
const byBruteForce = (a: string, b: string, c: string): string => {
	const candidates = stringsUpTo(
		["a", "b"],
		a.length + b.length + c.length,
	).sort((x, y) => x.length - y.length || (x < y ? -1 : x > y ? 1 : 0));
	return (
		candidates.find((s) => s.includes(a) && s.includes(b) && s.includes(c)) ??
		""
	);
};

describe("2800. Shortest String That Contains Three Strings", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumString("abc", "bca", "aaa")).toBe("aaabca");
		expect(minimumString("ab", "ba", "aba")).toBe("aba");
	});

	it("matches scanning every string on random inputs", () => {
		const random = createRandom(2800);
		for (let run = 0; run < 100; run++) {
			const [a, b, c] = [0, 1, 2].map(() =>
				random.string(random.int(1, 3), "ab"),
			);
			expect(minimumString(a ?? "", b ?? "", c ?? "")).toBe(
				byBruteForce(a ?? "", b ?? "", c ?? ""),
			);
		}
	});
});
