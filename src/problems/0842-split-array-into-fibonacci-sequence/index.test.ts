import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { splitArrayIntoFibonacciSequence as splitIntoFibonacci } from ".";

const isValid = (num: string, sequence: number[]): boolean =>
	sequence.length >= 3 &&
	sequence.join("") === num &&
	sequence.every(
		(value, i) =>
			value <= 2 ** 31 - 1 &&
			(i < 2 || value === (sequence[i - 1] ?? 0) + (sequence[i - 2] ?? 0)),
	);

describe("842. Split Array into Fibonacci Sequence", () => {
	it("solves the examples from the problem statement", () => {
		expect(isValid("1101111", splitIntoFibonacci("1101111"))).toBeTrue();
		expect(splitIntoFibonacci("112358130")).toEqual([]);
		expect(splitIntoFibonacci("0123")).toEqual([]);
	});

	it("finds a sequence in random Fibonacci-like strings", () => {
		const random = createRandom(842);
		for (let run = 0; run < 500; run++) {
			const sequence = [random.int(0, 999), random.int(0, 999)];
			for (let i = random.int(1, 6); i > 0; i--)
				sequence.push((sequence.at(-1) ?? 0) + (sequence.at(-2) ?? 0));
			const num = sequence.join("");
			expect(isValid(num, splitIntoFibonacci(num))).toBeTrue();
		}
	});

	it("rejects numbers of 2^31 or more", () => {
		expect(splitIntoFibonacci("214748364721474836424294967289")).toEqual([]);
	});
});
