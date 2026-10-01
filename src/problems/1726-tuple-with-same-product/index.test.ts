import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { tupleWithSameProduct as tupleSameProduct } from ".";

describe("1726. Tuple with Same Product", () => {
	it("solves the examples from the problem statement", () => {
		expect(tupleSameProduct([2, 3, 4, 6])).toBe(8);
		expect(tupleSameProduct([1, 2, 4, 5, 10])).toBe(16);
	});

	it("matches checking every tuple on random inputs", () => {
		const random = createRandom(1726);
		for (let run = 0; run < 100; run++) {
			const nums = [...new Set(random.array(random.int(1, 8), 1, 12))];
			let tuples = 0;
			for (const a of nums)
				for (const b of nums)
					for (const c of nums)
						for (const d of nums) {
							if (new Set([a, b, c, d]).size === 4 && a * b === c * d) tuples++;
						}
			expect(tupleSameProduct(nums)).toBe(tuples);
		}
	});
});
