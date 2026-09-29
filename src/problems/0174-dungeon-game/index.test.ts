import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { dungeonGame } from ".";

/** Tries every path, tracking the lowest health reached relative to the start. */
const byBruteForce = (dungeon: number[][]): number => {
	const rows = dungeon.length;
	const columns = dungeon[0]?.length ?? 0;
	let best = Number.POSITIVE_INFINITY;
	const walk = (r: number, c: number, total: number, lowest: number): void => {
		const health = total + (dungeon[r]?.[c] ?? 0);
		const low = Math.min(lowest, health);
		if (r === rows - 1 && c === columns - 1) {
			best = Math.min(best, Math.max(1, 1 - low));
			return;
		}
		if (r + 1 < rows) walk(r + 1, c, health, low);
		if (c + 1 < columns) walk(r, c + 1, health, low);
	};
	walk(0, 0, 0, 0);
	return best;
};

describe("174. Dungeon Game", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			dungeonGame([
				[-2, -3, 3],
				[-5, -10, 1],
				[10, 30, -5],
			]),
		).toBe(7);
		expect(dungeonGame([[0]])).toBe(1);
	});

	it("never needs less than 1 health, even with healing rooms", () => {
		expect(dungeonGame([[100]])).toBe(1);
	});

	it("doesn't let later healing make up for health lost earlier", () => {
		expect(dungeonGame([[-5, 100]])).toBe(6);
	});

	it("matches trying every path on random dungeons", () => {
		const random = createRandom(174);
		for (let run = 0; run < 500; run++) {
			const columns = random.int(1, 5);
			const dungeon = Array.from({ length: random.int(1, 5) }, () =>
				random.array(columns, -10, 10),
			);
			expect(dungeonGame(dungeon)).toBe(byBruteForce(dungeon));
		}
	});
});
