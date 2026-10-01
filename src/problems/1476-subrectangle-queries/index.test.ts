import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { SubrectangleQueries } from ".";

describe("1476. Subrectangle Queries", () => {
	it("solves the examples from the problem statement", () => {
		const first = new SubrectangleQueries([
			[1, 2, 1],
			[4, 3, 4],
			[3, 2, 1],
			[1, 1, 1],
		]);
		expect(first.getValue(0, 2)).toBe(1);
		first.updateSubrectangle(0, 0, 3, 2, 5);
		expect(first.getValue(0, 2)).toBe(5);
		expect(first.getValue(3, 1)).toBe(5);
		first.updateSubrectangle(3, 0, 3, 2, 10);
		expect(first.getValue(3, 1)).toBe(10);
		expect(first.getValue(0, 2)).toBe(5);

		const second = new SubrectangleQueries([
			[1, 1, 1],
			[2, 2, 2],
			[3, 3, 3],
		]);
		expect(second.getValue(0, 0)).toBe(1);
		second.updateSubrectangle(0, 0, 2, 2, 100);
		expect(second.getValue(0, 0)).toBe(100);
		expect(second.getValue(2, 2)).toBe(100);
		second.updateSubrectangle(1, 1, 2, 2, 20);
		expect(second.getValue(2, 2)).toBe(20);
	});

	it("matches updating a copy of the grid on random operations", () => {
		const random = createRandom(1476);
		for (let run = 0; run < 50; run++) {
			const [rows, cols] = [random.int(1, 5), random.int(1, 5)];
			const grid = Array.from({ length: rows }, () => random.array(cols, 1, 9));
			const queries = new SubrectangleQueries(grid);
			for (let op = 0; op < 30; op++) {
				if (random.next() < 0.4) {
					const [a, b] = [random.int(0, rows - 1), random.int(0, rows - 1)];
					const [c, d] = [random.int(0, cols - 1), random.int(0, cols - 1)];
					const value = random.int(1, 99);
					queries.updateSubrectangle(
						Math.min(a, b),
						Math.min(c, d),
						Math.max(a, b),
						Math.max(c, d),
						value,
					);
					for (let r = Math.min(a, b); r <= Math.max(a, b); r++) {
						for (let c2 = Math.min(c, d); c2 <= Math.max(c, d); c2++) {
							const row = grid[r];
							if (row) row[c2] = value;
						}
					}
				} else {
					const [r, c] = [random.int(0, rows - 1), random.int(0, cols - 1)];
					expect(queries.getValue(r, c)).toBe(grid[r]?.[c] ?? -1);
				}
			}
		}
	});
});
