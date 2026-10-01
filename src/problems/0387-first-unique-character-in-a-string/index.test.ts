import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { firstUniqueCharacterInAString as firstUnique } from ".";

describe("387. First Unique Character in a String", () => {
	it("solves the examples from the problem statement", () => {
		expect(firstUnique("leetcode")).toBe(0);
		expect(firstUnique("loveleetcode")).toBe(2);
		expect(firstUnique("aabb")).toBe(-1);
	});

	it("matches indexOf and lastIndexOf on random inputs", () => {
		const random = createRandom(387);
		for (let run = 0; run < 1000; run++) {
			const s = random.string(random.int(1, 10), "abcd");
			expect(firstUnique(s)).toBe(
				[...s].findIndex((c) => s.indexOf(c) === s.lastIndexOf(c)),
			);
		}
	});
});
