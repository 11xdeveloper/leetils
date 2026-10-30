import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfGoodBinaryStrings as goodBinaryStrings } from ".";

/** Checks every binary string's blocks. */
const byBruteForce = (
	min: number,
	max: number,
	one: number,
	zero: number,
): number => {
	let count = 0;
	for (let length = min; length <= max; length++)
		for (let mask = 0; mask < 1 << length; mask++) {
			const blocks =
				mask.toString(2).padStart(length, "0").match(/0+|1+/g) ?? [];
			if (blocks.every((b) => b.length % (b[0] === "1" ? one : zero) === 0))
				count++;
		}
	return count;
};

describe("2533. Number of Good Binary Strings", () => {
	it("solves the examples from the problem statement", () => {
		expect(goodBinaryStrings(2, 3, 1, 2)).toBe(5);
		expect(goodBinaryStrings(4, 4, 4, 3)).toBe(1);
	});

	it("matches checking every string on random inputs", () => {
		const random = createRandom(2533);
		for (let run = 0; run < 100; run++) {
			const min = random.int(1, 8);
			const max = random.int(min, 10);
			const one = random.int(1, 4);
			const zero = random.int(1, 4);
			expect(goodBinaryStrings(min, max, one, zero)).toBe(
				byBruteForce(min, max, one, zero),
			);
		}
	});
});
