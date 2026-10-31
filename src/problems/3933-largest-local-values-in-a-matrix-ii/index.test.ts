import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { largestLocalValuesInAMatrixII as countLocalMaximums } from ".";

/** Checks every considered cell directly. */
const byBruteForce = (matrix: number[][]): number => {
	let count = 0;
	matrix.forEach((row, r) => {
		row.forEach((x, c) => {
			if (x === 0) return;
			let ok = true;
			matrix.forEach((other, i) => {
				other.forEach((y, j) => {
					const [dr, dc] = [Math.abs(i - r), Math.abs(j - c)];
					if (dr <= x && dc <= x && !(dr === x && dc === x) && y > x)
						ok = false;
				});
			});
			if (ok) count++;
		});
	});
	return count;
};

describe("3933. Largest Local Values in a Matrix II", () => {
	it("solves the examples from the problem statement", () => {
		const big = Array.from({ length: 7 }, (_, r) =>
			Array.from({ length: 7 }, (_, c) => (r === 3 && c === 3 ? 2 : 0)),
		);
		expect(countLocalMaximums(big)).toBe(1);
		expect(
			countLocalMaximums([
				[1, 2],
				[3, 4],
			]),
		).toBe(1);
		expect(
			countLocalMaximums([
				[1, 0, 1],
				[0, 1, 0],
				[1, 0, 1],
			]),
		).toBe(5);
		expect(
			countLocalMaximums([
				[1, 1],
				[1, 1],
			]),
		).toBe(4);
	});

	it("matches checking every cell on random matrices", () => {
		const random = createRandom(3933);
		for (let run = 0; run < 200; run++) {
			const matrix = Array.from({ length: random.int(1, 6) }, () =>
				random.array(random.int(1, 6), 0, 4),
			);
			const width = matrix[0]?.length ?? 0;
			const square = matrix.map((row) =>
				row
					.slice(0, width)
					.concat(new Array(Math.max(0, width - row.length)).fill(0)),
			);
			expect(countLocalMaximums(square)).toBe(byBruteForce(square));
		}
	});
});
