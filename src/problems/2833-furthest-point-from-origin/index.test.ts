import { describe, expect, it } from "bun:test";
import { furthestPointFromOrigin as furthestDistanceFromOrigin } from ".";

describe("2833. Furthest Point From Origin", () => {
	it("solves the examples from the problem statement", () => {
		expect(furthestDistanceFromOrigin("L_RL__R")).toBe(3);
		expect(furthestDistanceFromOrigin("_R__LL_")).toBe(5);
		expect(furthestDistanceFromOrigin("_______")).toBe(7);
	});
});
