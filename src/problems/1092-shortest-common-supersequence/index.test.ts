import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { shortestCommonSupersequence } from ".";

const isSubsequence = (short: string, long: string): boolean => {
	let i = 0;
	for (const char of long) if (char === short.charAt(i)) i++;
	return i === short.length;
};

describe("1092. Shortest Common Supersequence ", () => {
	it("solves the examples from the problem statement", () => {
		expect(shortestCommonSupersequence("abac", "cab")).toHaveLength(5);
		expect(shortestCommonSupersequence("aaaaaaaa", "aaaaaaaa")).toBe(
			"aaaaaaaa",
		);
	});

	it("gives a supersequence of the shortest length on random strings", () => {
		const random = createRandom(1092);
		for (let run = 0; run < 1000; run++) {
			const [a, b] = [
				random.string(random.int(1, 8), "abc"),
				random.string(random.int(1, 8), "abc"),
			];
			const lcs = (i: number, j: number): number =>
				i === a.length || j === b.length
					? 0
					: a[i] === b[j]
						? 1 + lcs(i + 1, j + 1)
						: Math.max(lcs(i + 1, j), lcs(i, j + 1));
			const result = shortestCommonSupersequence(a, b);
			expect(isSubsequence(a, result)).toBeTrue();
			expect(isSubsequence(b, result)).toBeTrue();
			expect(result).toHaveLength(a.length + b.length - lcs(0, 0));
		}
	});
});
