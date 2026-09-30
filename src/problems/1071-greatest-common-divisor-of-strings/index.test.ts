import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { greatestCommonDivisorOfStrings as gcdOfStrings } from ".";

describe("1071. Greatest Common Divisor of Strings", () => {
	it("solves the examples from the problem statement", () => {
		expect(gcdOfStrings("ABCABC", "ABC")).toBe("ABC");
		expect(gcdOfStrings("ABABAB", "ABAB")).toBe("AB");
		expect(gcdOfStrings("LEET", "CODE")).toBe("");
	});

	it("matches trying every prefix on random strings", () => {
		const random = createRandom(1071);
		const divides = (t: string, s: string) =>
			s.length % t.length === 0 && t.repeat(s.length / t.length) === s;
		for (let run = 0; run < 1000; run++) {
			const unit = random.string(random.int(1, 3), "AB");
			const [a, b] = random.int(0, 1)
				? [unit.repeat(random.int(1, 4)), unit.repeat(random.int(1, 4))]
				: [
						random.string(random.int(1, 6), "AB"),
						random.string(random.int(1, 6), "AB"),
					];
			let expected = "";
			for (let length = 1; length <= Math.min(a.length, b.length); length++)
				if (divides(a.slice(0, length), a) && divides(a.slice(0, length), b))
					expected = a.slice(0, length);
			expect(gcdOfStrings(a, b)).toBe(expected);
		}
	});
});
