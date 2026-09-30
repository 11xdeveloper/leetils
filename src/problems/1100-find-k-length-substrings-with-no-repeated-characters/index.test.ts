import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findKLengthSubstringsWithNoRepeatedCharacters as numKLenSubstrNoRepeats } from ".";

describe("1100. Find K-Length Substrings With No Repeated Characters", () => {
	it("solves the examples from the problem statement", () => {
		expect(numKLenSubstrNoRepeats("havefunonleetcode", 5)).toBe(6);
		expect(numKLenSubstrNoRepeats("home", 5)).toBe(0);
	});

	it("matches checking every window on random strings", () => {
		const random = createRandom(1100);
		for (let run = 0; run < 1000; run++) {
			const s = random.string(random.int(1, 15), "abcd");
			const k = random.int(1, 5);
			let expected = 0;
			for (let i = 0; i + k <= s.length; i++)
				if (new Set(s.slice(i, i + k)).size === k) expected++;
			expect(numKLenSubstrNoRepeats(s, k)).toBe(expected);
		}
	});
});
