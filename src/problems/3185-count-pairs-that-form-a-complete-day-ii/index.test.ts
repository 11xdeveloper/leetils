import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countPairsThatFormACompleteDayII as countCompleteDayPairs } from ".";

describe("3185. Count Pairs That Form a Complete Day II", () => {
	it("solves the examples from the problem statement", () => {
		expect(countCompleteDayPairs([12, 12, 30, 24, 24])).toBe(2);
		expect(countCompleteDayPairs([72, 48, 24, 3])).toBe(3);
	});

	it("matches checking every pair on random hours", () => {
		const random = createRandom(3185);
		for (let run = 0; run < 200; run++) {
			const hours = random.array(random.int(1, 15), 1, 100);
			let pairs = 0;
			for (let i = 0; i < hours.length; i++)
				for (let j = i + 1; j < hours.length; j++)
					if (((hours[i] ?? 0) + (hours[j] ?? 0)) % 24 === 0) pairs++;
			expect(countCompleteDayPairs(hours)).toBe(pairs);
		}
	});
});
