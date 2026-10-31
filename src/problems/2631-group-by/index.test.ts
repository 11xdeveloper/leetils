import { describe, expect, it } from "bun:test";
import { groupBy } from ".";

describe("2631. Group By", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			(groupBy<{ id: string }>).call(
				[{ id: "1" }, { id: "1" }, { id: "2" }],
				(item) => item.id,
			),
		).toEqual({ 1: [{ id: "1" }, { id: "1" }], 2: [{ id: "2" }] });
		expect(
			(groupBy<number[]>).call(
				[
					[1, 2, 3],
					[1, 3, 5],
					[1, 5, 9],
				],
				(list) => String(list[0]),
			),
		).toEqual({
			1: [
				[1, 2, 3],
				[1, 3, 5],
				[1, 5, 9],
			],
		});
		expect(
			(groupBy<number>).call([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (n) =>
				String(n > 5),
			),
		).toEqual({ true: [6, 7, 8, 9, 10], false: [1, 2, 3, 4, 5] });
	});
});
