import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { applyOperationsToMakeStringEmpty as lastNonEmptyString } from ".";

/** Runs the rounds. */
const byBruteForce = (s: string): string => {
	let current = s;
	for (;;) {
		let next = current;
		for (const letter of "abcdefghijklmnopqrstuvwxyz")
			next = next.replace(letter, "");
		if (next === "") return current;
		current = next;
	}
};

describe("3039. Apply Operations to Make String Empty", () => {
	it("solves the examples from the problem statement", () => {
		expect(lastNonEmptyString("aabcbbca")).toBe("ba");
		expect(lastNonEmptyString("abcd")).toBe("abcd");
	});

	it("matches running the rounds on random strings", () => {
		const random = createRandom(3039);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 15), "abcd");
			expect(lastNonEmptyString(s)).toBe(byBruteForce(s));
		}
	});
});
