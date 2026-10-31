import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumXorProduct } from ".";

describe("2939. Maximum Xor Product", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumXorProduct(12, 5, 4)).toBe(98);
		expect(maximumXorProduct(6, 7, 5)).toBe(930);
		expect(maximumXorProduct(1, 6, 3)).toBe(12);
	});

	it("matches trying every x on random inputs", () => {
		const random = createRandom(2939);
		for (let run = 0; run < 200; run++) {
			const n = random.int(0, 8);
			const a = random.int(0, 300);
			const b = random.int(0, 300);
			let best = 0;
			for (let x = 0; x < 2 ** n; x++) best = Math.max(best, (a ^ x) * (b ^ x));
			expect(maximumXorProduct(a, b, n)).toBe(best % 1_000_000_007);
		}
	});
});
