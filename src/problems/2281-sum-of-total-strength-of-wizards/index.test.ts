import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sumOfTotalStrengthOfWizards as totalStrength } from ".";

/** Sums every group directly. */
const byBruteForce = (strength: number[]): number => {
	let total = 0;
	for (let i = 0; i < strength.length; i++) {
		let [low, sum] = [Infinity, 0];
		for (let j = i; j < strength.length; j++) {
			low = Math.min(low, strength[j] ?? 0);
			sum += strength[j] ?? 0;
			total += low * sum;
		}
	}
	return total % 1_000_000_007;
};

describe("2281. Sum of Total Strength of Wizards", () => {
	it("solves the examples from the problem statement", () => {
		expect(totalStrength([1, 3, 1, 2])).toBe(44);
		expect(totalStrength([5, 4, 6])).toBe(213);
	});

	it("matches summing every group on random inputs", () => {
		const random = createRandom(2281);
		for (let run = 0; run < 300; run++) {
			const strength = random.array(random.int(1, 12), 1, 9);
			expect(totalStrength(strength)).toBe(byBruteForce(strength));
		}
	});

	it("reduces large totals", () => {
		const strength = new Array<number>(3).fill(1_000_000_000);
		// Groups: 3 singles, 2 pairs, 1 triple: 10^9 · 10^9 · (3 + 2·2 + 3).
		const expected = Number((10n ** 18n * 10n) % 1_000_000_007n);
		expect(totalStrength(strength)).toBe(expected);
	});
});
