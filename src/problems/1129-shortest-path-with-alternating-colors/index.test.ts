import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { shortestPathWithAlternatingColors as shortestAlternatingPaths } from ".";

/** Extends every alternating path one edge at a time, recording when each node is first reached. */
const byBruteForce = (
	n: number,
	red: number[][],
	blue: number[][],
): number[] => {
	const result = new Array<number>(n).fill(-1);
	const step = (edges: number[][], from: Set<number>) =>
		new Set(edges.filter(([a]) => from.has(a ?? -1)).map(([, b]) => b ?? 0));
	// The ends of paths of the current length whose last edge is red, and blue.
	let [endRed, endBlue] = [step(red, new Set([0])), step(blue, new Set([0]))];
	result[0] = 0;
	for (let length = 1; length <= 2 * n; length++) {
		for (const node of [...endRed, ...endBlue]) {
			if (result[node] === -1) result[node] = length;
		}
		[endRed, endBlue] = [step(red, endBlue), step(blue, endRed)];
	}
	return result;
};

describe("1129. Shortest Path with Alternating Colors", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			shortestAlternatingPaths(
				3,
				[
					[0, 1],
					[1, 2],
				],
				[],
			),
		).toEqual([0, 1, -1]);
		expect(shortestAlternatingPaths(3, [[0, 1]], [[2, 1]])).toEqual([0, 1, -1]);
	});

	it("handles self-loops that let the colour switch", () => {
		// 0 -red-> 1, then 1 -blue-> 1 and 1 -red-> 2 again.
		expect(
			shortestAlternatingPaths(
				3,
				[
					[0, 1],
					[1, 2],
				],
				[[1, 1]],
			),
		).toEqual([0, 1, 3]);
	});

	it("matches extending paths one edge at a time on random graphs", () => {
		const random = createRandom(1129);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 7);
			const edges = () =>
				Array.from({ length: random.int(0, 10) }, () =>
					random.array(2, 0, n - 1),
				);
			const [red, blue] = [edges(), edges()];
			expect(shortestAlternatingPaths(n, red, blue)).toEqual(
				byBruteForce(n, red, blue),
			);
		}
	});
});
