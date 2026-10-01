import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { bestSightseeingPair as maxScoreSightseeingPair } from ".";

describe("1014. Best Sightseeing Pair", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxScoreSightseeingPair([8, 1, 5, 2, 6])).toBe(11);
		expect(maxScoreSightseeingPair([1, 2])).toBe(2);
	});

	it("matches checking every pair on random inputs", () => {
		const random = createRandom(1014);
		for (let run = 0; run < 1000; run++) {
			const values = random.array(random.int(2, 12), 1, 20);
			let expected = Number.NEGATIVE_INFINITY;
			for (let i = 0; i < values.length; i++)
				for (let j = i + 1; j < values.length; j++)
					expected = Math.max(
						expected,
						(values[i] ?? 0) + (values[j] ?? 0) + i - j,
					);
			expect(maxScoreSightseeingPair(values)).toBe(expected);
		}
	});
});
