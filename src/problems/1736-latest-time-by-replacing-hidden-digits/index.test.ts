import { describe, expect, it } from "bun:test";
import { latestTimeByReplacingHiddenDigits as maximumTime } from ".";

/** The latest time matching the pattern, by trying every time of day. */
const byBruteForce = (time: string): string => {
	for (let minutes = 24 * 60 - 1; minutes >= 0; minutes--) {
		const candidate = `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
		if ([...time].every((char, i) => char === "?" || char === candidate[i]))
			return candidate;
	}
	return "";
};

describe("1736. Latest Time by Replacing Hidden Digits", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumTime("2?:?0")).toBe("23:50");
		expect(maximumTime("0?:3?")).toBe("09:39");
		expect(maximumTime("1?:22")).toBe("19:22");
	});

	it("matches trying every time for every valid pattern", () => {
		for (let minutes = 0; minutes < 24 * 60; minutes++) {
			const time = `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
			for (let mask = 0; mask < 16; mask++) {
				const pattern = [...time]
					.map((char, i) =>
						i !== 2 && mask & (1 << (i > 2 ? i - 1 : i)) ? "?" : char,
					)
					.join("");
				expect(maximumTime(pattern)).toBe(byBruteForce(pattern));
			}
		}
	});
});
