import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { loudAndRich } from ".";

/** Searches from each person upwards through everyone known to be richer. */
const byBruteForce = (richer: number[][], quiet: number[]): number[] =>
	quiet.map((_, x) => {
		const seen = new Set([x]);
		const queue = [x];
		for (const person of queue) {
			for (const [a = 0, b] of richer) {
				if (b === person && !seen.has(a)) {
					seen.add(a);
					queue.push(a);
				}
			}
		}
		return [...seen].reduce((best, person) =>
			(quiet[person] ?? 0) < (quiet[best] ?? 0) ? person : best,
		);
	});

describe("851. Loud and Rich", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			loudAndRich(
				[
					[1, 0],
					[2, 1],
					[3, 1],
					[3, 7],
					[4, 3],
					[5, 3],
					[6, 3],
				],
				[3, 2, 5, 4, 6, 1, 7, 0],
			),
		).toEqual([5, 5, 2, 5, 4, 5, 6, 7]);
		expect(loudAndRich([], [0])).toEqual([0]);
	});

	it("matches searching upwards from each person on random inputs", () => {
		const random = createRandom(851);
		for (let run = 0; run < 500; run++) {
			const n = random.int(1, 9);
			// Richer edges consistent with a random wealth order, so there are no cycles.
			const wealth = Array.from({ length: n }, (_, i) => i).sort(
				() => random.next() - 0.5,
			);
			const richer: number[][] = [];
			for (let i = 0; i < n; i++)
				for (let j = 0; j < n; j++)
					if ((wealth[i] ?? 0) > (wealth[j] ?? 0) && random.int(0, 3) === 0)
						richer.push([i, j]);
			const quiet = Array.from({ length: n }, (_, i) => i).sort(
				() => random.next() - 0.5,
			);
			expect(loudAndRich(richer, quiet)).toEqual(byBruteForce(richer, quiet));
		}
	});
});
