import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { dota2Senate as predictPartyVictory } from ".";

/** Plays the rounds literally, each senator banning the next opponent due to act. */
const bySimulation = (senate: string): string => {
	const active = [...senate].map((party) => ({ party, banned: false }));
	for (;;) {
		for (const [i, senator] of active.entries()) {
			if (senator.banned) continue;
			const remaining = active.filter((other) => !other.banned);
			if (remaining.every((other) => other.party === senator.party))
				return senator.party === "R" ? "Radiant" : "Dire";
			for (let step = 1; step < active.length; step++) {
				const target = active[(i + step) % active.length];
				if (target && !target.banned && target.party !== senator.party) {
					target.banned = true;
					break;
				}
			}
		}
	}
};

describe("649. Dota2 Senate", () => {
	it("solves the examples from the problem statement", () => {
		expect(predictPartyVictory("RD")).toBe("Radiant");
		expect(predictPartyVictory("RDD")).toBe("Dire");
	});

	it("matches playing the rounds on random senates", () => {
		const random = createRandom(649);
		for (let run = 0; run < 1000; run++) {
			const senate = random.string(random.int(1, 12), "RD");
			expect(predictPartyVictory(senate)).toBe(bySimulation(senate));
		}
	});
});
