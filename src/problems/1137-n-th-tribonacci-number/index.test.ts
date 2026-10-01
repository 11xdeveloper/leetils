import { describe, expect, it } from "bun:test";
import { nThTribonacciNumber as tribonacci } from ".";

describe("1137. N-th Tribonacci Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(tribonacci(4)).toBe(4);
		expect(tribonacci(25)).toBe(1389537);
	});

	it("starts 0, 1, 1, 2, 4, 7, 13, 24", () => {
		expect(Array.from({ length: 8 }, (_, n) => tribonacci(n))).toEqual([
			0, 1, 1, 2, 4, 7, 13, 24,
		]);
	});

	it("follows the recurrence up to n = 37", () => {
		for (let n = 3; n <= 37; n++) {
			expect(tribonacci(n)).toBe(
				tribonacci(n - 1) + tribonacci(n - 2) + tribonacci(n - 3),
			);
		}
		expect(tribonacci(37)).toBe(2082876103);
	});
});
