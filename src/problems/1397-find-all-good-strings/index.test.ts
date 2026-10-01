import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findAllGoodStrings as findGoodStrings } from ".";

/** Walks every string from s1 to s2. */
const byBruteForce = (
	n: number,
	s1: string,
	s2: string,
	evil: string,
): number => {
	let count = 0;
	const chars = [...s1].map((c) => c.charCodeAt(0) - 97);
	for (;;) {
		const s = chars.map((c) => String.fromCharCode(97 + c)).join("");
		if (s > s2) break;
		if (!s.includes(evil)) count++;
		let i = n - 1;
		while (i >= 0 && chars[i] === 25) {
			chars[i] = 0;
			i--;
		}
		if (i < 0) break;
		chars[i] = (chars[i] ?? 0) + 1;
	}
	return count;
};

describe("1397. Find All Good Strings", () => {
	it("solves the examples from the problem statement", () => {
		expect(findGoodStrings(2, "aa", "da", "b")).toBe(51);
		expect(findGoodStrings(8, "leetcode", "leetgoes", "leet")).toBe(0);
		expect(findGoodStrings(2, "gx", "gz", "x")).toBe(2);
	});

	it("counts every string when evil can't fit", () => {
		expect(findGoodStrings(2, "aa", "zz", "abc")).toBe(676);
	});

	it("handles the largest inputs", () => {
		const count = findGoodStrings(
			500,
			"a".repeat(500),
			"z".repeat(500),
			"ab".repeat(25),
		);
		expect(count).toBeGreaterThanOrEqual(0);
		expect(count).toBeLessThan(1_000_000_007);
	});

	it("matches walking every string in random ranges", () => {
		const random = createRandom(1397);
		for (let run = 0; run < 100; run++) {
			const n = random.int(1, 3);
			const [a, b] = [random.string(n, "abcd"), random.string(n, "abcd")];
			const [s1, s2] = a <= b ? [a, b] : [b, a];
			const evil = random.string(random.int(1, 2), "abc");
			expect(findGoodStrings(n, s1, s2, evil)).toBe(
				byBruteForce(n, s1, s2, evil),
			);
		}
	});
});
