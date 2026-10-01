import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { performStringShifts as stringShift } from ".";

/** Moves one character at a time. */
const byBruteForce = (s: string, shift: number[][]): string => {
	let current = s;
	for (const [direction, amount = 0] of shift) {
		for (let i = 0; i < amount; i++) {
			current =
				direction === 0
					? current.slice(1) + current[0]
					: (current.at(-1) ?? "") + current.slice(0, -1);
		}
	}
	return current;
};

describe("1427. Perform String Shifts", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			stringShift("abc", [
				[0, 1],
				[1, 2],
			]),
		).toBe("cab");
		expect(
			stringShift("abcdefg", [
				[1, 1],
				[1, 1],
				[0, 2],
				[1, 3],
			]),
		).toBe("efgabcd");
	});

	it("matches shifting one character at a time on random inputs", () => {
		const random = createRandom(1427);
		for (let run = 0; run < 200; run++) {
			const s = random.string(random.int(1, 8), "abcdefgh");
			const shift = Array.from({ length: random.int(1, 5) }, () => [
				random.int(0, 1),
				random.int(0, 20),
			]);
			expect(stringShift(s, shift)).toBe(byBruteForce(s, shift));
		}
	});
});
