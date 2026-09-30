import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { permutations } from "../0046-permutations";
import { reorderedPowerOf2 } from ".";

describe("869. Reordered Power of 2", () => {
	it("solves the examples from the problem statement", () => {
		expect(reorderedPowerOf2(1)).toBeTrue();
		expect(reorderedPowerOf2(10)).toBeFalse();
	});

	it("matches trying every rearrangement on random inputs", () => {
		const random = createRandom(869);
		for (let run = 0; run < 500; run++) {
			const n = random.int(1, 10 ** 6);
			const expected = permutations([...String(n)].map(Number)).some(
				(digits) => {
					if (digits[0] === 0) return false;
					const value = Number(digits.join(""));
					return (value & (value - 1)) === 0;
				},
			);
			expect(reorderedPowerOf2(n)).toBe(expected);
		}
	});
});
