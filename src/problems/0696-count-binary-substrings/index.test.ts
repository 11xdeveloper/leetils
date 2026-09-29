import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countBinarySubstrings } from ".";

const byBruteForce = (s: string): number => {
	let count = 0;
	for (let i = 0; i < s.length; i++) {
		for (let length = 2; i + length <= s.length; length += 2) {
			const sub = s.slice(i, i + length);
			const half = length / 2;
			const first = sub.charAt(0);
			const second = first === "0" ? "1" : "0";
			if (sub === first.repeat(half) + second.repeat(half)) count++;
		}
	}
	return count;
};

describe("696. Count Binary Substrings", () => {
	it("solves the examples from the problem statement", () => {
		expect(countBinarySubstrings("00110011")).toBe(6);
		expect(countBinarySubstrings("10101")).toBe(4);
	});

	it("matches checking every substring on random inputs", () => {
		const random = createRandom(696);
		for (let run = 0; run < 1000; run++) {
			const s = random.string(random.int(1, 15), "01");
			expect(countBinarySubstrings(s)).toBe(byBruteForce(s));
		}
	});
});
