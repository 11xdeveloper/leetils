import { describe, expect, it } from "bun:test";
import { tilingARectangleWithTheFewestSquares as tilingRectangle } from ".";

/** The best tiling built only from straight cuts through the whole rectangle. */
const byCuts = (n: number, m: number): number => {
	const best = Array.from({ length: n + 1 }, () =>
		new Array<number>(m + 1).fill(0),
	);
	for (let a = 1; a <= n; a++) {
		for (let b = 1; b <= m; b++) {
			let fewest = a === b ? 1 : a * b;
			for (let cut = 1; cut < a; cut++)
				fewest = Math.min(
					fewest,
					(best[cut]?.[b] ?? 0) + (best[a - cut]?.[b] ?? 0),
				);
			for (let cut = 1; cut < b; cut++)
				fewest = Math.min(
					fewest,
					(best[a]?.[cut] ?? 0) + (best[a]?.[b - cut] ?? 0),
				);
			const row = best[a];
			if (row) row[b] = fewest;
		}
	}
	return best[n]?.[m] ?? 0;
};

describe("1240. Tiling a Rectangle with the Fewest Squares", () => {
	it("solves the examples from the problem statement", () => {
		expect(tilingRectangle(2, 3)).toBe(3);
		expect(tilingRectangle(5, 8)).toBe(5);
		expect(tilingRectangle(11, 13)).toBe(6);
	});

	it("matches the best straight-cut tiling up to 13 × 13, except 11 × 13", () => {
		// 11 × 13 is the one size in range whose best tiling has no straight cut:
		// cuts alone need 8 squares.
		for (let n = 1; n <= 13; n++) {
			for (let m = 1; m <= 13; m++) {
				const cuts = byCuts(n, m);
				const exception = (n === 11 && m === 13) || (n === 13 && m === 11);
				expect(tilingRectangle(n, m)).toBe(exception ? 6 : cuts);
				if (exception) expect(cuts).toBe(8);
			}
		}
	});
});
