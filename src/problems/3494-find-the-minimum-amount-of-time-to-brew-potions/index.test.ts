import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheMinimumAmountOfTimeToBrewPotions as minTime } from ".";

/** Searches each potion's start time upwards. */
const byBruteForce = (skill: number[], mana: number[]): number => {
	const free = skill.map(() => 0);
	let end = 0;
	for (const m of mana) {
		for (let start = 0; ; start++) {
			let t = start;
			let ok = true;
			for (let i = 0; i < skill.length; i++) {
				if (t < (free[i] ?? 0)) {
					ok = false;
					break;
				}
				t += (skill[i] ?? 0) * m;
			}
			if (!ok) continue;
			t = start;
			for (let i = 0; i < skill.length; i++) {
				t += (skill[i] ?? 0) * m;
				free[i] = t;
			}
			end = t;
			break;
		}
	}
	return end;
};

describe("3494. Find the Minimum Amount of Time to Brew Potions", () => {
	it("solves the examples from the problem statement", () => {
		expect(minTime([1, 5, 2, 4], [5, 1, 4, 2])).toBe(110);
		expect(minTime([1, 1, 1], [1, 1, 1])).toBe(5);
		expect(minTime([1, 2, 3, 4], [1, 2])).toBe(21);
	});

	it("matches searching start times on random inputs", () => {
		const random = createRandom(3494);
		for (let run = 0; run < 100; run++) {
			const skill = random.array(random.int(1, 4), 1, 4);
			const mana = random.array(random.int(1, 4), 1, 4);
			expect(minTime(skill, mana)).toBe(byBruteForce(skill, mana));
		}
	});
});
