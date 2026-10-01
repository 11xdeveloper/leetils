import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { checkIfAStringContainsAllBinaryCodesOfSizeK as hasAllCodes } from ".";

describe("1461. Check If a String Contains All Binary Codes of Size K", () => {
	it("solves the examples from the problem statement", () => {
		expect(hasAllCodes("00110110", 2)).toBeTrue();
		expect(hasAllCodes("0110", 1)).toBeTrue();
		expect(hasAllCodes("0110", 2)).toBeFalse();
	});

	it("recognises a de Bruijn sequence", () => {
		expect(hasAllCodes("0001110100", 3)).toBeTrue();
	});

	it("matches collecting every substring on random inputs", () => {
		const random = createRandom(1461);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 20), "01");
			const k = random.int(1, 3);
			const codes = new Set<string>();
			for (let i = 0; i + k <= s.length; i++) codes.add(s.slice(i, i + k));
			expect(hasAllCodes(s, k)).toBe(codes.size === 2 ** k);
		}
	});
});
