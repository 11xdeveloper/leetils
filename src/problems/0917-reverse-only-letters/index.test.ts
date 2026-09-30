import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { reverseOnlyLetters } from ".";

describe("917. Reverse Only Letters", () => {
	it("solves the examples from the problem statement", () => {
		expect(reverseOnlyLetters("ab-cd")).toBe("dc-ba");
		expect(reverseOnlyLetters("a-bC-dEf-ghIj")).toBe("j-Ih-gfE-dCba");
		expect(reverseOnlyLetters("Test1ng-Leet=code-Q!")).toBe(
			"Qedo1ct-eeLg=ntse-T!",
		);
	});

	it("matches substituting the reversed letters on random strings", () => {
		const random = createRandom(917);
		for (let run = 0; run < 500; run++) {
			const s = random.string(random.int(1, 15), "abC-1!");
			const letters = [...s].filter((char) => /[a-zA-Z]/.test(char)).reverse();
			expect(reverseOnlyLetters(s)).toBe(
				[...s]
					.map((char) => (/[a-zA-Z]/.test(char) ? letters.shift() : char))
					.join(""),
			);
		}
	});
});
