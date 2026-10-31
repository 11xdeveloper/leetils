import { describe, expect, it } from "bun:test";
import { aggregateTwoTimeSeries as aggregateTimeSeries } from ".";

describe("4001. Aggregate Two Time Series", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			aggregateTimeSeries(
				[
					[1, 3],
					[4, 1],
				],
				[
					[2, 2],
					[5, 2],
				],
			),
		).toEqual([
			[1, 5],
			[2, 3],
			[4, 3],
			[5, 2],
		]);
		expect(
			aggregateTimeSeries(
				[
					[1, 5],
					[3, 1],
				],
				[[2, 2]],
			),
		).toEqual([
			[1, 7],
			[2, 3],
			[3, 1],
		]);
		expect(aggregateTimeSeries([[1, 5]], [[1000000000, 2]])).toEqual([
			[1, 7],
			[1000000000, 2],
		]);
	});
});
