import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { checkIfDfsStringsArePalindromes as findAnswer } from ".";

/** Builds every node's DFS string directly. */
const byBruteForce = (parent: number[], s: string): boolean[] => {
	const children: number[][] = parent.map(() => []);
	parent.forEach((p, node) => {
		if (p >= 0) children[p]?.push(node);
	});
	const dfs = (node: number): string =>
		(children[node] ?? []).map(dfs).join("") + s.charAt(node);
	return parent.map((_, node) => {
		const str = dfs(node);
		return str === [...str].reverse().join("");
	});
};

describe("3327. Check if DFS Strings Are Palindromes", () => {
	it("solves the examples from the problem statement", () => {
		expect(findAnswer([-1, 0, 0, 1, 1, 2], "aababa")).toEqual([
			true,
			true,
			false,
			true,
			true,
			true,
		]);
		expect(findAnswer([-1, 0, 0, 0, 0], "aabcb")).toEqual([
			true,
			true,
			true,
			true,
			true,
		]);
	});

	it("matches building every DFS string on random trees", () => {
		const random = createRandom(3327);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 12);
			const parent = Array.from({ length: n }, (_, i) =>
				i === 0 ? -1 : random.int(0, i - 1),
			);
			const s = random.string(n, "ab");
			expect(findAnswer(parent, s)).toEqual(byBruteForce(parent, s));
		}
	});
});
