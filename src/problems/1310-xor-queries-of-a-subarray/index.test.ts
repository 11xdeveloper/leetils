import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { xorQueriesOfASubarray as xorQueries } from ".";

describe("1310. XOR Queries of a Subarray", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			xorQueries(
				[1, 3, 4, 8],
				[
					[0, 1],
					[1, 2],
					[0, 3],
					[3, 3],
				],
			),
		).toEqual([2, 7, 14, 8]);
		expect(
			xorQueries(
				[4, 8, 2, 10],
				[
					[2, 3],
					[1, 3],
					[0, 0],
					[0, 3],
				],
			),
		).toEqual([8, 0, 4, 4]);
	});

	it("matches XORing each range on random inputs", () => {
		const random = createRandom(1310);
		for (let run = 0; run < 200; run++) {
			const arr = random.array(random.int(1, 12), 1, 10 ** 9);
			const queries = Array.from({ length: 5 }, () => {
				const [a, b] = [
					random.int(0, arr.length - 1),
					random.int(0, arr.length - 1),
				];
				return [Math.min(a, b), Math.max(a, b)];
			});
			expect(xorQueries(arr, queries)).toEqual(
				queries.map(([l = 0, r = 0]) =>
					arr.slice(l, r + 1).reduce((x, v) => x ^ v, 0),
				),
			);
		}
	});
});
