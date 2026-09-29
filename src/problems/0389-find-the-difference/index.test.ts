import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheDifference } from ".";

describe("389. Find the Difference", () => {
	it("solves the examples from the problem statement", () => {
		expect(findTheDifference("abcd", "abcde")).toBe("e");
		expect(findTheDifference("", "y")).toBe("y");
	});

	it("finds an added copy of a letter already present", () => {
		expect(findTheDifference("aab", "abaa")).toBe("a");
	});

	it("finds the added letter in random shuffles", () => {
		const random = createRandom(389);
		for (let run = 0; run < 1000; run++) {
			const s = random.string(random.int(0, 10), "abcz");
			const extra = random.string(1, "abcz");
			const t = [...s, extra].toSorted(() => random.next() - 0.5).join("");
			expect(findTheDifference(s, t)).toBe(extra);
		}
	});
});
