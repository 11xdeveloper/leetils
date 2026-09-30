import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumNumberOfDaysToMakeMBouquets as minDays } from ".";

/** Tries every day upwards. */
const byBruteForce = (bloomDay: number[], m: number, k: number): number => {
	for (let day = 1; day <= Math.max(...bloomDay); day++) {
		let [made, run] = [0, 0];
		for (const bloom of bloomDay) {
			run = bloom <= day ? run + 1 : 0;
			if (run === k) [made, run] = [made + 1, 0];
		}
		if (made >= m) return day;
	}
	return -1;
};

describe("1482. Minimum Number of Days to Make m Bouquets", () => {
	it("solves the examples from the problem statement", () => {
		expect(minDays([1, 10, 3, 10, 2], 3, 1)).toBe(3);
		expect(minDays([1, 10, 3, 10, 2], 3, 2)).toBe(-1);
		expect(minDays([7, 7, 7, 7, 12, 7, 7], 2, 3)).toBe(12);
	});

	it("matches trying every day on random gardens", () => {
		const random = createRandom(1482);
		for (let run = 0; run < 300; run++) {
			const bloomDay = random.array(random.int(1, 12), 1, 15);
			const [m, k] = [random.int(1, 4), random.int(1, 4)];
			expect(minDays(bloomDay, m, k)).toBe(byBruteForce(bloomDay, m, k));
		}
	});
});
