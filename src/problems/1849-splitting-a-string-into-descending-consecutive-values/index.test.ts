import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { splittingAStringIntoDescendingConsecutiveValues as splitString } from ".";

/** Tries every way to cut the string. */
const byBruteForce = (s: string): boolean => {
	for (let mask = 1; mask < 1 << (s.length - 1); mask++) {
		const parts: bigint[] = [];
		let start = 0;
		for (let i = 1; i <= s.length; i++) {
			if (i === s.length || mask & (1 << (i - 1))) {
				parts.push(BigInt(s.slice(start, i)));
				start = i;
			}
		}
		if (
			parts.every((value, i) => i === 0 || (parts[i - 1] ?? 0n) - value === 1n)
		)
			return true;
	}
	return false;
};

describe("1849. Splitting a String Into Descending Consecutive Values", () => {
	it("solves the examples from the problem statement", () => {
		expect(splitString("1234")).toBeFalse();
		expect(splitString("050043")).toBeTrue();
		expect(splitString("9080701")).toBeFalse();
	});

	it("handles leading and trailing zeros", () => {
		expect(splitString("10009")).toBeTrue();
		expect(splitString("200100")).toBeTrue();
		expect(splitString("2011")).toBeFalse();
		expect(splitString("10")).toBeTrue();
		expect(splitString("1000")).toBeTrue();
		expect(splitString("0090089")).toBeTrue();
	});

	it("matches trying every cut on random strings", () => {
		const random = createRandom(1849);
		for (let run = 0; run < 300; run++) {
			const s = random.int(0, 1)
				? random.string(random.int(1, 10), "0012")
				: Array.from({ length: random.int(2, 4) }, (_, i) =>
						String(20 - i).padStart(random.int(2, 3), "0"),
					).join("");
			expect(splitString(s)).toBe(byBruteForce(s));
		}
	});
});
