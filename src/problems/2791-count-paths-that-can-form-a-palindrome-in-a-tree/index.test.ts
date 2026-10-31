import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countPathsThatCanFormAPalindromeInATree as countPalindromePaths } from ".";

/** Collects every path's letters. */
const byBruteForce = (parent: number[], s: string): number => {
	const n = parent.length;
	const pathUp = (node: number): number[] => {
		const nodes = [node];
		while ((parent[nodes.at(-1) ?? 0] ?? -1) >= 0)
			nodes.push(parent[nodes.at(-1) ?? 0] ?? 0);
		return nodes;
	};
	let pairs = 0;
	for (let u = 0; u < n; u++)
		for (let v = u + 1; v < n; v++) {
			const up = pathUp(u);
			const vp = pathUp(v);
			const common = new Set(up.filter((x) => vp.includes(x)));
			const letters = [...up, ...vp]
				.filter((x) => !common.has(x))
				.map((x) => s.charAt(x));
			const counts = new Map<string, number>();
			for (const c of letters) counts.set(c, (counts.get(c) ?? 0) + 1);
			if ([...counts.values()].filter((c) => c % 2 === 1).length <= 1) pairs++;
		}
	return pairs;
};

describe("2791. Count Paths That Can Form a Palindrome in a Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(countPalindromePaths([-1, 0, 0, 1, 1, 2], "acaabc")).toBe(8);
		expect(countPalindromePaths([-1, 0, 0, 0, 0], "zzzzz")).toBe(10);
	});

	it("matches collecting every path on random trees", () => {
		const random = createRandom(2791);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 9);
			const parent = Array.from({ length: n }, (_, i) =>
				i === 0 ? -1 : random.int(0, i - 1),
			);
			const s = random.string(n, "abc");
			expect(countPalindromePaths(parent, s)).toBe(byBruteForce(parent, s));
		}
	});
});
