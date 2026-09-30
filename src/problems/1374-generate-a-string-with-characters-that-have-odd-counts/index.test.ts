import { describe, expect, it } from "bun:test";
import { generateAStringWithCharactersThatHaveOddCounts as generateTheString } from ".";

describe("1374. Generate a String With Characters That Have Odd Counts", () => {
	it("gives every letter an odd count for every n up to 500", () => {
		for (let n = 1; n <= 500; n++) {
			const s = generateTheString(n);
			expect(s).toHaveLength(n);
			expect(s).toMatch(/^[a-z]+$/);
			for (const char of new Set(s))
				expect((s.split(char).length - 1) % 2).toBe(1);
		}
	});
});
