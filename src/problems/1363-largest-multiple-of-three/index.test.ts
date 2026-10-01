import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { largestMultipleOfThree } from ".";

/** Tries every subset, arranged largest first, and keeps the biggest multiple of three. */
const byBruteForce = (digits: number[]): string => {
	let best = "";
	const bigger = (a: string, b: string) =>
		a.length > b.length || (a.length === b.length && a > b);
	for (let mask = 1; mask < 2 ** digits.length; mask++) {
		const chosen = digits
			.filter((_, i) => mask & (1 << i))
			.sort((a, b) => b - a);
		if (chosen.reduce((s, d) => s + d, 0) % 3 !== 0) continue;
		const text = chosen.join("").replace(/^0+(?=.)/, "");
		if (best === "" || bigger(text, best)) best = text;
	}
	return best;
};

describe("1363. Largest Multiple of Three", () => {
	it("solves the examples from the problem statement", () => {
		expect(largestMultipleOfThree([8, 1, 9])).toBe("981");
		expect(largestMultipleOfThree([8, 6, 7, 1, 0])).toBe("8760");
		expect(largestMultipleOfThree([1])).toBe("");
	});

	it("collapses zeros and drops two digits when needed", () => {
		expect(largestMultipleOfThree([0, 0, 0])).toBe("0");
		expect(largestMultipleOfThree([2, 2, 1, 1, 1])).toBe("2211");
		expect(largestMultipleOfThree([5, 8])).toBe("");
	});

	it("matches trying every subset on random inputs", () => {
		const random = createRandom(1363);
		for (let run = 0; run < 300; run++) {
			const digits = random.array(random.int(1, 8), 0, 9);
			expect(largestMultipleOfThree(digits)).toBe(byBruteForce(digits));
		}
	});
});
