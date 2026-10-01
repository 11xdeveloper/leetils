import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { shortestWayToFormString as shortestWay } from ".";

/** Tries every split of the target into pieces that are subsequences of source. */
const byBruteForce = (source: string, target: string): number => {
	const isSubsequence = (piece: string) => {
		let i = 0;
		for (const char of source) if (char === piece.charAt(i)) i++;
		return i === piece.length;
	};
	const best = new Array<number>(target.length + 1).fill(
		Number.POSITIVE_INFINITY,
	);
	best[0] = 0;
	for (let end = 1; end <= target.length; end++) {
		for (let start = 0; start < end; start++)
			if (isSubsequence(target.slice(start, end)))
				best[end] = Math.min(
					best[end] ?? Infinity,
					(best[start] ?? Infinity) + 1,
				);
	}
	const result = best[target.length] ?? Infinity;
	return result === Number.POSITIVE_INFINITY ? -1 : result;
};

describe("1055. Shortest Way to Form String", () => {
	it("solves the examples from the problem statement", () => {
		expect(shortestWay("abc", "abcbc")).toBe(2);
		expect(shortestWay("abc", "acdbc")).toBe(-1);
		expect(shortestWay("xyz", "xzyxz")).toBe(3);
	});

	it("matches trying every split on random inputs", () => {
		const random = createRandom(1055);
		for (let run = 0; run < 1000; run++) {
			const source = random.string(random.int(1, 5), "abc");
			const target = random.string(random.int(1, 10), "abc");
			expect(shortestWay(source, target)).toBe(byBruteForce(source, target));
		}
	});
});
