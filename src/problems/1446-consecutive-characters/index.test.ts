import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { consecutiveCharacters as maxPower } from ".";

describe("1446. Consecutive Characters", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxPower("leetcode")).toBe(2);
		expect(maxPower("abbcccddddeeeeedcba")).toBe(5);
	});

	it("matches the longest regex run on random inputs", () => {
		const random = createRandom(1446);
		for (let run = 0; run < 200; run++) {
			const s = random.string(random.int(1, 20), "ab");
			expect(maxPower(s)).toBe(
				Math.max(...(s.match(/(.)\1*/g) ?? []).map((r) => r.length)),
			);
		}
	});
});
