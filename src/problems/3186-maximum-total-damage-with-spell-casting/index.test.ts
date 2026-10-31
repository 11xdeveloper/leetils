import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumTotalDamageWithSpellCasting as maximumTotalDamage } from ".";

/** Tries every subset of distinct damages. */
const byBruteForce = (power: number[]): number => {
	const distinct = [...new Set(power)];
	let best = 0;
	for (let mask = 0; mask < 1 << distinct.length; mask++) {
		const chosen = distinct.filter((_, i) => (mask >> i) & 1);
		if (chosen.some((a) => chosen.some((b) => a !== b && Math.abs(a - b) <= 2)))
			continue;
		best = Math.max(
			best,
			power.filter((p) => chosen.includes(p)).reduce((s, p) => s + p, 0),
		);
	}
	return best;
};

describe("3186. Maximum Total Damage With Spell Casting", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumTotalDamage([1, 1, 3, 4])).toBe(6);
		expect(maximumTotalDamage([7, 1, 6, 6])).toBe(13);
	});

	it("matches trying every choice on random spells", () => {
		const random = createRandom(3186);
		for (let run = 0; run < 300; run++) {
			const power = random.array(random.int(1, 10), 1, 12);
			expect(maximumTotalDamage(power)).toBe(byBruteForce(power));
		}
	});
});
