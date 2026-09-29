import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { surroundedRegions } from ".";

const solve = (rows: string[]): string[] => {
	const board = rows.map((row) => row.split(""));
	expect(surroundedRegions(board)).toBeUndefined();
	return board.map((row) => row.join(""));
};

/** Flood-fills each region separately and captures it if it never touches the edge. */
const byRegions = (rows: string[]): string[] => {
	const board = rows.map((row) => row.split(""));
	const height = board.length;
	const width = board[0]?.length ?? 0;
	const seen = new Set<string>();
	for (let r = 0; r < height; r++) {
		for (let c = 0; c < width; c++) {
			if (board[r]?.[c] !== "O" || seen.has(`${r},${c}`)) continue;
			const region: [number, number][] = [];
			const stack: [number, number][] = [[r, c]];
			seen.add(`${r},${c}`);
			let touchesEdge = false;
			for (let cell = stack.pop(); cell; cell = stack.pop()) {
				const [cr, cc] = cell;
				region.push(cell);
				if (cr === 0 || cc === 0 || cr === height - 1 || cc === width - 1)
					touchesEdge = true;
				for (const [nr, nc] of [
					[cr + 1, cc],
					[cr - 1, cc],
					[cr, cc + 1],
					[cr, cc - 1],
				] as const) {
					if (board[nr]?.[nc] === "O" && !seen.has(`${nr},${nc}`)) {
						seen.add(`${nr},${nc}`);
						stack.push([nr, nc]);
					}
				}
			}
			if (!touchesEdge) {
				for (const [rr, rc] of region) {
					const row = board[rr];
					if (row) row[rc] = "X";
				}
			}
		}
	}
	return board.map((row) => row.join(""));
};

describe("130. Surrounded Regions", () => {
	it("solves the examples from the problem statement", () => {
		expect(solve(["XXXX", "XOOX", "XXOX", "XOXX"])).toEqual([
			"XXXX",
			"XXXX",
			"XXXX",
			"XOXX",
		]);
		expect(solve(["X"])).toEqual(["X"]);
	});

	it("keeps regions connected to the edge through a winding path", () => {
		expect(solve(["XXXXX", "XOOOX", "XXXOX", "XOOOX", "XOXXX"])).toEqual([
			"XXXXX",
			"XOOOX",
			"XXXOX",
			"XOOOX",
			"XOXXX",
		]);
	});

	it("matches flood-filling each region on random boards", () => {
		const random = createRandom(130);
		for (let run = 0; run < 500; run++) {
			const width = random.int(1, 7);
			const rows = Array.from({ length: random.int(1, 7) }, () =>
				random.string(width, "XXO"),
			);
			expect(solve(rows)).toEqual(byRegions(rows));
		}
	});
});
