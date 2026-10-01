import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfPathsWithMaxScore as pathsWithMaxScore } from ".";

/** Follows every path from S to E. */
const byBruteForce = (board: string[]): number[] => {
	const n = board.length;
	let [best, count] = [-1, 0];
	const walk = (r: number, c: number, sum: number): void => {
		const char = board[r]?.[c];
		if (char === undefined || char === "X") return;
		if (char === "E") {
			if (sum > best) [best, count] = [sum, 1];
			else if (sum === best) count++;
			return;
		}
		const gained = sum + (char === "S" ? 0 : Number(char));
		walk(r - 1, c, gained);
		walk(r, c - 1, gained);
		walk(r - 1, c - 1, gained);
	};
	walk(n - 1, n - 1, 0);
	return count === 0 ? [0, 0] : [best, count];
};

describe("1301. Number of Paths with Max Score", () => {
	it("solves the examples from the problem statement", () => {
		expect(pathsWithMaxScore(["E23", "2X2", "12S"])).toEqual([7, 1]);
		expect(pathsWithMaxScore(["E12", "1X1", "21S"])).toEqual([4, 2]);
		expect(pathsWithMaxScore(["E11", "XXX", "11S"])).toEqual([0, 0]);
	});

	it("counts paths modulo 10^9 + 7 on a board of ones", () => {
		const board = Array.from({ length: 100 }, (_, r) =>
			Array.from({ length: 100 }, (_, c) =>
				r === 0 && c === 0 ? "E" : r === 99 && c === 99 ? "S" : "1",
			).join(""),
		);
		const [score, ways] = pathsWithMaxScore(board);
		// The best paths never go diagonally: they visit 199 cells, 197 of them ones,
		// and choose which 99 of their 198 moves go up.
		let binomial = 1n;
		for (let i = 1n; i <= 99n; i++) binomial = (binomial * (99n + i)) / i;
		expect(score).toBe(197);
		expect(ways).toBe(Number(binomial % 1_000_000_007n));
	});

	it("matches following every path on random boards", () => {
		const random = createRandom(1301);
		for (let run = 0; run < 200; run++) {
			const n = random.int(2, 5);
			const board = Array.from({ length: n }, (_, r) =>
				Array.from({ length: n }, (_, c) => {
					if (r === 0 && c === 0) return "E";
					if (r === n - 1 && c === n - 1) return "S";
					return random.next() < 0.2 ? "X" : String(random.int(1, 3));
				}).join(""),
			);
			expect(pathsWithMaxScore(board)).toEqual(byBruteForce(board));
		}
	});
});
