import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumStrongPairXorI } from "../2932-maximum-strong-pair-xor-i";
import { maximumStrongPairXorII as maximumStrongPairXor } from ".";

describe("2935. Maximum Strong Pair XOR II", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumStrongPairXor([1, 2, 3, 4, 5])).toBe(7);
		expect(maximumStrongPairXor([10, 100])).toBe(0);
		expect(maximumStrongPairXor([500, 520, 2500, 3000])).toBe(1020);
	});

	it("matches checking every pair on random inputs", () => {
		const random = createRandom(2935);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 15), 1, 2 ** random.int(2, 19));
			expect(maximumStrongPairXor(nums)).toBe(maximumStrongPairXorI(nums));
		}
	});
});
