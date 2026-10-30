import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countBeautifulSubstringsI } from "../2947-count-beautiful-substrings-i";
import { countBeautifulSubstringsII as beautifulSubstrings } from ".";

describe("2949. Count Beautiful Substrings II", () => {
	it("solves the examples from the problem statement", () => {
		expect(beautifulSubstrings("baeyh", 2)).toBe(2);
		expect(beautifulSubstrings("abba", 1)).toBe(3);
		expect(beautifulSubstrings("bcdf", 1)).toBe(0);
	});

	it("matches the quadratic version on random strings", () => {
		const random = createRandom(2949);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 20), "abe");
			const k = random.int(1, 30);
			expect(beautifulSubstrings(s, k)).toBe(countBeautifulSubstringsI(s, k));
		}
	});
});
