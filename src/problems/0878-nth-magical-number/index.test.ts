import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { nthMagicalNumber } from ".";

describe("878. Nth Magical Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(nthMagicalNumber(1, 2, 3)).toBe(2);
		expect(nthMagicalNumber(4, 2, 3)).toBe(6);
	});

	it("matches counting up on random inputs", () => {
		const random = createRandom(878);
		for (let run = 0; run < 500; run++) {
			const [n, a, b] = [
				random.int(1, 200),
				random.int(2, 20),
				random.int(2, 20),
			];
			let count = 0;
			let x = 0;
			while (count < n) {
				x++;
				if (x % a === 0 || x % b === 0) count++;
			}
			expect(nthMagicalNumber(n, a, b)).toBe(x);
		}
	});

	it("reduces large answers modulo 10^9 + 7", () => {
		expect(nthMagicalNumber(10 ** 9, 40_000, 40_000)).toBe(
			(10 ** 9 * 40_000) % 1_000_000_007,
		);
	});
});
