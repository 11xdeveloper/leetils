import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumNumberOfFlipsToConvertBinaryMatrixToZeroMatrix as minFlips } from ".";

/** Breadth-first search over matrices, one flip at a time. */
const byBruteForce = (mat: number[][]): number => {
	const [m, n] = [mat.length, mat[0]?.length ?? 0];
	let frontier = [mat.flat().join("")];
	const seen = new Set(frontier);
	for (let steps = 0; frontier.length > 0; steps++) {
		const next: string[] = [];
		for (const key of frontier) {
			if (!key.includes("1")) return steps;
			for (let r = 0; r < m; r++) {
				for (let c = 0; c < n; c++) {
					const cells = [...key];
					for (const [r2, c2] of [
						[r, c],
						[r - 1, c],
						[r + 1, c],
						[r, c - 1],
						[r, c + 1],
					] as const) {
						if (r2 >= 0 && r2 < m && c2 >= 0 && c2 < n)
							cells[r2 * n + c2] = cells[r2 * n + c2] === "1" ? "0" : "1";
					}
					const flipped = cells.join("");
					if (seen.has(flipped)) continue;
					seen.add(flipped);
					next.push(flipped);
				}
			}
		}
		frontier = next;
	}
	return -1;
};

describe("1284. Minimum Number of Flips to Convert Binary Matrix to Zero Matrix", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minFlips([
				[0, 0],
				[0, 1],
			]),
		).toBe(3);
		expect(minFlips([[0]])).toBe(0);
		expect(
			minFlips([
				[1, 0, 0],
				[1, 0, 0],
			]),
		).toBe(-1);
	});

	it("matches searching over flips on random matrices", () => {
		const random = createRandom(1284);
		for (let run = 0; run < 150; run++) {
			const [m, n] = [random.int(1, 3), random.int(1, 3)];
			const grid = Array.from({ length: m }, () => random.array(n, 0, 1));
			expect(minFlips(grid)).toBe(byBruteForce(grid));
		}
	});
});
