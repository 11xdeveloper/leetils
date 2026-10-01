import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumRepeatingSubstring as maxRepeating } from ".";

describe("1668. Maximum Repeating Substring", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxRepeating("ababc", "ab")).toBe(2);
		expect(maxRepeating("ababc", "ba")).toBe(1);
		expect(maxRepeating("ababc", "ac")).toBe(0);
	});

	it("matches growing the repetition on random inputs", () => {
		const random = createRandom(1668);
		for (let run = 0; run < 300; run++) {
			const sequence = random.string(random.int(1, 15), "ab");
			const word = random.string(random.int(1, 3), "ab");
			let k = 0;
			while (sequence.includes(word.repeat(k + 1))) k++;
			expect(maxRepeating(sequence, word)).toBe(k);
		}
	});
});
