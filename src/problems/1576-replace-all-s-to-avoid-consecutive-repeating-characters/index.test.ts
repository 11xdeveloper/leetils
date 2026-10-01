import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { replaceAllSToAvoidConsecutiveRepeatingCharacters as modifyString } from ".";

const expectValid = (s: string) => {
	const result = modifyString(s);
	expect(result).toHaveLength(s.length);
	expect(result).not.toContain("?");
	for (let i = 0; i < s.length; i++) {
		if (s[i] !== "?") expect(result[i]).toBe(s[i]);
		if (i > 0) expect(result[i]).not.toBe(result[i - 1]);
	}
};

describe("1576. Replace All ?'s to Avoid Consecutive Repeating Characters", () => {
	it("solves the examples from the problem statement", () => {
		expectValid("?zs");
		expectValid("ubv?w");
	});

	it("fills random strings without repeats", () => {
		const random = createRandom(1576);
		for (let run = 0; run < 300; run++) {
			let s = "";
			for (let i = random.int(1, 12); i > 0; i--) {
				const char = random.next() < 0.4 ? "?" : random.string(1, "abc");
				if (char !== "?" && s.at(-1) === char) continue;
				s += char;
			}
			if (s) expectValid(s);
		}
	});
});
