import { describe, expect, it } from "bun:test";
import { permutations } from "../0046-permutations";
import { slidingPuzzle } from ".";

describe("773. Sliding Puzzle", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			slidingPuzzle([
				[1, 2, 3],
				[4, 0, 5],
			]),
		).toBe(1);
		expect(
			slidingPuzzle([
				[1, 2, 3],
				[5, 4, 0],
			]),
		).toBe(-1);
		expect(
			slidingPuzzle([
				[4, 1, 2],
				[5, 0, 3],
			]),
		).toBe(5);
	});

	it("solves exactly the half of all arrangements with the solvable parity", () => {
		let solvable = 0;
		for (const arrangement of permutations([0, 1, 2, 3, 4, 5])) {
			const moves = slidingPuzzle([
				arrangement.slice(0, 3),
				arrangement.slice(3),
			]);
			const tiles = arrangement.filter((tile) => tile !== 0);
			let inversions = 0;
			for (let i = 0; i < tiles.length; i++)
				for (let j = i + 1; j < tiles.length; j++)
					if ((tiles[i] ?? 0) > (tiles[j] ?? 0)) inversions++;
			// On a board 3 wide, a move never changes the parity of inversions among the tiles.
			expect(moves === -1).toBe(inversions % 2 === 1);
			if (moves !== -1) solvable++;
		}
		expect(solvable).toBe(360);
	});
});
