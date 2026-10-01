import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findKthLargestXorCoordinateValue as kthLargestValue } from ".";

describe("1738. Find Kth Largest XOR Coordinate Value", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			kthLargestValue(
				[
					[5, 2],
					[1, 6],
				],
				1,
			),
		).toBe(7);
		expect(
			kthLargestValue(
				[
					[5, 2],
					[1, 6],
				],
				2,
			),
		).toBe(5);
		expect(
			kthLargestValue(
				[
					[5, 2],
					[1, 6],
				],
				3,
			),
		).toBe(4);
	});

	it("matches XORing each rectangle directly on random matrices", () => {
		const random = createRandom(1738);
		for (let run = 0; run < 100; run++) {
			const [rows, cols] = [random.int(1, 5), random.int(1, 5)];
			const matrix = Array.from({ length: rows }, () =>
				random.array(cols, 0, 20),
			);
			const values: number[] = [];
			for (let a = 0; a < rows; a++) {
				for (let b = 0; b < cols; b++) {
					let value = 0;
					for (let i = 0; i <= a; i++)
						for (let j = 0; j <= b; j++) value ^= matrix[i]?.[j] ?? 0;
					values.push(value);
				}
			}
			values.sort((x, y) => y - x);
			const k = random.int(1, values.length);
			expect(kthLargestValue(matrix, k)).toBe(values[k - 1] ?? 0);
		}
	});
});
