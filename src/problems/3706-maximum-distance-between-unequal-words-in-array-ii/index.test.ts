import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumDistanceBetweenUnequalWordsInArrayII as maxDistance } from ".";

describe("3706. Maximum Distance Between Unequal Words in Array II", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxDistance(["leetcode", "leetcode", "codeforces"])).toBe(3);
		expect(maxDistance(["a", "b", "c", "a", "a"])).toBe(4);
		expect(maxDistance(["z", "z", "z"])).toBe(0);
	});

	it("matches checking every pair on random words", () => {
		const random = createRandom(3706);
		for (let run = 0; run < 200; run++) {
			const words = Array.from({ length: random.int(1, 8) }, () =>
				random.string(1, "ab"),
			);
			let expected = 0;
			for (let i = 0; i < words.length; i++)
				for (let j = i; j < words.length; j++)
					if (words[i] !== words[j]) expected = Math.max(expected, j - i + 1);
			expect(maxDistance(words)).toBe(expected);
		}
	});
});
