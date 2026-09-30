import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { binaryPrefixDivisibleBy5 as prefixesDivBy5 } from ".";

describe("1018. Binary Prefix Divisible By 5", () => {
	it("solves the examples from the problem statement", () => {
		expect(prefixesDivBy5([0, 1, 1])).toEqual([true, false, false]);
		expect(prefixesDivBy5([1, 1, 1])).toEqual([false, false, false]);
	});

	it("matches BigInt prefixes on random bits", () => {
		const random = createRandom(1018);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 80), 0, 1);
			let value = 0n;
			const expected = nums.map((bit) => {
				value = value * 2n + BigInt(bit);
				return value % 5n === 0n;
			});
			expect(prefixesDivBy5(nums)).toEqual(expected);
		}
	});
});
