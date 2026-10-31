import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumDifferenceBetweenEvenAndOddFrequencyII as maxDifference } from ".";

/** Checks every long enough substring and letter pair. */
const byBruteForce = (s: string, k: number): number => {
	let best = Number.NEGATIVE_INFINITY;
	for (let i = 0; i < s.length; i++)
		for (let j = i + k; j <= s.length; j++) {
			const counts = new Array<number>(5).fill(0);
			for (let t = i; t < j; t++)
				counts[Number(s[t])] = (counts[Number(s[t])] ?? 0) + 1;
			for (const a of counts)
				for (const b of counts)
					if (a % 2 === 1 && b > 0 && b % 2 === 0) best = Math.max(best, a - b);
		}
	return best;
};

describe("3445. Maximum Difference Between Even and Odd Frequency II", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxDifference("12233", 4)).toBe(-1);
		expect(maxDifference("1122211", 3)).toBe(1);
		expect(maxDifference("110", 3)).toBe(-1);
	});

	it("matches checking every substring on random strings", () => {
		const random = createRandom(3445);
		for (let run = 0; run < 200; run++) {
			let s = random.string(random.int(3, 12), "012");
			if (!/(.).*(?!\1)./.test(s)) s += s.startsWith("0") ? "11" : "00";
			const k = random.int(1, s.length);
			const expected = byBruteForce(s, k);
			if (expected === Number.NEGATIVE_INFINITY) continue;
			expect(maxDifference(s, k)).toBe(expected);
		}
	});
});
