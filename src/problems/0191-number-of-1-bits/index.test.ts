import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOf1Bits } from ".";

describe("191. Number of 1 Bits", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOf1Bits(11)).toBe(3);
		expect(numberOf1Bits(128)).toBe(1);
		expect(numberOf1Bits(2147483645)).toBe(30);
	});

	it("handles the largest unsigned 32-bit integer", () => {
		expect(numberOf1Bits(2 ** 32 - 1)).toBe(32);
	});

	it("agrees with counting 1s in the binary string on random inputs", () => {
		const random = createRandom(191);
		for (let run = 0; run < 2000; run++) {
			const n = random.int(1, 2 ** 32 - 1);
			expect(numberOf1Bits(n)).toBe(n.toString(2).replaceAll("0", "").length);
		}
	});
});
