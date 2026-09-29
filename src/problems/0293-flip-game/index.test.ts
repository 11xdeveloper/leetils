import { describe, expect, it } from "bun:test";
import { flipGame } from ".";

describe("293. Flip Game", () => {
	it("solves the examples from the problem statement", () => {
		expect(flipGame("++++")).toEqual(["--++", "+--+", "++--"]);
		expect(flipGame("+")).toEqual([]);
	});

	it("only flips ++ pairs", () => {
		expect(flipGame("+-+-")).toEqual([]);
		expect(flipGame("-++-")).toEqual(["----"]);
	});

	it("returns one state per ++ pair, each differing in exactly that pair", () => {
		const state = "++-+++--++++-";
		const moves = flipGame(state);
		expect(moves).toHaveLength(
			[...state].filter((c, i) => c === "+" && state[i + 1] === "+").length,
		);
		for (const move of moves) {
			const changed = [...state].flatMap((c, i) => (c === move[i] ? [] : [i]));
			expect(changed).toHaveLength(2);
			expect((changed[1] ?? 0) - (changed[0] ?? 0)).toBe(1);
		}
	});
});
