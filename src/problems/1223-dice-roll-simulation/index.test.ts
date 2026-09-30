import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { diceRollSimulation as dieSimulator } from ".";

/** Enumerates every sequence of rolls. */
const byBruteForce = (n: number, rollMax: number[]): number => {
	let count = 0;
	const extend = (length: number, last: number, run: number): void => {
		if (length === n) {
			count++;
			return;
		}
		for (let face = 0; face < 6; face++) {
			const nextRun = face === last ? run + 1 : 1;
			if (nextRun <= (rollMax[face] ?? 0)) extend(length + 1, face, nextRun);
		}
	};
	extend(0, -1, 0);
	return count;
};

describe("1223. Dice Roll Simulation", () => {
	it("solves the examples from the problem statement", () => {
		expect(dieSimulator(2, [1, 1, 2, 2, 2, 3])).toBe(34);
		expect(dieSimulator(2, [1, 1, 1, 1, 1, 1])).toBe(30);
		expect(dieSimulator(3, [1, 1, 1, 2, 2, 3])).toBe(181);
	});

	it("counts every sequence when no limit bites", () => {
		expect(dieSimulator(5, [15, 15, 15, 15, 15, 15])).toBe(6 ** 5);
		expect(dieSimulator(4, [1, 1, 1, 1, 1, 1])).toBe(6 * 5 ** 3);
	});

	it("matches enumerating sequences on random inputs", () => {
		const random = createRandom(1223);
		for (let run = 0; run < 100; run++) {
			const n = random.int(1, 6);
			const rollMax = random.array(6, 1, 3);
			expect(dieSimulator(n, rollMax)).toBe(byBruteForce(n, rollMax));
		}
	});
});
