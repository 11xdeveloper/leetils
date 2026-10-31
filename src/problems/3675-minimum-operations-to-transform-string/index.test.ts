import { describe, expect, it } from "bun:test";
import { minimumOperationsToTransformString as minOperations } from ".";

describe("3675. Minimum Operations to Transform String", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations("yz")).toBe(2);
		expect(minOperations("a")).toBe(0);
	});

	it("is set by the letter furthest from a", () => {
		expect(minOperations("bz")).toBe(25);
	});
});
