import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestPalindromicPathInGraph as maxLen } from ".";

/** Walks every simple path. */
const byBruteForce = (n: number, edges: number[][], label: string): number => {
	const adjacent: number[][] = Array.from({ length: n }, () => []);
	for (const [u = 0, v = 0] of edges) {
		adjacent[u]?.push(v);
		adjacent[v]?.push(u);
	}
	let best = 0;
	const walk = (v: number, path: number[]): void => {
		const word = path.map((x) => label[x]).join("");
		if (word === [...word].reverse().join(""))
			best = Math.max(best, path.length);
		for (const to of adjacent[v] ?? [])
			if (!path.includes(to)) walk(to, [...path, to]);
	};
	for (let v = 0; v < n; v++) walk(v, [v]);
	return best;
};

describe("3615. Longest Palindromic Path in Graph", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxLen(
				3,
				[
					[0, 1],
					[1, 2],
				],
				"aba",
			),
		).toBe(3);
		expect(
			maxLen(
				3,
				[
					[0, 1],
					[0, 2],
				],
				"abc",
			),
		).toBe(1);
		expect(
			maxLen(
				4,
				[
					[0, 2],
					[0, 3],
					[3, 1],
				],
				"bbac",
			),
		).toBe(3);
	});

	it("matches walking every path on random graphs", () => {
		const random = createRandom(3615);
		for (let run = 0; run < 150; run++) {
			const n = random.int(1, 7);
			const edges: number[][] = [];
			for (let u = 0; u < n; u++)
				for (let v = u + 1; v < n; v++)
					if (random.int(0, 2) === 0) edges.push([u, v]);
			const label = random.string(n, "ab");
			expect(maxLen(n, edges, label)).toBe(byBruteForce(n, edges, label));
		}
	});
});
