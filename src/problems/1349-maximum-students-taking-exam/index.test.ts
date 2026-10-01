import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumStudentsTakingExam as maxStudents } from ".";

/** Tries every set of working seats. */
const byBruteForce = (seats: string[][]): number => {
	const cells = seats.flatMap((row, r) =>
		row.flatMap((seat, c) => (seat === "." ? [[r, c] as const] : [])),
	);
	let best = 0;
	for (let mask = 0; mask < 2 ** cells.length; mask++) {
		const taken = cells.filter((_, i) => mask & (1 << i));
		const occupied = new Set(taken.map(([r, c]) => `${r},${c}`));
		const cheats = taken.some(([r, c]) =>
			[
				[r, c - 1],
				[r, c + 1],
				[r - 1, c - 1],
				[r - 1, c + 1],
			].some(([r2, c2]) => occupied.has(`${r2},${c2}`)),
		);
		if (!cheats) best = Math.max(best, taken.length);
	}
	return best;
};

const parse = (rows: string[]) => rows.map((row) => [...row]);

describe("1349. Maximum Students Taking Exam", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxStudents(parse(["#.##.#", ".####.", "#.##.#"]))).toBe(4);
		expect(maxStudents(parse([".#", "##", "#.", "##", ".#"]))).toBe(3);
		expect(
			maxStudents(parse(["#...#", ".#.#.", "..#..", ".#.#.", "#...#"])),
		).toBe(10);
	});

	it("handles an 8 × 8 room of working seats", () => {
		// Every other column, all rows: no one is beside or diagonally in front of anyone.
		expect(maxStudents(parse(new Array<string>(8).fill("........")))).toBe(32);
	});

	it("matches trying every seating on random rooms", () => {
		const random = createRandom(1349);
		for (let run = 0; run < 150; run++) {
			const [m, n] = [random.int(1, 4), random.int(1, 4)];
			const seats = Array.from({ length: m }, () =>
				Array.from({ length: n }, () => (random.next() < 0.3 ? "#" : ".")),
			);
			expect(maxStudents(seats)).toBe(byBruteForce(seats));
		}
	});
});
