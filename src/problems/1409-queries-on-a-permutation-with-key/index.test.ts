import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { queriesOnAPermutationWithKey as processQueries } from ".";

/** Moves values around a real array. */
const byBruteForce = (queries: number[], m: number): number[] => {
	const p = Array.from({ length: m }, (_, i) => i + 1);
	return queries.map((value) => {
		const position = p.indexOf(value);
		p.splice(position, 1);
		p.unshift(value);
		return position;
	});
};

describe("1409. Queries on a Permutation With Key", () => {
	it("solves the examples from the problem statement", () => {
		expect(processQueries([3, 1, 2, 1], 5)).toEqual([2, 1, 2, 1]);
		expect(processQueries([4, 1, 2, 2], 4)).toEqual([3, 1, 2, 0]);
		expect(processQueries([7, 5, 5, 8, 3], 8)).toEqual([6, 5, 0, 7, 5]);
	});

	it("matches moving values in an array on random queries", () => {
		const random = createRandom(1409);
		for (let run = 0; run < 300; run++) {
			const m = random.int(1, 10);
			const queries = random.array(random.int(1, m), 1, m);
			expect(processQueries(queries, m)).toEqual(byBruteForce(queries, m));
		}
	});
});
