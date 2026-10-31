import { describe, expect, it } from "bun:test";
import { frequenciesOfShortestSupersequences as supersequences } from ".";

const pick = (counts: Record<string, number>): number[] => {
	const freq = new Array<number>(26).fill(0);
	for (const [letter, count] of Object.entries(counts))
		freq[letter.charCodeAt(0) - 97] = count;
	return freq;
};
const sorted = (arrays: number[][]) => arrays.map((a) => a.join()).sort();

describe("3435. Frequencies of Shortest Supersequences", () => {
	it("solves the examples from the problem statement", () => {
		expect(sorted(supersequences(["ab", "ba"]))).toEqual(
			sorted([pick({ a: 1, b: 2 }), pick({ a: 2, b: 1 })]),
		);
		expect(sorted(supersequences(["aa", "ac"]))).toEqual(
			sorted([pick({ a: 2, c: 1 })]),
		);
		expect(sorted(supersequences(["aa", "bb", "cc"]))).toEqual(
			sorted([pick({ a: 2, b: 2, c: 2 })]),
		);
	});

	it("needs nothing doubled without cycles", () => {
		expect(sorted(supersequences(["ab", "bc"]))).toEqual(
			sorted([pick({ a: 1, b: 1, c: 1 })]),
		);
	});
});
