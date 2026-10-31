import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { blockPlacementQueries as getResults } from ".";

/** Scans the sorted obstacles for every query. */
const byBruteForce = (queries: number[][]): boolean[] => {
	const obstacles = [0];
	const answers: boolean[] = [];
	for (const [type = 0, x = 0, size = 0] of queries) {
		if (type === 1) {
			obstacles.push(x);
			obstacles.sort((a, b) => a - b);
			continue;
		}
		let best = 0;
		let last = 0;
		for (const p of obstacles) {
			if (p > x) break;
			best = Math.max(best, p - last);
			last = p;
		}
		answers.push(Math.max(best, x - last) >= size);
	}
	return answers;
};

describe("3161. Block Placement Queries", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			getResults([
				[1, 2],
				[2, 3, 3],
				[2, 3, 1],
				[2, 2, 2],
			]),
		).toEqual([false, true, true]);
		expect(
			getResults([
				[1, 7],
				[2, 7, 6],
				[1, 2],
				[2, 7, 5],
				[2, 7, 6],
			]),
		).toEqual([true, true, false]);
	});

	it("matches scanning obstacles on random queries", () => {
		const random = createRandom(3161);
		for (let run = 0; run < 300; run++) {
			const used = new Set<number>();
			const queries: number[][] = [];
			for (let i = random.int(1, 12); i > 0; i--) {
				const x = random.int(1, 15);
				if (random.int(0, 1) === 0 && !used.has(x)) {
					used.add(x);
					queries.push([1, x]);
				} else queries.push([2, x, random.int(1, x)]);
			}
			expect(getResults(queries)).toEqual(byBruteForce(queries));
		}
	});
});
