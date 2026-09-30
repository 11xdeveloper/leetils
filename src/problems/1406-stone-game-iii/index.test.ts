import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { stoneGameIII } from ".";

/** Plain minimax over every move. */
const byBruteForce = (values: number[]): string => {
	const lead = (i: number): number => {
		if (i >= values.length) return 0;
		let [best, taken] = [-Infinity, 0];
		for (let k = 0; k < 3 && i + k < values.length; k++) {
			taken += values[i + k] ?? 0;
			best = Math.max(best, taken - lead(i + k + 1));
		}
		return best;
	};
	const result = lead(0);
	return result > 0 ? "Alice" : result < 0 ? "Bob" : "Tie";
};

describe("1406. Stone Game III", () => {
	it("solves the examples from the problem statement", () => {
		expect(stoneGameIII([1, 2, 3, 7])).toBe("Bob");
		expect(stoneGameIII([1, 2, 3, -9])).toBe("Alice");
		expect(stoneGameIII([1, 2, 3, 6])).toBe("Tie");
	});

	it("matches plain minimax on random rows", () => {
		const random = createRandom(1406);
		for (let run = 0; run < 300; run++) {
			const values = random.array(random.int(1, 12), -5, 5);
			expect(stoneGameIII(values)).toBe(byBruteForce(values));
		}
	});
});
