import { describe, expect, it } from "bun:test";
import { toggleLightBulbs } from ".";

describe("3842. Toggle Light Bulbs", () => {
	it("solves the examples from the problem statement", () => {
		expect(toggleLightBulbs([10, 30, 20, 10])).toEqual([20, 30]);
		expect(toggleLightBulbs([100, 100])).toEqual([]);
	});
});
