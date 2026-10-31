import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestCommonPrefixBetweenAdjacentStringsAfterRemovals as longestCommonPrefix } from ".";

/** Removes each word and checks every pair. */
const byBruteForce = (words: string[]): number[] =>
	words.map((_, i) => {
		const rest = words.filter((_, j) => j !== i);
		let best = 0;
		for (let j = 0; j + 1 < rest.length; j++) {
			const [a = "", b = ""] = [rest[j], rest[j + 1]];
			let length = 0;
			while (length < a.length && a[length] === b[length]) length++;
			best = Math.max(best, length);
		}
		return best;
	});

describe("3598. Longest Common Prefix Between Adjacent Strings After Removals", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestCommonPrefix(["jump", "run", "run", "jump", "run"])).toEqual([
			3, 0, 0, 3, 3,
		]);
		expect(longestCommonPrefix(["dog", "racer", "car"])).toEqual([0, 0, 0]);
	});

	it("matches checking every pair on random words", () => {
		const random = createRandom(3598);
		for (let run = 0; run < 200; run++) {
			const words = Array.from({ length: random.int(1, 7) }, () =>
				random.string(random.int(1, 4), "ab"),
			);
			expect(longestCommonPrefix(words)).toEqual(byBruteForce(words));
		}
	});
});
