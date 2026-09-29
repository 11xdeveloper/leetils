import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sortCharactersByFrequency as frequencySort } from ".";

/** Whether sorted is a rearrangement of s in runs of non-increasing length, one per character. */
const isValid = (s: string, sorted: string): boolean => {
	if ([...s].sort().join("") !== [...sorted].sort().join("")) return false;
	const runs = sorted.match(/(.)\1*/g) ?? [];
	const seen = new Set(runs.map((run) => run.charAt(0)));
	return (
		seen.size === runs.length &&
		runs.every((run, i) => i === 0 || run.length <= (runs[i - 1]?.length ?? 0))
	);
};

describe("451. Sort Characters By Frequency", () => {
	it("solves the examples from the problem statement", () => {
		expect(["eert", "eetr"]).toContain(frequencySort("tree"));
		expect(["cccaaa", "aaaccc"]).toContain(frequencySort("cccaaa"));
		expect(["bbAa", "bbaA"]).toContain(frequencySort("Aabb"));
	});

	it("gives a valid ordering on random inputs", () => {
		const random = createRandom(451);
		for (let run = 0; run < 1000; run++) {
			const s = random.string(random.int(1, 30), "abcdAB12");
			expect(isValid(s, frequencySort(s))).toBeTrue();
		}
	});
});
