import { describe, expect, it } from "bun:test";
import { longestHappyString as longestDiverseString } from ".";

/** The longest possible length, by dynamic programming over counts and the ending run. */
const longestLength = (a: number, b: number, c: number): number => {
	const memo = new Map<string, number>();
	const best = (counts: number[], last: number, run: number): number => {
		const key = `${counts.join(",")}|${last}|${run}`;
		const cached = memo.get(key);
		if (cached !== undefined) return cached;
		let most = 0;
		counts.forEach((count, letter) => {
			if (count === 0 || (letter === last && run === 2)) return;
			most = Math.max(
				most,
				1 +
					best(
						counts.with(letter, count - 1),
						letter,
						letter === last ? run + 1 : 1,
					),
			);
		});
		memo.set(key, most);
		return most;
	};
	return best([a, b, c], -1, 0);
};

const expectLongest = (a: number, b: number, c: number) => {
	const s = longestDiverseString(a, b, c);
	expect(s).not.toMatch(/aaa|bbb|ccc/);
	expect(s.split("a").length - 1).toBeLessThanOrEqual(a);
	expect(s.split("b").length - 1).toBeLessThanOrEqual(b);
	expect(s.split("c").length - 1).toBeLessThanOrEqual(c);
	expect(s).toHaveLength(longestLength(a, b, c));
};

describe("1405. Longest Happy String", () => {
	it("solves the examples from the problem statement", () => {
		expectLongest(1, 1, 7);
		expectLongest(7, 1, 0);
	});

	it("builds a longest happy string for every count up to 6", () => {
		for (let a = 0; a <= 6; a++) {
			for (let b = 0; b <= 6; b++) {
				for (let c = 0; c <= 6; c++) if (a + b + c > 0) expectLongest(a, b, c);
			}
		}
	});

	it("handles the largest counts", () => {
		expect(longestDiverseString(100, 100, 100)).toHaveLength(300);
		expect(longestDiverseString(100, 0, 0)).toBe("aa");
	});
});
