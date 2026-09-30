import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumMovesToMoveABoxToTheirTargetLocation as minPushBox } from ".";

/**
 * Breadth-first search one push at a time: before each round, the player
 * walks anywhere reachable without moving the box.
 */
const byBruteForce = (grid: string[][]): number => {
	const find = (char: string) => {
		for (const [r, row] of grid.entries()) {
			const c = row.indexOf(char);
			if (c !== -1) return [r, c] as const;
		}
		return [0, 0] as const;
	};
	const open = (r: number, c: number) => (grid[r]?.[c] ?? "#") !== "#";
	const walkable = (box: string, from: readonly [number, number]) => {
		const seen = new Set([from.join(",")]);
		const stack = [from];
		for (let at = stack.pop(); at; at = stack.pop()) {
			for (const [dr, dc] of [
				[-1, 0],
				[1, 0],
				[0, -1],
				[0, 1],
			] as const) {
				const next = [at[0] + dr, at[1] + dc] as const;
				const key = next.join(",");
				if (!open(...next) || key === box || seen.has(key)) continue;
				seen.add(key);
				stack.push(next);
			}
		}
		return seen;
	};
	const target = find("T").join(",");
	let level = [[find("B"), find("S")] as const];
	const seen = new Set<string>();
	for (let pushes = 0; level.length > 0; pushes++) {
		const next: (typeof level)[number][] = [];
		for (const [box, player] of level) {
			const boxKey = box.join(",");
			if (boxKey === target) return pushes;
			const reach = walkable(boxKey, player);
			for (const [dr, dc] of [
				[-1, 0],
				[1, 0],
				[0, -1],
				[0, 1],
			] as const) {
				const stand = [box[0] - dr, box[1] - dc].join(",");
				const to = [box[0] + dr, box[1] + dc] as const;
				if (!reach.has(stand) || !open(...to)) continue;
				const key = `${to.join(",")}|${boxKey}`;
				if (seen.has(key)) continue;
				seen.add(key);
				next.push([to, box]);
			}
		}
		level = next;
	}
	return -1;
};

const parse = (rows: string[]) => rows.map((row) => [...row]);

describe("1263. Minimum Moves to Move a Box to Their Target Location", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minPushBox(
				parse(["######", "#T####", "#..B.#", "#.##.#", "#...S#", "######"]),
			),
		).toBe(3);
		expect(
			minPushBox(
				parse(["######", "#T####", "#..B.#", "####.#", "#...S#", "######"]),
			),
		).toBe(-1);
		expect(
			minPushBox(
				parse(["######", "#T..##", "#.#B.#", "#....#", "#...S#", "######"]),
			),
		).toBe(5);
	});

	it("can't push from the side the player can't reach", () => {
		expect(minPushBox(parse(["#####", "#TBS#", "#####"]))).toBe(1);
		expect(minPushBox(parse(["#####", "#SBT#", "#####"]))).toBe(1);
		expect(minPushBox(parse(["####", "#TB#", "#S.#", "####"]))).toBe(-1);
	});

	it("handles an open 20 × 20 warehouse", () => {
		const grid = Array.from({ length: 20 }, () =>
			new Array<string>(20).fill("."),
		);
		const place = (r: number, c: number, char: string) => {
			const row = grid[r];
			if (row) row[c] = char;
		};
		place(0, 0, "S");
		place(1, 1, "B");
		place(18, 18, "T");
		// Every push moves the box one step, and there's room to push it all the way.
		expect(minPushBox(grid)).toBe(34);
		// A box against the top wall can never be pushed down.
		place(1, 1, ".");
		place(0, 5, "B");
		expect(minPushBox(grid)).toBe(-1);
	});

	it("matches pushing one round at a time on random grids", () => {
		const random = createRandom(1263);
		for (let run = 0; run < 150; run++) {
			const [m, n] = [random.int(2, 6), random.int(2, 6)];
			const grid = Array.from({ length: m }, () =>
				Array.from({ length: n }, (): string =>
					random.next() < 0.25 ? "#" : ".",
				),
			);
			const cells = [...new Set(random.array(6, 0, m * n - 1))];
			if (cells.length < 3) continue;
			const [s = 0, b = 0, t = 0] = cells;
			for (const [cell, char] of [
				[s, "S"],
				[b, "B"],
				[t, "T"],
			] as const) {
				const row = grid[Math.floor(cell / n)];
				if (row) row[cell % n] = char;
			}
			expect(minPushBox(grid)).toBe(byBruteForce(grid));
		}
	});
});
