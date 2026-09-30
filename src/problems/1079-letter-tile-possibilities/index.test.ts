import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { permutations } from "../0046-permutations";
import { letterTilePossibilities as numTilePossibilities } from ".";

describe("1079. Letter Tile Possibilities", () => {
	it("solves the examples from the problem statement", () => {
		expect(numTilePossibilities("AAB")).toBe(8);
		expect(numTilePossibilities("AAABBC")).toBe(188);
		expect(numTilePossibilities("V")).toBe(1);
	});

	it("matches collecting every arrangement of every subset on random tiles", () => {
		const random = createRandom(1079);
		for (let run = 0; run < 100; run++) {
			const tiles = random.string(random.int(1, 6), "ABC");
			const sequences = new Set<string>();
			for (let mask = 1; mask < 1 << tiles.length; mask++) {
				const chosen = [...tiles].filter((_, i) => mask & (1 << i));
				for (const order of permutations(chosen.map((_, i) => i)))
					sequences.add(order.map((i) => chosen[i]).join(""));
			}
			expect(numTilePossibilities(tiles)).toBe(sequences.size);
		}
	});
});
