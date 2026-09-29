import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { decodeWays } from ".";

/** Tries every one- and two-digit code. */
const byRecursion = (s: string): number => {
	if (s === "") return 1;
	if (s[0] === "0") return 0;
	let ways = byRecursion(s.slice(1));
	if (s.length >= 2 && Number(s.slice(0, 2)) <= 26)
		ways += byRecursion(s.slice(2));
	return ways;
};

describe("91. Decode Ways", () => {
	it("solves the examples from the problem statement", () => {
		expect(decodeWays("12")).toBe(2);
		expect(decodeWays("226")).toBe(3);
		expect(decodeWays("06")).toBe(0);
	});

	it("handles zeros", () => {
		expect(decodeWays("0")).toBe(0);
		expect(decodeWays("10")).toBe(1);
		expect(decodeWays("100")).toBe(0);
		expect(decodeWays("2101")).toBe(1);
		expect(decodeWays("30")).toBe(0);
	});

	it("handles 26 and 27", () => {
		expect(decodeWays("26")).toBe(2);
		expect(decodeWays("27")).toBe(1);
	});

	it("matches trying every code on random inputs", () => {
		const random = createRandom(91);
		for (let run = 0; run < 1000; run++) {
			const s = random.string(random.int(1, 15), "0012345678926");
			expect(decodeWays(s)).toBe(byRecursion(s));
		}
	});
});
