import { describe, expect, it } from "bun:test";
import { stringWithoutAaaOrBbb as strWithout3a3b } from ".";

describe("984. String Without AAA or BBB", () => {
	it("solves the examples from the problem statement", () => {
		const first = strWithout3a3b(1, 2);
		expect([...first].sort().join("")).toBe("abb");
		expect(strWithout3a3b(4, 1)).toBe("aabaa");
	});

	it("gives a valid string for every solvable pair of counts up to 30", () => {
		for (let a = 0; a <= 30; a++) {
			for (let b = 0; b <= 30; b++) {
				if (a > 2 * (b + 1) || b > 2 * (a + 1)) continue;
				const result = strWithout3a3b(a, b);
				expect([...result].filter((c) => c === "a")).toHaveLength(a);
				expect([...result].filter((c) => c === "b")).toHaveLength(b);
				expect(/aaa|bbb/.test(result)).toBeFalse();
			}
		}
	});
});
