import { describe, expect, it } from "bun:test";
import { eliminationGame } from ".";

const bySimulation = (n: number): number => {
	let numbers = Array.from({ length: n }, (_, i) => i + 1);
	for (let fromLeft = true; numbers.length > 1; fromLeft = !fromLeft) {
		const ordered = fromLeft ? numbers : numbers.toReversed();
		const kept = ordered.filter((_, i) => i % 2 === 1);
		numbers = fromLeft ? kept : kept.toReversed();
	}
	return numbers[0] ?? 0;
};

describe("390. Elimination Game", () => {
	it("solves the examples from the problem statement", () => {
		expect(eliminationGame(9)).toBe(6);
		expect(eliminationGame(1)).toBe(1);
	});

	it("matches simulating the game for every n up to 2000", () => {
		for (let n = 1; n <= 2000; n++)
			expect(eliminationGame(n)).toBe(bySimulation(n));
	});

	it("handles the constraint of 10^9", () => {
		expect(eliminationGame(1e9)).toBe(534765398);
	});
});
