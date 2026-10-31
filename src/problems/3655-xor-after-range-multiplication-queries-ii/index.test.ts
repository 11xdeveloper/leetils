import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { xorAfterRangeMultiplicationQueriesI } from "../3653-xor-after-range-multiplication-queries-i";
import { xorAfterRangeMultiplicationQueriesII as xorAfterQueries } from ".";

describe("3655. XOR After Range Multiplication Queries II", () => {
	it("solves the examples from the problem statement", () => {
		expect(xorAfterQueries([1, 1, 1], [[0, 2, 1, 4]])).toBe(4);
		expect(
			xorAfterQueries(
				[2, 3, 1, 5, 4],
				[
					[1, 4, 2, 3],
					[0, 2, 1, 2],
				],
			),
		).toBe(31);
	});

	it("matches applying queries directly on random input", () => {
		const random = createRandom(3655);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 30), 1, 1_000_000_000);
			const queries = Array.from({ length: random.int(1, 20) }, () => {
				const l = random.int(0, nums.length - 1);
				return [
					l,
					random.int(l, nums.length - 1),
					random.int(1, 8),
					random.int(1, 100_000),
				];
			});
			expect(xorAfterQueries(nums, queries)).toBe(
				xorAfterRangeMultiplicationQueriesI(nums, queries),
			);
		}
	});
});
