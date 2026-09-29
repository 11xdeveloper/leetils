import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { bitwiseAndOfNumbersRange } from ".";

const byLooping = (left: number, right: number): number => {
	let result = left;
	for (let n = left + 1; n <= right && result !== 0; n++) result &= n;
	return result;
};

describe("201. Bitwise AND of Numbers Range", () => {
	it("solves the examples from the problem statement", () => {
		expect(bitwiseAndOfNumbersRange(5, 7)).toBe(4);
		expect(bitwiseAndOfNumbersRange(0, 0)).toBe(0);
		expect(bitwiseAndOfNumbersRange(1, 2147483647)).toBe(0);
	});

	it("returns the number itself for a range of one", () => {
		expect(bitwiseAndOfNumbersRange(2147483647, 2147483647)).toBe(2147483647);
	});

	it("matches ANDing every number on random ranges", () => {
		const random = createRandom(201);
		for (let run = 0; run < 2000; run++) {
			const left = random.int(0, 2 ** 31 - 1);
			const right = Math.min(2 ** 31 - 1, left + random.int(0, 300));
			expect(bitwiseAndOfNumbersRange(left, right)).toBe(
				byLooping(left, right),
			);
		}
	});
});
