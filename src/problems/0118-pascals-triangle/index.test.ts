import { describe, expect, it } from "bun:test";
import { pascalsTriangle } from ".";

const binomial = (n: number, k: number): number => {
	let result = 1;
	for (let i = 1; i <= k; i++) result = (result * (n - k + i)) / i;
	return result;
};

describe("118. Pascal's Triangle", () => {
	it("solves the examples from the problem statement", () => {
		expect(pascalsTriangle(5)).toEqual([
			[1],
			[1, 1],
			[1, 2, 1],
			[1, 3, 3, 1],
			[1, 4, 6, 4, 1],
		]);
		expect(pascalsTriangle(1)).toEqual([[1]]);
	});

	it("matches binomial coefficients up to the constraint of 30 rows", () => {
		const rows = pascalsTriangle(30);
		expect(rows).toHaveLength(30);
		for (const [n, row] of rows.entries()) {
			expect(row).toEqual(
				Array.from({ length: n + 1 }, (_, k) => binomial(n, k)),
			);
		}
	});
});
