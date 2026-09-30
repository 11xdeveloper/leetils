import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { compareStringsByFrequencyOfTheSmallestCharacter as numSmallerByFrequency } from ".";

const f = (s: string) => {
	const sorted = [...s].sort();
	return sorted.filter((char) => char === sorted[0]).length;
};

describe("1170. Compare Strings by Frequency of the Smallest Character", () => {
	it("solves the examples from the problem statement", () => {
		expect(numSmallerByFrequency(["cbd"], ["zaaaz"])).toEqual([1]);
		expect(
			numSmallerByFrequency(["bbb", "cc"], ["a", "aa", "aaa", "aaaa"]),
		).toEqual([1, 2]);
	});

	it("handles the longest strings", () => {
		expect(
			numSmallerByFrequency(["a".repeat(10), "a"], ["b".repeat(10)]),
		).toEqual([0, 1]);
	});

	it("matches comparing against every word on random inputs", () => {
		const random = createRandom(1170);
		for (let run = 0; run < 300; run++) {
			const make = () =>
				Array.from({ length: random.int(1, 8) }, () =>
					random.string(random.int(1, 10), "abc"),
				);
			const [queries, words] = [make(), make()];
			expect(numSmallerByFrequency(queries, words)).toEqual(
				queries.map((q) => words.filter((w) => f(q) < f(w)).length),
			);
		}
	});
});
