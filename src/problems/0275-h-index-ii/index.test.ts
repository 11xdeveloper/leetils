import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { hIndex } from "../0274-h-index";
import { hIndexII } from ".";

describe("275. H-Index II", () => {
	it("solves the examples from the problem statement", () => {
		expect(hIndexII([0, 1, 3, 5, 6])).toBe(3);
		expect(hIndexII([1, 2, 100])).toBe(2);
	});

	it("handles a single paper", () => {
		expect(hIndexII([0])).toBe(0);
		expect(hIndexII([7])).toBe(1);
	});

	it("matches H-Index on random sorted inputs", () => {
		const random = createRandom(275);
		for (let run = 0; run < 1000; run++) {
			const citations = random
				.array(random.int(1, 15), 0, 20)
				.toSorted((a, b) => a - b);
			expect(hIndexII(citations)).toBe(hIndex(citations));
		}
	});
});
