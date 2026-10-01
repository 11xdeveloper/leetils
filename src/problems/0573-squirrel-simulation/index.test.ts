import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { squirrelSimulation as minDistance } from ".";

/** Tries every nut first, walking it and then every other nut via the tree. */
const byBruteForce = (
	tree: number[],
	squirrel: number[],
	nuts: number[][],
): number => {
	const distance = (a: number[], b: number[]) =>
		Math.abs((a[0] ?? 0) - (b[0] ?? 0)) + Math.abs((a[1] ?? 0) - (b[1] ?? 0));
	return Math.min(
		...nuts.map(
			(first, i) =>
				distance(squirrel, first) +
				distance(first, tree) +
				nuts.reduce(
					(total, nut, j) =>
						i === j ? total : total + 2 * distance(nut, tree),
					0,
				),
		),
	);
};

describe("573. Squirrel Simulation", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minDistance(
				5,
				7,
				[2, 2],
				[4, 4],
				[
					[3, 0],
					[2, 5],
				],
			),
		).toBe(12);
		expect(minDistance(1, 3, [0, 1], [0, 0], [[0, 2]])).toBe(3);
	});

	it("matches trying every first nut on random gardens", () => {
		const random = createRandom(573);
		for (let run = 0; run < 1000; run++) {
			const point = () => [random.int(0, 9), random.int(0, 9)];
			const tree = point();
			const squirrel = point();
			const nuts = Array.from({ length: random.int(1, 6) }, point);
			expect(minDistance(10, 10, tree, squirrel, nuts)).toBe(
				byBruteForce(tree, squirrel, nuts),
			);
		}
	});
});
