import { describe, expect, it } from "bun:test";
import { waterAndJugProblem } from ".";

/** Breadth-first search over every (jug1, jug2) state. */
const bySearch = (x: number, y: number, target: number): boolean => {
	const seen = new Set(["0,0"]);
	const queue: [number, number][] = [[0, 0]];
	for (let head = 0; head < queue.length; head++) {
		const [a, b] = queue[head] ?? [0, 0];
		if (a + b === target) return true;
		const pourIntoB = Math.min(a, y - b);
		const pourIntoA = Math.min(b, x - a);
		for (const [na, nb] of [
			[x, b],
			[a, y],
			[0, b],
			[a, 0],
			[a - pourIntoB, b + pourIntoB],
			[a + pourIntoA, b - pourIntoA],
		] as const) {
			if (!seen.has(`${na},${nb}`)) {
				seen.add(`${na},${nb}`);
				queue.push([na, nb]);
			}
		}
	}
	return false;
};

describe("365. Water and Jug Problem", () => {
	it("solves the examples from the problem statement", () => {
		expect(waterAndJugProblem(3, 5, 4)).toBeTrue();
		expect(waterAndJugProblem(2, 6, 5)).toBeFalse();
		expect(waterAndJugProblem(1, 2, 3)).toBeTrue();
	});

	it("matches searching every state for small jugs", () => {
		for (let x = 1; x <= 12; x++) {
			for (let y = 1; y <= 12; y++) {
				for (let target = 1; target <= 26; target++) {
					expect(waterAndJugProblem(x, y, target)).toBe(bySearch(x, y, target));
				}
			}
		}
	});
});
