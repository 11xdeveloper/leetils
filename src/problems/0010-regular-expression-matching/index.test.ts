import { describe, expect, it } from "bun:test";
import { regularExpressionMatching } from ".";

/** Every string made of `alphabet` up to `maxLength` characters long. */
const stringsUpTo = (alphabet: string[], maxLength: number): string[] => {
	const all = [""];
	let previous = [""];
	for (let length = 1; length <= maxLength; length++) {
		previous = previous.flatMap((s) => alphabet.map((char) => s + char));
		all.push(...previous);
	}
	return all;
};

describe("10. Regular Expression Matching", () => {
	it("solves the examples from the problem statement", () => {
		expect(regularExpressionMatching("aa", "a")).toBe(false);
		expect(regularExpressionMatching("aa", "a*")).toBe(true);
		expect(regularExpressionMatching("ab", ".*")).toBe(true);
	});

	it("matches the whole string, not a substring", () => {
		expect(regularExpressionMatching("ab", "a")).toBe(false);
		expect(regularExpressionMatching("ab", ".*c")).toBe(false);
	});

	it("lets x* match zero characters", () => {
		expect(regularExpressionMatching("aab", "c*a*b")).toBe(true);
		expect(regularExpressionMatching("b", "a*b")).toBe(true);
		expect(regularExpressionMatching("", "a*b*")).toBe(true);
	});

	it("handles classic tricky cases", () => {
		expect(regularExpressionMatching("mississippi", "mis*is*p*.")).toBe(false);
		expect(regularExpressionMatching("mississippi", "mis*is*ip*.")).toBe(true);
		expect(regularExpressionMatching("aaa", "a*a")).toBe(true);
		expect(regularExpressionMatching("aaa", "ab*a*c*a")).toBe(true);
		expect(regularExpressionMatching("a", "ab*")).toBe(true);
	});

	it("agrees with JavaScript's RegExp on every small input", () => {
		const strings = stringsUpTo(["a", "b"], 4);
		const patterns = stringsUpTo(["a", "b", ".", "a*", "b*", ".*"], 3);
		for (const p of patterns) {
			const regex = new RegExp(`^(?:${p})$`);
			for (const s of strings) {
				expect(regularExpressionMatching(s, p)).toBe(regex.test(s));
			}
		}
	});
});
