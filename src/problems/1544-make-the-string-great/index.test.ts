import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { makeTheStringGreat as makeGood } from ".";

/** Removes the first bad pair until none are left. */
const byBruteForce = (s: string): string => {
	let current = s;
	for (;;) {
		const i = [...current].findIndex(
			(c, j) =>
				j + 1 < current.length &&
				c !== current[j + 1] &&
				c.toLowerCase() === current[j + 1]?.toLowerCase(),
		);
		if (i === -1) return current;
		current = current.slice(0, i) + current.slice(i + 2);
	}
};

describe("1544. Make The String Great", () => {
	it("solves the examples from the problem statement", () => {
		expect(makeGood("leEeetcode")).toBe("leetcode");
		expect(makeGood("abBAcC")).toBe("");
		expect(makeGood("s")).toBe("s");
	});

	it("matches removing pairs one at a time on random inputs", () => {
		const random = createRandom(1544);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 15), "aAbB");
			expect(makeGood(s)).toBe(byBruteForce(s));
		}
	});
});
