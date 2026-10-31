import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { checkIfDigitsAreEqualInStringAfterOperationsII as hasSameDigits } from ".";

/** Simulates the operations. */
const byBruteForce = (s: string): boolean => {
	let digits = [...s].map(Number);
	while (digits.length > 2)
		digits = digits.slice(1).map((d, i) => (d + (digits[i] ?? 0)) % 10);
	return digits[0] === digits[1];
};

describe("3463. Check If Digits Are Equal in String After Operations II", () => {
	it("solves the examples from the problem statement", () => {
		expect(hasSameDigits("3902")).toBeTrue();
		expect(hasSameDigits("34789")).toBeFalse();
	});

	it("matches simulating on random strings", () => {
		const random = createRandom(3463);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(3, 60), "0123456789");
			expect(hasSameDigits(s)).toBe(byBruteForce(s));
		}
	});
});
