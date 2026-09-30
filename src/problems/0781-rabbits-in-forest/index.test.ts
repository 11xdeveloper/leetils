import { describe, expect, it } from "bun:test";
import { rabbitsInForest as numRabbits } from ".";

describe("781. Rabbits in Forest", () => {
	it("solves the examples from the problem statement", () => {
		expect(numRabbits([1, 1, 2])).toBe(5);
		expect(numRabbits([10, 10, 10])).toBe(11);
	});

	it("starts a new group once one is full", () => {
		expect(numRabbits([0, 0, 0])).toBe(3);
		expect(numRabbits([1, 1, 1])).toBe(4);
		expect(numRabbits([2, 2, 2, 2])).toBe(6);
	});
});
