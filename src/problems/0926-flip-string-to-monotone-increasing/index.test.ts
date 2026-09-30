import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { flipStringToMonotoneIncreasing as minFlipsMonoIncr } from ".";

describe("926. Flip String to Monotone Increasing", () => {
	it("solves the examples from the problem statement", () => {
		expect(minFlipsMonoIncr("00110")).toBe(1);
		expect(minFlipsMonoIncr("010110")).toBe(2);
		expect(minFlipsMonoIncr("00011000")).toBe(2);
	});

	it("matches trying every split point on random strings", () => {
		const random = createRandom(926);
		for (let run = 0; run < 1000; run++) {
			const s = random.string(random.int(1, 15), "01");
			let best = Number.POSITIVE_INFINITY;
			for (let split = 0; split <= s.length; split++) {
				const cost =
					[...s.slice(0, split)].filter((c) => c === "1").length +
					[...s.slice(split)].filter((c) => c === "0").length;
				best = Math.min(best, cost);
			}
			expect(minFlipsMonoIncr(s)).toBe(best);
		}
	});
});
