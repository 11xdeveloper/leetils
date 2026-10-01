import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfWonderfulSubstrings as wonderfulSubstrings } from ".";

describe("1915. Number of Wonderful Substrings", () => {
	it("solves the examples from the problem statement", () => {
		expect(wonderfulSubstrings("aba")).toBe(4);
		expect(wonderfulSubstrings("aabb")).toBe(9);
		expect(wonderfulSubstrings("he")).toBe(2);
	});

	it("matches checking every substring on random strings", () => {
		const random = createRandom(1915);
		for (let run = 0; run < 200; run++) {
			const word = random.string(random.int(1, 12), "abcj");
			let count = 0;
			for (let i = 0; i < word.length; i++) {
				for (let j = i + 1; j <= word.length; j++) {
					const counts = new Map<string, number>();
					for (const c of word.slice(i, j))
						counts.set(c, (counts.get(c) ?? 0) + 1);
					if ([...counts.values()].filter((v) => v % 2 === 1).length <= 1)
						count++;
				}
			}
			expect(wonderfulSubstrings(word)).toBe(count);
		}
	});
});
