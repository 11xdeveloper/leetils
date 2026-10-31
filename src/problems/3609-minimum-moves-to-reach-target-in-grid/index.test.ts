import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumMovesToReachTargetInGrid as minMoves } from ".";

/** Searches forwards while points stay within the target. */
const byBruteForce = (
	sx: number,
	sy: number,
	tx: number,
	ty: number,
): number => {
	const seen = new Set([`${sx},${sy}`]);
	let frontier = [[sx, sy]];
	for (let moves = 0; frontier.length > 0; moves++) {
		const next: number[][] = [];
		for (const [x = 0, y = 0] of frontier) {
			if (x === tx && y === ty) return moves;
			const m = Math.max(x, y);
			for (const [nx, ny] of [
				[x + m, y],
				[x, y + m],
			] as const)
				if (nx <= tx && ny <= ty && !seen.has(`${nx},${ny}`)) {
					seen.add(`${nx},${ny}`);
					next.push([nx, ny]);
				}
		}
		frontier = next;
	}
	return -1;
};

describe("3609. Minimum Moves to Reach Target in Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(minMoves(1, 2, 5, 4)).toBe(2);
		expect(minMoves(0, 1, 2, 3)).toBe(3);
		expect(minMoves(1, 1, 2, 2)).toBe(-1);
	});

	it("matches searching forwards on random points", () => {
		const random = createRandom(3609);
		for (let run = 0; run < 500; run++) {
			const [sx, sy] = [random.int(0, 4), random.int(0, 4)];
			const [tx, ty] = [random.int(sx, 40), random.int(sy, 40)];
			expect(minMoves(sx, sy, tx, ty)).toBe(byBruteForce(sx, sy, tx, ty));
		}
	});
});
