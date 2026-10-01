import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumNumberOfNonOverlappingSubstrings as maxNumOfSubstrings } from ".";

/** Lists every valid substring, then searches for the most disjoint ones with the least length. */
const byBruteForce = (s: string): [number, number] => {
	const valid: [number, number][] = [];
	for (let i = 0; i < s.length; i++) {
		for (let j = i; j < s.length; j++) {
			const sub = s.slice(i, j + 1);
			if (
				[...new Set(sub)].every(
					(c) => s.split(c).length - 1 === sub.split(c).length - 1,
				)
			)
				valid.push([i, j]);
		}
	}
	let best: [number, number] = [0, 0];
	const choose = (
		from: number,
		after: number,
		count: number,
		length: number,
	): void => {
		if (count > best[0] || (count === best[0] && length < best[1]))
			best = [count, length];
		for (let k = from; k < valid.length; k++) {
			const [i = 0, j = 0] = valid[k] ?? [];
			if (i > after) choose(k + 1, j, count + 1, length + j - i + 1);
		}
	};
	valid.sort((a, b) => a[0] - b[0]);
	choose(0, -1, 0, 0);
	return best;
};

describe("1520. Maximum Number of Non-Overlapping Substrings", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxNumOfSubstrings("adefaddaccc").sort()).toEqual(["ccc", "e", "f"]);
		expect(maxNumOfSubstrings("abbaccd").sort()).toEqual(["bb", "cc", "d"]);
	});

	it("finds the most substrings with the least length on random strings", () => {
		const random = createRandom(1520);
		for (let run = 0; run < 200; run++) {
			const s = random.string(random.int(1, 9), "abcd");
			const result = maxNumOfSubstrings(s);
			// Each result is valid and they don't overlap.
			const spans = result.map((sub) => {
				expect(
					[...new Set(sub)].every(
						(c) => s.split(c).length === sub.split(c).length,
					),
				).toBeTrue();
				return sub;
			});
			const [count, length] = byBruteForce(s);
			expect(spans).toHaveLength(count);
			expect(spans.reduce((sum, sub) => sum + sub.length, 0)).toBe(length);
		}
	});
});
