import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findPatternInInfiniteStreamII as findPattern } from ".";

const cycle = (bits: number[]) => {
	let i = 0;
	return { next: () => bits[i++ % bits.length] ?? 0 };
};

describe("3037. Find Pattern in Infinite Stream II", () => {
	it("solves the examples from the problem statement", () => {
		expect(findPattern(cycle([1, 1, 1, 0, 1]), [0, 1])).toBe(3);
		expect(findPattern(cycle([0, 0, 0, 0]), [0])).toBe(0);
		expect(findPattern(cycle([1, 0, 1, 1, 0, 1]), [1, 1, 0, 1])).toBe(2);
	});

	it("matches searching a long prefix of the stream", () => {
		const random = createRandom(3037);
		for (let run = 0; run < 300; run++) {
			const bits = random.array(random.int(1, 8), 0, 1);
			const pattern = random.array(random.int(1, 12), 0, 1);
			const prefix = Array.from(
				{ length: 400 },
				(_, i) => bits[i % bits.length],
			).join("");
			const index = prefix.indexOf(pattern.join(""));
			if (index === -1) continue;
			expect(findPattern(cycle(bits), pattern)).toBe(index);
		}
	});
});
