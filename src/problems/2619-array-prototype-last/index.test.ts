import { describe, expect, it } from "bun:test";
import { arrayPrototypeLast } from ".";

describe("2619. Array Prototype Last", () => {
	it("solves the examples from the problem statement", () => {
		expect(arrayPrototypeLast.call([null, {}, 3])).toBe(3);
		expect(arrayPrototypeLast.call([])).toBe(-1);
	});

	it("returns undefined and null elements as they are", () => {
		expect(arrayPrototypeLast.call([1, undefined])).toBeUndefined();
		expect(arrayPrototypeLast.call([null])).toBeNull();
	});
});
