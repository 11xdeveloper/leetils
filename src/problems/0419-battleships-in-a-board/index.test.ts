import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { battleshipsInABoard } from ".";

describe("419. Battleships in a Board", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			battleshipsInABoard([
				["X", ".", ".", "X"],
				[".", ".", ".", "X"],
				[".", ".", ".", "X"],
			]),
		).toBe(2);
		expect(battleshipsInABoard([["."]])).toBe(0);
	});

	it("counts randomly placed non-touching ships", () => {
		const random = createRandom(419);
		for (let run = 0; run < 500; run++) {
			const rows = random.int(1, 8);
			const columns = random.int(1, 8);
			const board = Array.from({ length: rows }, () =>
				new Array<string>(columns).fill("."),
			);
			let placed = 0;
			for (let attempt = 0; attempt < 10; attempt++) {
				const vertical = random.int(0, 1) === 0;
				const length = random.int(1, 3);
				const r = random.int(0, rows - 1);
				const c = random.int(0, columns - 1);
				const cells = Array.from({ length }, (_, i): [number, number] =>
					vertical ? [r + i, c] : [r, c + i],
				);
				const fits = cells.every(([cr, cc]) => {
					if (cr >= rows || cc >= columns) return false;
					for (let dr = -1; dr <= 1; dr++)
						for (let dc = -1; dc <= 1; dc++)
							if (board[cr + dr]?.[cc + dc] === "X") return false;
					return true;
				});
				if (!fits) continue;
				for (const [cr, cc] of cells) (board[cr] ?? [])[cc] = "X";
				placed++;
			}
			expect(battleshipsInABoard(board)).toBe(placed);
		}
	});
});
