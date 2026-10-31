import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumAmountOfDamageDealtToBob as minDamage } from ".";

/** Tries every order of kills. */
const byBruteForce = (
	power: number,
	damage: number[],
	health: number[],
): number => {
	let best = Number.POSITIVE_INFINITY;
	const permute = (order: number[], used: number): void => {
		if (order.length === damage.length) {
			let elapsed = 0;
			let total = 0;
			for (const i of order) {
				elapsed += Math.ceil((health[i] ?? 0) / power);
				total += (damage[i] ?? 0) * elapsed;
			}
			best = Math.min(best, total);
			return;
		}
		for (let i = 0; i < damage.length; i++)
			if (!((used >> i) & 1)) permute([...order, i], used | (1 << i));
	};
	permute([], 0);
	return best;
};

describe("3273. Minimum Amount of Damage Dealt to Bob", () => {
	it("solves the examples from the problem statement", () => {
		expect(minDamage(4, [1, 2, 3, 4], [4, 5, 6, 8])).toBe(39);
		expect(minDamage(1, [1, 1, 1, 1], [1, 2, 3, 4])).toBe(20);
		expect(minDamage(8, [40], [59])).toBe(320);
	});

	it("matches trying every order on random enemies", () => {
		const random = createRandom(3273);
		for (let run = 0; run < 100; run++) {
			const n = random.int(1, 6);
			const power = random.int(1, 5);
			const damage = random.array(n, 1, 9);
			const health = random.array(n, 1, 12);
			expect(minDamage(power, damage, health)).toBe(
				byBruteForce(power, damage, health),
			);
		}
	});
});
