import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countPairsOfEqualSubstringsWithMinimumDifference as countQuadruples } from ".";

/** Checks every quadruple. */
const byBruteForce = (first: string, second: string): number => {
	const differences: number[] = [];
	for (let i = 0; i < first.length; i++) {
		for (let j = i; j < first.length; j++) {
			for (let a = 0; a < second.length; a++) {
				const b = a + j - i;
				if (
					b < second.length &&
					first.slice(i, j + 1) === second.slice(a, b + 1)
				)
					differences.push(j - a);
			}
		}
	}
	const smallest = Math.min(...differences);
	return differences.filter((d) => d === smallest).length;
};

describe("1794. Count Pairs of Equal Substrings With Minimum Difference", () => {
	it("solves the examples from the problem statement", () => {
		expect(countQuadruples("abcd", "bccda")).toBe(1);
		expect(countQuadruples("ab", "cd")).toBe(0);
	});

	it("matches checking every quadruple on random inputs", () => {
		const random = createRandom(1794);
		for (let run = 0; run < 300; run++) {
			const first = random.string(random.int(1, 7), "abcd");
			const second = random.string(random.int(1, 7), "abcd");
			expect(countQuadruples(first, second)).toBe(byBruteForce(first, second));
		}
	});
});
