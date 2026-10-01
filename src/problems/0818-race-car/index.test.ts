import { describe, expect, it } from "bun:test";
import { raceCar as racecar } from ".";

/** Breadth-first search over (position, speed) states, keeping positions within a generous band. */
const bySearch = (target: number): number => {
	const seen = new Set(["0,1"]);
	let frontier = [[0, 1]];
	for (let steps = 0; ; steps++) {
		const next: number[][] = [];
		for (const [position = 0, speed = 0] of frontier) {
			if (position === target) return steps;
			for (const state of [
				[position + speed, speed * 2],
				[position, speed > 0 ? -1 : 1],
			]) {
				const [p = 0] = state;
				if (p < -target - 1 || p > 2 * target + 1 || seen.has(state.join()))
					continue;
				seen.add(state.join());
				next.push(state);
			}
		}
		frontier = next;
	}
};

describe("818. Race Car", () => {
	it("solves the examples from the problem statement", () => {
		expect(racecar(3)).toBe(2);
		expect(racecar(6)).toBe(5);
	});

	it("matches searching every instruction sequence for targets up to 200", () => {
		for (let target = 1; target <= 200; target++)
			expect(racecar(target)).toBe(bySearch(target));
	});

	it("handles the largest input", () => {
		expect(racecar(10_000)).toBe(45);
	});
});
