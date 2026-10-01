import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { diStringMatch } from ".";

describe("942. DI String Match", () => {
	it("solves the examples from the problem statement", () => {
		expect(diStringMatch("IDID")).toEqual([0, 4, 1, 3, 2]);
		expect(diStringMatch("III")).toEqual([0, 1, 2, 3]);
		expect(diStringMatch("DDI")).toEqual([3, 2, 0, 1]);
	});

	it("gives a valid permutation for random strings", () => {
		const random = createRandom(942);
		for (let run = 0; run < 1000; run++) {
			const s = random.string(random.int(1, 15), "DI");
			const result = diStringMatch(s);
			expect(result.toSorted((a, b) => a - b)).toEqual(
				Array.from({ length: s.length + 1 }, (_, i) => i),
			);
			expect(
				[...s].every(
					(letter, i) =>
						(letter === "I") === (result[i] ?? 0) < (result[i + 1] ?? 0),
				),
			).toBeTrue();
		}
	});
});
