import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumValueAfterInsertion as maxValue } from ".";

describe("1881. Maximum Value after Insertion", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxValue("99", 9)).toBe("999");
		expect(maxValue("-13", 2)).toBe("-123");
	});

	it("matches trying every position on random inputs", () => {
		const random = createRandom(1881);
		for (let run = 0; run < 300; run++) {
			const negative = random.int(0, 1) === 1;
			const digits =
				String(random.int(1, 9)) + random.string(random.int(0, 6), "123456789");
			const n = negative ? `-${digits}` : digits;
			const x = random.int(1, 9);
			const start = negative ? 1 : 0;
			let best = -Infinity;
			for (let i = start; i <= n.length; i++)
				best = Math.max(best, Number(n.slice(0, i) + x + n.slice(i)));
			expect(Number(maxValue(n, x))).toBe(best);
		}
	});
});
