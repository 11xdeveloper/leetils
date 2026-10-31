import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countGoodIntegersInARange as goodIntegers } from ".";

describe("3966. Count Good Integers in a Range", () => {
	it("solves the examples from the problem statement", () => {
		expect(goodIntegers(10, 15, 1)).toBe(3);
		expect(goodIntegers(201, 204, 2)).toBe(2);
	});

	it("matches checking every number on random ranges", () => {
		const random = createRandom(3966);
		for (let run = 0; run < 100; run++) {
			const l = random.int(10, 50000);
			const r = random.int(l, l + 2000);
			const k = random.int(0, 9);
			let expected = 0;
			for (let x = l; x <= r; x++) {
				const d = String(x);
				if (
					[...d].every(
						(c, i) => i === 0 || Math.abs(Number(c) - Number(d[i - 1])) <= k,
					)
				)
					expected++;
			}
			expect(goodIntegers(l, r, k)).toBe(expected);
		}
	});
});
