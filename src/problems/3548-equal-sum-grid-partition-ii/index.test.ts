import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { equalSumGridPartitionII as canPartitionGrid } from ".";

const connected = (cells: [number, number][]): boolean => {
	if (cells.length === 0) return false;
	const set = new Set(cells.map(([r, c]) => `${r},${c}`));
	const seen = new Set([`${cells[0]?.[0]},${cells[0]?.[1]}`]);
	const queue = [cells[0] ?? [0, 0]];
	for (let i = 0; i < queue.length; i++) {
		const [r, c] = queue[i] ?? [0, 0];
		for (const [dr, dc] of [
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1],
		] as const) {
			const key = `${r + dr},${c + dc}`;
			if (set.has(key) && !seen.has(key)) {
				seen.add(key);
				queue.push([r + dr, c + dc]);
			}
		}
	}
	return seen.size === set.size;
};

/** Tries every cut and every cell to discount. */
const byBruteForce = (grid: number[][]): boolean => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	const cells = grid.flatMap((row, r) =>
		row.map((_, c) => [r, c] as [number, number]),
	);
	const parts: [[number, number][], [number, number][]][] = [];
	for (let cut = 1; cut < m; cut++)
		parts.push([
			cells.filter(([r]) => r < cut),
			cells.filter(([r]) => r >= cut),
		]);
	for (let cut = 1; cut < n; cut++)
		parts.push([
			cells.filter(([, c]) => c < cut),
			cells.filter(([, c]) => c >= cut),
		]);
	const sum = (part: [number, number][]) =>
		part.reduce((s, [r, c]) => s + (grid[r]?.[c] ?? 0), 0);
	for (const [a, b] of parts) {
		if (sum(a) === sum(b)) return true;
		for (const [side, other] of [
			[a, b],
			[b, a],
		] as const)
			for (let i = 0; i < side.length; i++) {
				const rest = side.filter((_, j) => j !== i);
				if (connected(rest) && sum(rest) === sum(other)) return true;
			}
	}
	return false;
};

describe("3548. Equal Sum Grid Partition II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			canPartitionGrid([
				[1, 4],
				[2, 3],
			]),
		).toBeTrue();
		expect(
			canPartitionGrid([
				[1, 2],
				[3, 4],
			]),
		).toBeTrue();
		expect(
			canPartitionGrid([
				[1, 2, 4],
				[2, 3, 5],
			]),
		).toBeFalse();
		expect(
			canPartitionGrid([
				[4, 1, 8],
				[3, 2, 6],
			]),
		).toBeFalse();
	});

	it("matches trying every cut and removal on random grids", () => {
		const random = createRandom(3548);
		for (let run = 0; run < 200; run++) {
			const m = random.int(1, 4);
			const n = random.int(m === 1 ? 2 : 1, 4);
			const grid = Array.from({ length: m }, () => random.array(n, 1, 5));
			expect(canPartitionGrid(grid)).toBe(byBruteForce(grid));
		}
	});
});
