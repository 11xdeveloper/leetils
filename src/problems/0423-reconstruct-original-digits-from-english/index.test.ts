import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { reconstructOriginalDigitsFromEnglish as reconstruct } from ".";

const WORDS = [
	"zero",
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
];

describe("423. Reconstruct Original Digits from English", () => {
	it("solves the examples from the problem statement", () => {
		expect(reconstruct("owoztneoer")).toBe("012");
		expect(reconstruct("fviefuro")).toBe("45");
	});

	it("recovers random digits from their shuffled words", () => {
		const random = createRandom(423);
		for (let run = 0; run < 1000; run++) {
			const digits = random
				.array(random.int(1, 15), 0, 9)
				.toSorted((a, b) => a - b);
			const s = [...digits.map((d) => WORDS[d] ?? "").join("")]
				.toSorted(() => random.next() - 0.5)
				.join("");
			expect(reconstruct(s)).toBe(digits.join(""));
		}
	});
});
