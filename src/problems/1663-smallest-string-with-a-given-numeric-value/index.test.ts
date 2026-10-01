import { describe, expect, it } from "bun:test";
import { smallestStringWithAGivenNumericValue as getSmallestString } from ".";

/** Every string of length n over a–z. */
const allStrings = (n: number): string[] =>
	n === 0
		? [""]
		: allStrings(n - 1).flatMap((prefix) =>
				[..."abcdefghijklmnopqrstuvwxyz"].map((c) => prefix + c),
			);

describe("1663. Smallest String With A Given Numeric Value", () => {
	it("solves the examples from the problem statement", () => {
		expect(getSmallestString(3, 27)).toBe("aay");
		expect(getSmallestString(5, 73)).toBe("aaszz");
	});

	it("matches the first string with the right value for small inputs", () => {
		const value = (s: string) =>
			[...s].reduce((sum, c) => sum + c.charCodeAt(0) - 96, 0);
		for (let n = 1; n <= 2; n++) {
			const strings = allStrings(n).sort();
			for (let k = n; k <= 26 * n; k++)
				expect(getSmallestString(n, k)).toBe(
					strings.find((s) => value(s) === k) ?? "",
				);
		}
	});
});
