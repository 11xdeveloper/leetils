import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { cuttingRibbons as maxLength } from ".";

describe("1891. Cutting Ribbons", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxLength([9, 7, 5], 3)).toBe(5);
		expect(maxLength([7, 5, 9], 4)).toBe(4);
		expect(maxLength([5, 7, 9], 22)).toBe(0);
	});

	it("matches trying every length on random inputs", () => {
		const random = createRandom(1891);
		for (let run = 0; run < 200; run++) {
			const ribbons = random.array(random.int(1, 6), 1, 30);
			const k = random.int(1, 20);
			let best = 0;
			for (let x = 1; x <= 30; x++)
				if (ribbons.reduce((s, r) => s + Math.floor(r / x), 0) >= k) best = x;
			expect(maxLength(ribbons, k)).toBe(best);
		}
	});
});
