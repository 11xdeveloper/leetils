import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { RangeFrequencyQueries as RangeFreqQuery } from ".";

describe("2080. Range Frequency Queries", () => {
	it("solves the example from the problem statement", () => {
		const queries = new RangeFreqQuery([
			12, 33, 4, 56, 22, 2, 34, 33, 22, 12, 34, 56,
		]);
		expect(queries.query(1, 2, 4)).toBe(1);
		expect(queries.query(0, 11, 33)).toBe(2);
	});

	it("matches counting the subarray on random inputs", () => {
		const random = createRandom(2080);
		const arr = random.array(50, 1, 5);
		const queries = new RangeFreqQuery(arr);
		for (let run = 0; run < 300; run++) {
			const left = random.int(0, arr.length - 1);
			const right = random.int(left, arr.length - 1);
			const value = random.int(0, 6);
			expect(queries.query(left, right, value)).toBe(
				arr.slice(left, right + 1).filter((v) => v === value).length,
			);
		}
	});
});
