import { describe, expect, it } from "bun:test";
import { lexicographicalNumbers } from ".";

describe("386. Lexicographical Numbers", () => {
	it("solves the examples from the problem statement", () => {
		expect(lexicographicalNumbers(13)).toEqual([
			1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9,
		]);
		expect(lexicographicalNumbers(2)).toEqual([1, 2]);
	});

	it("matches sorting the numbers as strings for every n up to 2000", () => {
		for (let n = 1; n <= 2000; n++) {
			const expected = Array.from({ length: n }, (_, i) => i + 1).toSorted(
				(a, b) => (String(a) < String(b) ? -1 : 1),
			);
			expect(lexicographicalNumbers(n)).toEqual(expected);
		}
	});

	it("handles the constraint of 5 × 10^4", () => {
		const order = lexicographicalNumbers(50_000);
		expect(order).toHaveLength(50_000);
		expect(order.slice(0, 5)).toEqual([1, 10, 100, 1000, 10000]);
	});
});
