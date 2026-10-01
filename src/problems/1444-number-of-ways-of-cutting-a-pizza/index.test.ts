import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfWaysOfCuttingAPizza as ways } from ".";

/** Tries every sequence of cuts on the explicit remaining piece. */
const byBruteForce = (pizza: string[], k: number): number => {
	const hasApple = (rows: string[]) => rows.some((row) => row.includes("A"));
	const cut = (piece: string[], left: number): number => {
		if (left === 1) return hasApple(piece) ? 1 : 0;
		let count = 0;
		for (let r = 1; r < piece.length; r++) {
			if (hasApple(piece.slice(0, r))) count += cut(piece.slice(r), left - 1);
		}
		for (let c = 1; c < (piece[0]?.length ?? 0); c++) {
			if (hasApple(piece.map((row) => row.slice(0, c))))
				count += cut(
					piece.map((row) => row.slice(c)),
					left - 1,
				);
		}
		return count;
	};
	return cut(pizza, k);
};

describe("1444. Number of Ways of Cutting a Pizza", () => {
	it("solves the examples from the problem statement", () => {
		expect(ways(["A..", "AAA", "..."], 3)).toBe(3);
		expect(ways(["A..", "AA.", "..."], 3)).toBe(1);
		expect(ways(["A..", "A..", "..."], 1)).toBe(1);
	});

	it("matches trying every cut on random pizzas", () => {
		const random = createRandom(1444);
		for (let run = 0; run < 200; run++) {
			const [rows, cols] = [random.int(1, 4), random.int(1, 4)];
			const pizza = Array.from({ length: rows }, () =>
				random.string(cols, "A.."),
			);
			const k = random.int(1, 4);
			expect(ways(pizza, k)).toBe(byBruteForce(pizza, k));
		}
	});
});
