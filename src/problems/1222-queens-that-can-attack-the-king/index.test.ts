import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { queensThatCanAttackTheKing as queensAttacktheKing } from ".";

/** A queen attacks if it shares a line with the king and no queen sits strictly between. */
const byBruteForce = (queens: number[][], king: number[]): number[][] => {
	const [kx = 0, ky = 0] = king;
	return queens.filter(([x = 0, y = 0]) => {
		const [dx, dy] = [x - kx, y - ky];
		if (dx !== 0 && dy !== 0 && Math.abs(dx) !== Math.abs(dy)) return false;
		const steps = Math.max(Math.abs(dx), Math.abs(dy));
		for (let step = 1; step < steps; step++) {
			const [bx, by] = [kx + Math.sign(dx) * step, ky + Math.sign(dy) * step];
			if (queens.some(([qx, qy]) => qx === bx && qy === by)) return false;
		}
		return true;
	});
};

const sorted = (cells: number[][]) =>
	cells.map((cell) => cell.join(",")).sort();

describe("1222. Queens That Can Attack the King", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			sorted(
				queensAttacktheKing(
					[
						[0, 1],
						[1, 0],
						[4, 0],
						[0, 4],
						[3, 3],
						[2, 4],
					],
					[0, 0],
				),
			),
		).toEqual(["0,1", "1,0", "3,3"]);
		expect(
			sorted(
				queensAttacktheKing(
					[
						[0, 0],
						[1, 1],
						[2, 2],
						[3, 4],
						[3, 5],
						[4, 4],
						[4, 5],
					],
					[3, 3],
				),
			),
		).toEqual(["2,2", "3,4", "4,4"]);
	});

	it("matches checking each queen's line on random boards", () => {
		const random = createRandom(1222);
		for (let run = 0; run < 300; run++) {
			const cells = [...new Set(random.array(random.int(2, 20), 0, 63))];
			const [kingCell = 0, ...queenCells] = cells;
			const king = [Math.floor(kingCell / 8), kingCell % 8];
			const queens = queenCells.map((cell) => [Math.floor(cell / 8), cell % 8]);
			expect(sorted(queensAttacktheKing(queens, king))).toEqual(
				sorted(byBruteForce(queens, king)),
			);
		}
	});
});
