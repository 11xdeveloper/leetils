import { describe, expect, it } from "bun:test";
import { minimumMovesToCaptureTheQueen } from ".";

/** Breadth-first search over the positions of the two white pieces. */
const byBruteForce = (
	a: number,
	b: number,
	c: number,
	d: number,
	e: number,
	f: number,
): number => {
	const key = (r: number[]) => r.join();
	const seen = new Set([key([a, b, c, d])]);
	let frontier = [[a, b, c, d]];
	for (let moves = 1; ; moves++) {
		const next: number[][] = [];
		for (const [ra = 0, rb = 0, ba = 0, bb = 0] of frontier) {
			const slide = (
				x: number,
				y: number,
				dirs: number[][],
				other: [number, number],
				place: (x: number, y: number) => number[],
			): boolean => {
				for (const [dx = 0, dy = 0] of dirs)
					for (
						let nx = x + dx, ny = y + dy;
						nx >= 1 && nx <= 8 && ny >= 1 && ny <= 8;
						nx += dx, ny += dy
					) {
						if (nx === other[0] && ny === other[1]) break;
						if (nx === e && ny === f) return true;
						const state = place(nx, ny);
						if (!seen.has(key(state))) {
							seen.add(key(state));
							next.push(state);
						}
					}
				return false;
			};
			const straight = [
				[1, 0],
				[-1, 0],
				[0, 1],
				[0, -1],
			];
			const diagonal = [
				[1, 1],
				[1, -1],
				[-1, 1],
				[-1, -1],
			];
			if (slide(ra, rb, straight, [ba, bb], (x, y) => [x, y, ba, bb]))
				return moves;
			if (slide(ba, bb, diagonal, [ra, rb], (x, y) => [ra, rb, x, y]))
				return moves;
		}
		frontier = next;
	}
};

describe("3001. Minimum Moves to Capture The Queen", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumMovesToCaptureTheQueen(1, 1, 8, 8, 2, 3)).toBe(2);
		expect(minimumMovesToCaptureTheQueen(5, 3, 3, 4, 5, 2)).toBe(1);
	});

	it("matches a search on many positions", () => {
		const positions: number[][] = [];
		for (let a = 1; a <= 8; a += 1)
			for (let b = 1; b <= 8; b += 1)
				for (let c = 1; c <= 8; c += 2)
					for (let d = 1; d <= 8; d += 1)
						for (const [e, f] of [
							[4, 4],
							[2, 7],
							[8, 1],
						])
							positions.push([a, b, c, d, e ?? 0, f ?? 0]);
		for (const [a = 0, b = 0, c = 0, d = 0, e = 0, f = 0] of positions) {
			if (new Set([`${a},${b}`, `${c},${d}`, `${e},${f}`]).size < 3) continue;
			expect(minimumMovesToCaptureTheQueen(a, b, c, d, e, f)).toBe(
				byBruteForce(a, b, c, d, e, f),
			);
		}
	});
});
