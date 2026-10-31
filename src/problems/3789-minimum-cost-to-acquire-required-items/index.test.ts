import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumCostToAcquireRequiredItems as minimumCost } from ".";

describe("3789. Minimum Cost to Acquire Required Items", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumCost(3, 2, 1, 3, 2)).toBe(3);
		expect(minimumCost(5, 4, 15, 2, 3)).toBe(22);
		expect(minimumCost(5, 4, 15, 0, 0)).toBe(0);
	});

	it("matches trying every bundle count", () => {
		const random = createRandom(3789);
		for (let run = 0; run < 300; run++) {
			const [c1, c2, cb, n1, n2] = [
				random.int(1, 9),
				random.int(1, 9),
				random.int(1, 20),
				random.int(0, 8),
				random.int(0, 8),
			];
			let expected = Number.POSITIVE_INFINITY;
			for (let b = 0; b <= Math.max(n1, n2); b++)
				expected = Math.min(
					expected,
					b * cb + Math.max(0, n1 - b) * c1 + Math.max(0, n2 - b) * c2,
				);
			expect(minimumCost(c1, c2, cb, n1, n2)).toBe(expected);
		}
	});
});
