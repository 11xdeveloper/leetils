import { describe, expect, it } from "bun:test";
import { checkDistancesBetweenSameLetters as checkDistances } from ".";

const distances = (pairs: Record<string, number>): number[] =>
	Array.from({ length: 26 }, (_, i) => pairs[String.fromCharCode(97 + i)] ?? 0);

describe("2399. Check Distances Between Same Letters", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			checkDistances("abaccb", distances({ a: 1, b: 3, d: 5 })),
		).toBeTrue();
		expect(checkDistances("aa", distances({ a: 1 }))).toBeFalse();
	});
});
