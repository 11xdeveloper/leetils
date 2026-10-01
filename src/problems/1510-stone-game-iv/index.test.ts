import { describe, expect, it } from "bun:test";
import { stoneGameIV as winnerSquareGame } from ".";

/** Plain recursion with memoisation, written as a separate search. */
const memo = new Map<number, boolean>();
const byBruteForce = (n: number): boolean => {
	if (n === 0) return false;
	const cached = memo.get(n);
	if (cached !== undefined) return cached;
	let win = false;
	for (let root = 1; root * root <= n && !win; root++)
		win = !byBruteForce(n - root * root);
	memo.set(n, win);
	return win;
};

describe("1510. Stone Game IV", () => {
	it("solves the examples from the problem statement", () => {
		expect(winnerSquareGame(1)).toBeTrue();
		expect(winnerSquareGame(2)).toBeFalse();
		expect(winnerSquareGame(4)).toBeTrue();
	});

	it("loses on the known early losing positions", () => {
		const losing = Array.from({ length: 40 }, (_, i) => i + 1).filter(
			(n) => !winnerSquareGame(n),
		);
		expect(losing).toEqual([2, 5, 7, 10, 12, 15, 17, 20, 22, 34, 39]);
	});

	it("matches a recursive search up to 2000", () => {
		for (let n = 1; n <= 2000; n++)
			expect(winnerSquareGame(n)).toBe(byBruteForce(n));
	});
});
