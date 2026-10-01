import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sequentialDigits } from ".";

const isSequential = (value: number) => {
	const s = String(value);
	return [...s].every(
		(digit, i) => i === 0 || Number(digit) === Number(s[i - 1]) + 1,
	);
};

describe("1291. Sequential Digits", () => {
	it("solves the examples from the problem statement", () => {
		expect(sequentialDigits(100, 300)).toEqual([123, 234]);
		expect(sequentialDigits(1000, 13000)).toEqual([
			1234, 2345, 3456, 4567, 5678, 6789, 12345,
		]);
	});

	it("lists all 36 over the whole range", () => {
		const all = sequentialDigits(10, 10 ** 9);
		expect(all).toHaveLength(36);
		expect(all.at(-1)).toBe(123456789);
	});

	it("matches checking every number in random ranges", () => {
		const random = createRandom(1291);
		for (let run = 0; run < 50; run++) {
			const low = random.int(10, 20000);
			const high = random.int(low, low + 20000);
			const expected: number[] = [];
			for (let value = low; value <= high; value++)
				if (isSequential(value)) expected.push(value);
			expect(sequentialDigits(low, high)).toEqual(expected);
		}
	});
});
