import { describe, expect, it } from "bun:test";
import { typeOfTriangle } from ".";

describe("3024. Type of Triangle", () => {
	it("solves the examples from the problem statement", () => {
		expect(typeOfTriangle([3, 3, 3])).toBe("equilateral");
		expect(typeOfTriangle([3, 4, 5])).toBe("scalene");
	});

	it("handles isosceles and impossible triangles", () => {
		expect(typeOfTriangle([2, 2, 3])).toBe("isosceles");
		expect(typeOfTriangle([1, 1, 2])).toBe("none");
		expect(typeOfTriangle([8, 4, 2])).toBe("none");
	});
});
