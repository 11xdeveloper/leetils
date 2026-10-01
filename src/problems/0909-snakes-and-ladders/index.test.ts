import { describe, expect, it } from "bun:test";
import { snakesAndLadders } from ".";

describe("909. Snakes and Ladders", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			snakesAndLadders([
				[-1, -1, -1, -1, -1, -1],
				[-1, -1, -1, -1, -1, -1],
				[-1, -1, -1, -1, -1, -1],
				[-1, 35, -1, -1, 13, -1],
				[-1, -1, -1, -1, -1, -1],
				[-1, 15, -1, -1, -1, -1],
			]),
		).toBe(4);
		expect(
			snakesAndLadders([
				[-1, -1],
				[-1, 3],
			]),
		).toBe(1);
	});

	it("takes ⌈(n² - 1) / 6⌉ rolls on an empty board", () => {
		for (let n = 2; n <= 10; n++) {
			expect(
				snakesAndLadders(
					Array.from({ length: n }, () => new Array(n).fill(-1)),
				),
			).toBe(Math.ceil((n * n - 1) / 6));
		}
	});

	it("returns -1 when snakes block every route", () => {
		// Squares 2 to 7, everything one roll from square 1 reaches, are snakes back to 1.
		expect(
			snakesAndLadders([
				[1, -1, -1],
				[1, 1, 1],
				[-1, 1, 1],
			]),
		).toBe(-1);
	});
});
