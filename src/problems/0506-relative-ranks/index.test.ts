import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { relativeRanks as findRelativeRanks } from ".";

describe("506. Relative Ranks", () => {
	it("solves the examples from the problem statement", () => {
		expect(findRelativeRanks([5, 4, 3, 2, 1])).toEqual([
			"Gold Medal",
			"Silver Medal",
			"Bronze Medal",
			"4",
			"5",
		]);
		expect(findRelativeRanks([10, 3, 8, 9, 4])).toEqual([
			"Gold Medal",
			"5",
			"Bronze Medal",
			"Silver Medal",
			"4",
		]);
		expect(findRelativeRanks([1])).toEqual(["Gold Medal"]);
	});

	it("matches counting higher scores on random inputs", () => {
		const random = createRandom(506);
		const names = ["Gold Medal", "Silver Medal", "Bronze Medal"];
		for (let run = 0; run < 500; run++) {
			const score = [...new Set(random.array(random.int(1, 10), 0, 50))];
			const expected = score.map((s) => {
				const place = score.filter((other) => other > s).length;
				return names[place] ?? String(place + 1);
			});
			expect(findRelativeRanks(score)).toEqual(expected);
		}
	});
});
