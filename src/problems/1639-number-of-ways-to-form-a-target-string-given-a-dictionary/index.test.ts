import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfWaysToFormATargetStringGivenADictionary as numWays } from ".";

/** Picks each target character's word and column directly. */
const byBruteForce = (words: string[], target: string): number => {
	const pick = (i: number, from: number): number => {
		if (i === target.length) return 1;
		let ways = 0;
		for (let k = from; k < (words[0]?.length ?? 0); k++) {
			for (const word of words)
				if (word[k] === target[i]) ways += pick(i + 1, k + 1);
		}
		return ways;
	};
	return pick(0, 0);
};

describe("1639. Number of Ways to Form a Target String Given a Dictionary", () => {
	it("solves the examples from the problem statement", () => {
		expect(numWays(["acca", "bbbb", "caca"], "aba")).toBe(6);
		expect(numWays(["abba", "baab"], "bab")).toBe(4);
	});

	it("matches picking every character directly on random inputs", () => {
		const random = createRandom(1639);
		for (let run = 0; run < 200; run++) {
			const length = random.int(1, 6);
			const words = Array.from({ length: random.int(1, 3) }, () =>
				random.string(length, "ab"),
			);
			const target = random.string(random.int(1, length), "ab");
			expect(numWays(words, target)).toBe(byBruteForce(words, target));
		}
	});

	it("reduces large counts modulo 10^9 + 7", () => {
		const words = new Array(1000).fill("a".repeat(1000));
		expect(numWays(words, "a".repeat(5))).toBeLessThan(1_000_000_007);
	});
});
