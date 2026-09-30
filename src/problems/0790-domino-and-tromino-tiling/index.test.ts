import { describe, expect, it } from "bun:test";
import { dominoAndTrominoTiling as numTilings } from ".";

/** Counts tilings by always covering the first empty cell (column by column) with every fitting piece. */
const byBacktracking = (n: number): number => {
	const shapes = [
		[
			[0, 0],
			[1, 0],
		],
		[
			[0, 0],
			[0, 1],
		],
		[
			[0, 0],
			[1, 0],
			[0, 1],
		],
		[
			[0, 0],
			[1, 0],
			[1, 1],
		],
		[
			[0, 0],
			[0, 1],
			[1, 1],
		],
		[
			[1, 0],
			[0, 1],
			[1, 1],
		],
	];
	const filled = Array.from({ length: 2 }, () =>
		new Array<boolean>(n).fill(false),
	);
	const count = (): number => {
		let first: number[] | undefined;
		for (let c = 0; c < n && !first; c++)
			for (let r = 0; r < 2 && !first; r++) if (!filled[r]?.[c]) first = [r, c];
		if (!first) return 1;
		const [fr = 0, fc = 0] = first;
		let total = 0;
		for (const shape of shapes) {
			for (const [ar = 0, ac = 0] of shape) {
				const cells = shape.map(([r = 0, c = 0]) => [r - ar + fr, c - ac + fc]);
				if (
					!cells.every(
						([r = 0, c = 0]) =>
							r >= 0 && r < 2 && c >= 0 && c < n && !filled[r]?.[c],
					)
				)
					continue;
				for (const [r = 0, c = 0] of cells) (filled[r] ?? [])[c] = true;
				total += count();
				for (const [r = 0, c = 0] of cells) (filled[r] ?? [])[c] = false;
			}
		}
		return total;
	};
	return count();
};

describe("790. Domino and Tromino Tiling", () => {
	it("solves the examples from the problem statement", () => {
		expect(numTilings(3)).toBe(5);
		expect(numTilings(1)).toBe(1);
	});

	it("matches placing pieces one by one up to n = 10", () => {
		for (let n = 1; n <= 10; n++) expect(numTilings(n)).toBe(byBacktracking(n));
	});

	it("handles the largest input", () => {
		expect(numTilings(1000)).toBeWithin(0, 1_000_000_007);
	});
});
