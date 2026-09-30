import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumCostToMoveChipsToTheSamePosition as minCostToMoveChips } from ".";

describe("1217. Minimum Cost to Move Chips to The Same Position", () => {
	it("solves the examples from the problem statement", () => {
		expect(minCostToMoveChips([1, 2, 3])).toBe(1);
		expect(minCostToMoveChips([2, 2, 2, 3, 3])).toBe(2);
		expect(minCostToMoveChips([1, 1000000000])).toBe(1);
	});

	it("matches trying every gathering position on random inputs", () => {
		const random = createRandom(1217);
		for (let run = 0; run < 300; run++) {
			const position = random.array(random.int(1, 10), 1, 12);
			const costs = Array.from({ length: 12 }, (_, i) =>
				position.reduce((sum, p) => sum + (Math.abs(p - (i + 1)) % 2), 0),
			);
			expect(minCostToMoveChips(position)).toBe(Math.min(...costs));
		}
	});
});
