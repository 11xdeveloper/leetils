import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { hammingDistance } from ".";

const byStrings = (x: number, y: number): number => {
	const a = x.toString(2).padStart(32, "0");
	const b = y.toString(2).padStart(32, "0");
	return [...a].filter((bit, i) => bit !== b.charAt(i)).length;
};

describe("461. Hamming Distance", () => {
	it("solves the examples from the problem statement", () => {
		expect(hammingDistance(1, 4)).toBe(2);
		expect(hammingDistance(3, 1)).toBe(1);
	});

	it("handles the largest inputs", () => {
		expect(hammingDistance(0, 2 ** 31 - 1)).toBe(31);
	});

	it("matches comparing binary strings on random inputs", () => {
		const random = createRandom(461);
		for (let run = 0; run < 1000; run++) {
			const x = random.int(0, 2 ** 31 - 1);
			const y = random.int(0, 2 ** 31 - 1);
			expect(hammingDistance(x, y)).toBe(byStrings(x, y));
		}
	});
});
