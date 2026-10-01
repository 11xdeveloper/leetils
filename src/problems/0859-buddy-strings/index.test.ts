import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { buddyStrings } from ".";

describe("859. Buddy Strings", () => {
	it("solves the examples from the problem statement", () => {
		expect(buddyStrings("ab", "ba")).toBeTrue();
		expect(buddyStrings("ab", "ab")).toBeFalse();
		expect(buddyStrings("aa", "aa")).toBeTrue();
	});

	it("matches trying every swap on random inputs", () => {
		const random = createRandom(859);
		for (let run = 0; run < 1000; run++) {
			const s = random.string(random.int(1, 6), "abc");
			const goal = random.int(0, 1)
				? [...s].sort(() => random.next() - 0.5).join("")
				: random.string(random.int(1, 6), "abc");
			let expected = false;
			for (let i = 0; i < s.length; i++) {
				for (let j = i + 1; j < s.length; j++) {
					const chars = [...s];
					[chars[i], chars[j]] = [chars[j] ?? "", chars[i] ?? ""];
					if (chars.join("") === goal) expected = true;
				}
			}
			expect(buddyStrings(s, goal)).toBe(expected);
		}
	});
});
