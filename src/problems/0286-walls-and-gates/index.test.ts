import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { wallsAndGates } from ".";

const INF = 2 ** 31 - 1;

/** Breadth-first search from each room separately to its nearest gate. */
const byEachRoom = (rooms: number[][]): number[][] =>
	rooms.map((row, r) =>
		row.map((cell, c) => {
			if (cell !== INF) return cell;
			const seen = new Set([`${r},${c}`]);
			let frontier: [number, number][] = [[r, c]];
			for (let distance = 1; frontier.length > 0; distance++) {
				const next: [number, number][] = [];
				for (const [fr, fc] of frontier) {
					for (const [nr, nc] of [
						[fr + 1, fc],
						[fr - 1, fc],
						[fr, fc + 1],
						[fr, fc - 1],
					] as const) {
						const value = rooms[nr]?.[nc];
						if (value === undefined || value === -1 || seen.has(`${nr},${nc}`))
							continue;
						if (value === 0) return distance;
						seen.add(`${nr},${nc}`);
						next.push([nr, nc]);
					}
				}
				frontier = next;
			}
			return INF;
		}),
	);

describe("286. Walls and Gates", () => {
	it("solves the examples from the problem statement", () => {
		const rooms = [
			[INF, -1, 0, INF],
			[INF, INF, INF, -1],
			[INF, -1, INF, -1],
			[0, -1, INF, INF],
		];
		expect(wallsAndGates(rooms)).toBeUndefined();
		expect(rooms).toEqual([
			[3, -1, 0, 1],
			[2, 2, 1, -1],
			[1, -1, 2, -1],
			[0, -1, 3, 4],
		]);
		const wall = [[-1]];
		wallsAndGates(wall);
		expect(wall).toEqual([[-1]]);
	});

	it("matches searching from each room on random grids", () => {
		const random = createRandom(286);
		for (let run = 0; run < 300; run++) {
			const columns = random.int(1, 6);
			const rooms = Array.from({ length: random.int(1, 6) }, () =>
				Array.from(
					{ length: columns },
					() => [-1, 0, INF, INF, INF][random.int(0, 4)] ?? INF,
				),
			);
			const expected = byEachRoom(rooms);
			wallsAndGates(rooms);
			expect(rooms).toEqual(expected);
		}
	});
});
