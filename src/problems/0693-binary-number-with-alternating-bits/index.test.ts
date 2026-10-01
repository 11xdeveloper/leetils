import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { binaryNumberWithAlternatingBits as hasAlternatingBits } from ".";

describe("693. Binary Number with Alternating Bits", () => {
	it("solves the examples from the problem statement", () => {
		expect(hasAlternatingBits(5)).toBeTrue();
		expect(hasAlternatingBits(7)).toBeFalse();
		expect(hasAlternatingBits(11)).toBeFalse();
	});

	it("matches checking the binary string on random inputs and at the limit", () => {
		const random = createRandom(693);
		const byString = (n: number) => !/00|11/.test(n.toString(2));
		for (let n = 1; n <= 5000; n++)
			expect(hasAlternatingBits(n)).toBe(byString(n));
		for (let run = 0; run < 1000; run++) {
			const n = random.int(1, 2 ** 31 - 1);
			expect(hasAlternatingBits(n)).toBe(byString(n));
		}
		expect(hasAlternatingBits(0b1010101010101010101010101010101)).toBeTrue();
	});
});
