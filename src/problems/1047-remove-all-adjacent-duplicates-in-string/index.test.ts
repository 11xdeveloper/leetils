import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { removeAllAdjacentDuplicatesInString as removeDuplicates } from ".";

describe("1047. Remove All Adjacent Duplicates In String", () => {
	it("solves the examples from the problem statement", () => {
		expect(removeDuplicates("abbaca")).toBe("ca");
		expect(removeDuplicates("azxxzy")).toBe("ay");
	});

	it("matches removing pairs until none remain on random strings", () => {
		const random = createRandom(1047);
		for (let run = 0; run < 1000; run++) {
			let s = random.string(random.int(1, 15), "ab");
			const original = s;
			for (
				let next = s.replace(/(.)\1/, "");
				next !== s;
				next = s.replace(/(.)\1/, "")
			)
				s = next;
			expect(removeDuplicates(original)).toBe(s);
		}
	});
});
