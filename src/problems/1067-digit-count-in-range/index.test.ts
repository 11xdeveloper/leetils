import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { digitCountInRange as digitsCount } from ".";

describe("1067. Digit Count in Range", () => {
	it("solves the examples from the problem statement", () => {
		expect(digitsCount(1, 1, 13)).toBe(6);
		expect(digitsCount(3, 100, 250)).toBe(35);
	});

	it("matches counting digits of every number on random ranges", () => {
		const random = createRandom(1067);
		for (let run = 0; run < 500; run++) {
			const d = random.int(0, 9);
			const low = random.int(1, 3000);
			const high = random.int(low, 3000);
			let expected = 0;
			for (let x = low; x <= high; x++)
				expected += [...String(x)].filter((c) => Number(c) === d).length;
			expect(digitsCount(d, low, high)).toBe(expected);
		}
	});
});
