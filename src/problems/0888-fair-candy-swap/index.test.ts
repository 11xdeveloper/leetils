import { describe, expect, it } from "bun:test";
import { fairCandySwap } from ".";

const isFair = (
	alice: number[],
	bob: number[],
	[x = 0, y = 0]: number[],
): boolean => {
	const sum = (sizes: number[]) => sizes.reduce((a, b) => a + b, 0);
	return (
		alice.includes(x) &&
		bob.includes(y) &&
		sum(alice) - x + y === sum(bob) - y + x
	);
};

describe("888. Fair Candy Swap", () => {
	it("solves the examples from the problem statement", () => {
		expect(isFair([1, 1], [2, 2], fairCandySwap([1, 1], [2, 2]))).toBeTrue();
		expect(isFair([1, 2], [2, 3], fairCandySwap([1, 2], [2, 3]))).toBeTrue();
		expect(isFair([2], [1, 3], fairCandySwap([2], [1, 3]))).toBeTrue();
	});
});
