import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { cinemaSeatAllocation as maxNumberOfFamilies } from ".";

/** Tries every combination of blocks in each row. */
const byBruteForce = (n: number, reserved: number[][]): number => {
	const blocks = [
		[2, 3, 4, 5],
		[4, 5, 6, 7],
		[6, 7, 8, 9],
	];
	let total = 0;
	for (let row = 1; row <= n; row++) {
		const taken = new Set(
			reserved.filter(([r]) => r === row).map(([, s]) => s),
		);
		let best = 0;
		for (let mask = 0; mask < 8; mask++) {
			const chosen = blocks.filter((_, i) => mask & (1 << i));
			const seats = chosen.flat();
			if (
				new Set(seats).size === seats.length &&
				seats.every((s) => !taken.has(s))
			) {
				best = Math.max(best, chosen.length);
			}
		}
		total += best;
	}
	return total;
};

describe("1386. Cinema Seat Allocation", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxNumberOfFamilies(3, [
				[1, 2],
				[1, 3],
				[1, 8],
				[2, 6],
				[3, 1],
				[3, 10],
			]),
		).toBe(4);
		expect(
			maxNumberOfFamilies(2, [
				[2, 1],
				[1, 8],
				[2, 6],
			]),
		).toBe(2);
		expect(
			maxNumberOfFamilies(4, [
				[4, 3],
				[1, 4],
				[4, 6],
				[1, 7],
			]),
		).toBe(4);
	});

	it("handles a billion rows", () => {
		expect(maxNumberOfFamilies(10 ** 9, [[1, 5]])).toBe(2 * 10 ** 9 - 1);
	});

	it("matches trying every block in every row on random cinemas", () => {
		const random = createRandom(1386);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 5);
			const seats = new Set<string>();
			for (let i = random.int(1, 12); i > 0; i--)
				seats.add(`${random.int(1, n)},${random.int(1, 10)}`);
			const reserved = [...seats].map((seat) => seat.split(",").map(Number));
			expect(maxNumberOfFamilies(n, reserved)).toBe(byBruteForce(n, reserved));
		}
	});
});
