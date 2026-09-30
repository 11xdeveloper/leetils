import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumCandiesYouCanGetFromBoxes as maxCandies } from ".";

/** Keeps sweeping every box until nothing more can be opened. */
const byBruteForce = (
	status: number[],
	candies: number[],
	keys: number[][],
	contained: number[][],
	initial: number[],
): number => {
	const have = new Set(initial);
	const unlocked = new Set(status.flatMap((open, box) => (open ? [box] : [])));
	const opened = new Set<number>();
	for (let changed = true; changed; ) {
		changed = false;
		for (const box of [...have]) {
			if (opened.has(box) || !unlocked.has(box)) continue;
			opened.add(box);
			for (const key of keys[box] ?? []) unlocked.add(key);
			for (const inner of contained[box] ?? []) have.add(inner);
			changed = true;
		}
	}
	return [...opened].reduce((sum, box) => sum + (candies[box] ?? 0), 0);
};

describe("1298. Maximum Candies You Can Get from Boxes", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxCandies(
				[1, 0, 1, 0],
				[7, 5, 4, 100],
				[[], [], [1], []],
				[[1, 2], [3], [], []],
				[0],
			),
		).toBe(16);
		expect(
			maxCandies(
				[1, 0, 0, 0, 0, 0],
				[1, 1, 1, 1, 1, 1],
				[[1, 2, 3, 4, 5], [], [], [], [], []],
				[[1, 2, 3, 4, 5], [], [], [], [], []],
				[0],
			),
		).toBe(6);
	});

	it("opens a box found before its key", () => {
		expect(
			maxCandies([1, 1, 0], [1, 2, 4], [[], [2], []], [[2], [], []], [0, 1]),
		).toBe(7);
	});

	it("matches sweeping until stable on random inputs", () => {
		const random = createRandom(1298);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 7);
			const status = random.array(n, 0, 1);
			const candies = random.array(n, 1, 9);
			const keys = Array.from({ length: n }, () => [
				...new Set(random.array(random.int(0, 2), 0, n - 1)),
			]);
			// Each box sits in at most one other box, or starts in hand, or is lost.
			const contained = Array.from({ length: n }, (): number[] => []);
			const initial: number[] = [];
			for (let box = 0; box < n; box++) {
				const where = random.int(-2, n - 1);
				if (where === -1) initial.push(box);
				else if (where >= 0 && where !== box) contained[where]?.push(box);
			}
			expect(maxCandies(status, candies, keys, contained, initial)).toBe(
				byBruteForce(status, candies, keys, contained, initial),
			);
		}
	});
});
