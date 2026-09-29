import { describe, expect, it } from "bun:test";
import { perfectSquares } from ".";

describe("279. Perfect Squares", () => {
	it("solves the examples from the problem statement", () => {
		expect(perfectSquares(12)).toBe(3);
		expect(perfectSquares(13)).toBe(2);
	});

	it("returns 1 for squares and 4 for numbers of the form 4^a(8b + 7)", () => {
		expect(perfectSquares(1)).toBe(1);
		expect(perfectSquares(10_000)).toBe(1);
		expect(perfectSquares(7)).toBe(4);
		expect(perfectSquares(28)).toBe(4);
	});

	it("matches dynamic programming for every n up to the constraint of 10^4", () => {
		const fewest = [0];
		for (let n = 1; n <= 10_000; n++) {
			let best = n;
			for (let root = 1; root * root <= n; root++)
				best = Math.min(best, (fewest[n - root * root] ?? 0) + 1);
			fewest.push(best);
			expect(perfectSquares(n)).toBe(best);
		}
	});
});
