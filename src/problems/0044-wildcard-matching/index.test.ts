import { describe, expect, it } from "bun:test";
import { wildcardMatching } from ".";

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

const toRegExp = (p: string): RegExp =>
	new RegExp(`^${p.replaceAll("?", ".").replaceAll("*", ".*")}$`);

describe("44. Wildcard Matching", () => {
	it("solves the examples from the problem statement", () => {
		expect(wildcardMatching("aa", "a")).toBe(false);
		expect(wildcardMatching("aa", "*")).toBe(true);
		expect(wildcardMatching("cb", "?a")).toBe(false);
	});

	it("handles empty strings and patterns", () => {
		expect(wildcardMatching("", "")).toBe(true);
		expect(wildcardMatching("", "***")).toBe(true);
		expect(wildcardMatching("", "?")).toBe(false);
		expect(wildcardMatching("a", "")).toBe(false);
	});

	it("backtracks to the most recent star", () => {
		expect(wildcardMatching("adceb", "*a*b")).toBe(true);
		expect(wildcardMatching("acdcb", "a*c?b")).toBe(false);
		expect(wildcardMatching("abcabczzzde", "*abc???de*")).toBe(true);
	});

	it("handles long inputs that force a lot of backtracking", () => {
		expect(wildcardMatching("a".repeat(2000), `*${"a*".repeat(500)}b`)).toBe(
			false,
		);
		expect(
			wildcardMatching(`${"a".repeat(2000)}b`, `*${"a*".repeat(500)}b`),
		).toBe(true);
	});

	it("agrees with an equivalent RegExp on every small input", () => {
		const strings = stringsUpTo(["a", "b"], 5);
		const patterns = stringsUpTo(["a", "b", "?", "*"], 4);
		for (const p of patterns) {
			const regex = toRegExp(p);
			for (const s of strings) {
				expect(wildcardMatching(s, p)).toBe(regex.test(s));
			}
		}
	});
});
