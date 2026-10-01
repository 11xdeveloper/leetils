import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sumOfEvenNumbersAfterQueries as sumEvenAfterQueries } from ".";

describe("985. Sum of Even Numbers After Queries", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			sumEvenAfterQueries(
				[1, 2, 3, 4],
				[
					[1, 0],
					[-3, 1],
					[-4, 0],
					[2, 3],
				],
			),
		).toEqual([8, 6, 2, 4]);
		expect(sumEvenAfterQueries([1], [[4, 0]])).toEqual([0]);
	});

	it("matches recomputing the sum after each query on random inputs", () => {
		const random = createRandom(985);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 8), -10, 10);
			const queries = Array.from({ length: random.int(1, 8) }, () => [
				random.int(-5, 5),
				random.int(0, nums.length - 1),
			]);
			const values = [...nums];
			const expected = queries.map(([val = 0, index = 0]) => {
				values[index] = (values[index] ?? 0) + val;
				return values.filter((v) => v % 2 === 0).reduce((a, b) => a + b, 0);
			});
			expect(sumEvenAfterQueries(nums, queries)).toEqual(expected);
		}
	});
});
