import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumDeletionsOnAString as deleteString } from ".";

/** Memoised search over suffixes, comparing prefixes directly. */
const byBruteForce = (s: string): number => {
	const memo = new Map<number, number>();
	const most = (i: number): number => {
		const cached = memo.get(i);
		if (cached !== undefined) return cached;
		let best = 1;
		for (let l = 1; i + 2 * l <= s.length; l++)
			if (s.slice(i, i + l) === s.slice(i + l, i + 2 * l))
				best = Math.max(best, 1 + most(i + l));
		memo.set(i, best);
		return best;
	};
	return most(0);
};

describe("2430. Maximum Deletions on a String", () => {
	it("solves the examples from the problem statement", () => {
		expect(deleteString("abcabcdabc")).toBe(2);
		expect(deleteString("aaabaab")).toBe(4);
		expect(deleteString("aaaaa")).toBe(5);
	});

	it("matches a direct search on random strings", () => {
		const random = createRandom(2430);
		for (let run = 0; run < 200; run++) {
			const s = random.string(random.int(1, 14), "ab");
			expect(deleteString(s)).toBe(byBruteForce(s));
		}
	});
});
