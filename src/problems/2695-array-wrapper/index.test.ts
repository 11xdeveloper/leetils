import { describe, expect, it } from "bun:test";
import { ArrayWrapper } from ".";

describe("2695. Array Wrapper", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			Number(new ArrayWrapper([1, 2])) + Number(new ArrayWrapper([3, 4])),
		).toBe(10);
		expect(String(new ArrayWrapper([23, 98, 42, 70]))).toBe("[23,98,42,70]");
		expect(Number(new ArrayWrapper([])) + Number(new ArrayWrapper([]))).toBe(0);
	});

	it("adds with + directly", () => {
		const sum: unknown =
			(new ArrayWrapper([1]) as unknown as number) +
			(new ArrayWrapper([2]) as unknown as number);
		expect(sum).toBe(3);
	});
});
