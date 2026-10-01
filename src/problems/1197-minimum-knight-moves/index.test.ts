import { describe, expect, it } from "bun:test";
import { minimumKnightMoves as minKnightMoves } from ".";

/** Breadth-first search over a generous square around the origin, recording every distance. */
const distances = (radius: number): Map<string, number> => {
	const found = new Map([["0,0", 0]]);
	let frontier = [[0, 0]];
	for (let moves = 1; frontier.length > 0; moves++) {
		const next: number[][] = [];
		for (const [a = 0, b = 0] of frontier) {
			for (const [da, db] of [
				[1, 2],
				[2, 1],
				[2, -1],
				[1, -2],
				[-1, -2],
				[-2, -1],
				[-2, 1],
				[-1, 2],
			] as const) {
				const [a2, b2] = [a + da, b + db];
				if (
					Math.abs(a2) > radius ||
					Math.abs(b2) > radius ||
					found.has(`${a2},${b2}`)
				)
					continue;
				found.set(`${a2},${b2}`, moves);
				next.push([a2, b2]);
			}
		}
		frontier = next;
	}
	return found;
};

describe("1197. Minimum Knight Moves", () => {
	it("solves the examples from the problem statement", () => {
		expect(minKnightMoves(2, 1)).toBe(1);
		expect(minKnightMoves(5, 5)).toBe(4);
	});

	it("handles awkward squares near the origin", () => {
		expect(minKnightMoves(0, 0)).toBe(0);
		expect(minKnightMoves(1, 0)).toBe(3);
		expect(minKnightMoves(1, 1)).toBe(2);
		expect(minKnightMoves(2, 2)).toBe(4);
		expect(minKnightMoves(-1, 0)).toBe(3);
	});

	it("handles the far corners of the range", () => {
		expect(minKnightMoves(300, 0)).toBe(150);
		expect(minKnightMoves(-150, 150)).toBe(100);
		expect(minKnightMoves(0, -300)).toBe(150);
	});

	it("matches a search over a large board for every square with |x| + |y| ≤ 16", () => {
		const found = distances(30);
		for (let x = -16; x <= 16; x++) {
			for (let y = -16 + Math.abs(x); y <= 16 - Math.abs(x); y++) {
				expect(minKnightMoves(x, y)).toBe(found.get(`${x},${y}`) ?? -1);
			}
		}
	});
});
