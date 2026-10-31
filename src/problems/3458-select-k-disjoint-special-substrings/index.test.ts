import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { selectKDisjointSpecialSubstrings as maxSubstringLength } from ".";

/** Lists every special substring and finds the most disjoint ones by search. */
const byBruteForce = (s: string, k: number): boolean => {
	const special: [number, number][] = [];
	for (let i = 0; i < s.length; i++)
		for (let j = i; j < s.length; j++) {
			if (j - i + 1 === s.length) continue;
			const inside = new Set(s.slice(i, j + 1));
			if ([...(s.slice(0, i) + s.slice(j + 1))].every((c) => !inside.has(c)))
				special.push([i, j]);
		}
	const most = (from: number, start: number): number => {
		let best = 0;
		for (let t = start; t < special.length; t++) {
			const [a, b] = special[t] ?? [0, 0];
			if (a >= from) best = Math.max(best, 1 + most(b + 1, 0));
		}
		return best;
	};
	return most(0, 0) >= k;
};

describe("3458. Select K Disjoint Special Substrings", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxSubstringLength("abcdbaefab", 2)).toBeTrue();
		expect(maxSubstringLength("cdefdc", 3)).toBeFalse();
		expect(maxSubstringLength("abeabe", 0)).toBeTrue();
	});

	it("matches searching every choice on random strings", () => {
		const random = createRandom(3458);
		for (let run = 0; run < 200; run++) {
			const s = random.string(random.int(2, 8), "abcd");
			const k = random.int(0, 3);
			expect(maxSubstringLength(s, k)).toBe(byBruteForce(s, k));
		}
	});
});
