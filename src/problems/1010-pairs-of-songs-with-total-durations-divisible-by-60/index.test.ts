import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { pairsOfSongsWithTotalDurationsDivisibleBy60 as numPairsDivisibleBy60 } from ".";

describe("1010. Pairs of Songs With Total Durations Divisible by 60", () => {
	it("solves the examples from the problem statement", () => {
		expect(numPairsDivisibleBy60([30, 20, 150, 100, 40])).toBe(3);
		expect(numPairsDivisibleBy60([60, 60, 60])).toBe(3);
	});

	it("matches checking every pair on random inputs", () => {
		const random = createRandom(1010);
		for (let run = 0; run < 500; run++) {
			const time = random.array(random.int(1, 20), 1, 200);
			let expected = 0;
			for (let i = 0; i < time.length; i++)
				for (let j = i + 1; j < time.length; j++)
					if (((time[i] ?? 0) + (time[j] ?? 0)) % 60 === 0) expected++;
			expect(numPairsDivisibleBy60(time)).toBe(expected);
		}
	});
});
