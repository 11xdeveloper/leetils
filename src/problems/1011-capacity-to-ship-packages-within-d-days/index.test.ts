import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { capacityToShipPackagesWithinDDays as shipWithinDays } from ".";

describe("1011. Capacity To Ship Packages Within D Days", () => {
	it("solves the examples from the problem statement", () => {
		expect(shipWithinDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5)).toBe(15);
		expect(shipWithinDays([3, 2, 2, 4, 1, 4], 3)).toBe(6);
		expect(shipWithinDays([1, 2, 3, 1, 1], 4)).toBe(3);
	});

	it("matches trying every way to cut the packages into days on random inputs", () => {
		const random = createRandom(1011);
		for (let run = 0; run < 300; run++) {
			const weights = random.array(random.int(1, 9), 1, 10);
			const days = random.int(1, weights.length);
			let best = Number.POSITIVE_INFINITY;
			for (let cuts = 0; cuts < 1 << (weights.length - 1); cuts++) {
				const loads = [0];
				for (const [i, weight] of weights.entries()) {
					loads[loads.length - 1] = (loads.at(-1) ?? 0) + weight;
					if (cuts & (1 << i)) loads.push(0);
				}
				if (loads.length <= days) best = Math.min(best, Math.max(...loads));
			}
			expect(shipWithinDays(weights, days)).toBe(best);
		}
	});
});
