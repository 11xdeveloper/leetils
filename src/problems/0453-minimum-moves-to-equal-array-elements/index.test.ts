import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumMovesToEqualArrayElements as minMoves } from ".";

/** Repeatedly adds 1 to every element except a largest one. */
const bySimulation = (nums: number[]): number => {
	const values = [...nums];
	let moves = 0;
	while (Math.min(...values) !== Math.max(...values)) {
		const largest = values.indexOf(Math.max(...values));
		for (let i = 0; i < values.length; i++)
			if (i !== largest) values[i] = (values[i] ?? 0) + 1;
		moves++;
	}
	return moves;
};

describe("453. Minimum Moves to Equal Array Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(minMoves([1, 2, 3])).toBe(3);
		expect(minMoves([1, 1, 1])).toBe(0);
	});

	it("matches simulating the moves on random inputs", () => {
		const random = createRandom(453);
		for (let run = 0; run < 500; run++) {
			const nums = random.array(random.int(1, 6), -5, 5);
			expect(minMoves(nums)).toBe(bySimulation(nums));
		}
	});
});
