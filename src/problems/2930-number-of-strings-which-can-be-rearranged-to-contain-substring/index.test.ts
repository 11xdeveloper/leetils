import { describe, expect, it } from "bun:test";
import { numberOfStringsWhichCanBeRearrangedToContainSubstring as stringCount } from ".";

/** Counts letter tallies with a DP over (l seen, e count, t seen). */
const byBruteForce = (n: number): number => {
	let ways = new Map([["0,0,0", 1n]]);
	for (let i = 0; i < n; i++) {
		const next = new Map<string, bigint>();
		for (const [key, count] of ways) {
			const [l = 0, e = 0, t = 0] = key.split(",").map(Number);
			const add = (k: string, c: bigint) =>
				next.set(k, (next.get(k) ?? 0n) + c);
			add(`${1},${e},${t}`, count);
			add(`${l},${Math.min(2, e + 1)},${t}`, count);
			add(`${l},${e},${1}`, count);
			add(`${l},${e},${t}`, count * 23n);
		}
		ways = next;
	}
	return Number((ways.get("1,2,1") ?? 0n) % 1_000_000_007n);
};

describe("2930. Number of Strings Which Can Be Rearranged to Contain Substring", () => {
	it("solves the examples from the problem statement", () => {
		expect(stringCount(4)).toBe(12);
		expect(stringCount(10)).toBe(83943898);
	});

	it("matches a DP over letter tallies", () => {
		for (let n = 1; n <= 30; n++) expect(stringCount(n)).toBe(byBruteForce(n));
	});
});
