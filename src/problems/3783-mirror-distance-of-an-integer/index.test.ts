import { describe, expect, it } from "bun:test";
import { mirrorDistanceOfAnInteger as mirrorDistance } from ".";

describe("3783. Mirror Distance of an Integer", () => {
	it("solves the examples from the problem statement", () => {
		expect(mirrorDistance(25)).toBe(27);
		expect(mirrorDistance(10)).toBe(9);
		expect(mirrorDistance(7)).toBe(0);
	});
});
