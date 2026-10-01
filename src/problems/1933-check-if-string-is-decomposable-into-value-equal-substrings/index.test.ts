import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { checkIfStringIsDecomposableIntoValueEqualSubstrings as isDecomposable } from ".";

/** Tries every split into pieces of length 2 and 3. */
const byBruteForce = (s: string): boolean => {
	const split = (i: number, usedTwo: boolean): boolean => {
		if (i === s.length) return usedTwo;
		const equal = (length: number) =>
			i + length <= s.length && new Set(s.slice(i, i + length)).size === 1;
		return (
			(equal(3) && split(i + 3, usedTwo)) ||
			(!usedTwo && equal(2) && split(i + 2, true))
		);
	};
	return split(0, false);
};

describe("1933. Check if String Is Decomposable Into Value-Equal Substrings", () => {
	it("solves the examples from the problem statement", () => {
		expect(isDecomposable("000111000")).toBeFalse();
		expect(isDecomposable("00011111222")).toBeTrue();
		expect(isDecomposable("011100022233")).toBeFalse();
	});

	it("matches trying every split on random strings", () => {
		const random = createRandom(1933);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 14), "0001");
			expect(isDecomposable(s)).toBe(byBruteForce(s));
		}
	});
});
