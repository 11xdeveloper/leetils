import { describe, expect, it } from "bun:test";
import { paintFence } from ".";

/** Tries every colouring. */
const byBruteForce = (n: number, k: number, colours: number[] = []): number => {
	if (colours.length === n) return 1;
	let ways = 0;
	for (let colour = 0; colour < k; colour++) {
		const [a, b] = colours.slice(-2);
		if (a === colour && b === colour) continue;
		ways += byBruteForce(n, k, [...colours, colour]);
	}
	return ways;
};

describe("276. Paint Fence", () => {
	it("solves the examples from the problem statement", () => {
		expect(paintFence(3, 2)).toBe(6);
		expect(paintFence(1, 1)).toBe(1);
		expect(paintFence(7, 2)).toBe(42);
	});

	it("allows two posts of one colour but not three", () => {
		expect(paintFence(2, 1)).toBe(1);
		expect(paintFence(3, 1)).toBe(0);
	});

	it("matches trying every colouring for small fences", () => {
		for (let n = 1; n <= 7; n++) {
			for (let k = 1; k <= 4; k++)
				expect(paintFence(n, k)).toBe(byBruteForce(n, k));
		}
	});
});
