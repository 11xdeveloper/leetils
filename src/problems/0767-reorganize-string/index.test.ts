import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { reorganizeString } from ".";

describe("767. Reorganize String", () => {
	it("solves the examples from the problem statement", () => {
		expect(reorganizeString("aab")).toBe("aba");
		expect(reorganizeString("aaab")).toBe("");
	});

	it("gives a valid rearrangement exactly when no character is too frequent", () => {
		const random = createRandom(767);
		for (let run = 0; run < 1000; run++) {
			const s = random.string(random.int(1, 15), "aaabbc");
			const result = reorganizeString(s);
			const most = Math.max(
				...[...new Set(s)].map(
					(char) => [...s].filter((c) => c === char).length,
				),
			);
			if (most > Math.ceil(s.length / 2)) {
				expect(result).toBe("");
			} else {
				expect([...result].sort().join("")).toBe([...s].sort().join(""));
				expect(/(.)\1/.test(result)).toBeFalse();
			}
		}
	});
});
