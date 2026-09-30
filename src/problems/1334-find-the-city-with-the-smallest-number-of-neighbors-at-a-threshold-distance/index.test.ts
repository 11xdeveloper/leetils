import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheCityWithTheSmallestNumberOfNeighborsAtAThresholdDistance as findTheCity } from ".";

/** Bellman–Ford from each city. */
const byBruteForce = (
	n: number,
	edges: number[][],
	threshold: number,
): number => {
	let [best, fewest] = [0, Infinity];
	for (let city = 0; city < n; city++) {
		const distance = Array.from({ length: n }, (_, j) =>
			j === city ? 0 : Infinity,
		);
		for (let round = 0; round < n; round++) {
			for (const [a = 0, b = 0, w = 0] of edges) {
				distance[b] = Math.min(
					distance[b] ?? Infinity,
					(distance[a] ?? Infinity) + w,
				);
				distance[a] = Math.min(
					distance[a] ?? Infinity,
					(distance[b] ?? Infinity) + w,
				);
			}
		}
		const reachable = distance.filter(
			(d, j) => j !== city && d <= threshold,
		).length;
		if (reachable <= fewest) [best, fewest] = [city, reachable];
	}
	return best;
};

describe("1334. Find the City With the Smallest Number of Neighbors at a Threshold Distance", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findTheCity(
				4,
				[
					[0, 1, 3],
					[1, 2, 1],
					[1, 3, 4],
					[2, 3, 1],
				],
				4,
			),
		).toBe(3);
		expect(
			findTheCity(
				5,
				[
					[0, 1, 2],
					[0, 4, 8],
					[1, 2, 3],
					[1, 4, 2],
					[2, 3, 1],
					[3, 4, 1],
				],
				2,
			),
		).toBe(0);
	});

	it("matches Bellman–Ford from each city on random graphs", () => {
		const random = createRandom(1334);
		for (let run = 0; run < 200; run++) {
			const n = random.int(2, 7);
			const edges: number[][] = [];
			for (let a = 0; a < n; a++) {
				for (let b = a + 1; b < n; b++)
					if (random.next() < 0.4) edges.push([a, b, random.int(1, 10)]);
			}
			if (edges.length === 0) edges.push([0, 1, 5]);
			const threshold = random.int(1, 15);
			expect(findTheCity(n, edges, threshold)).toBe(
				byBruteForce(n, edges, threshold),
			);
		}
	});
});
