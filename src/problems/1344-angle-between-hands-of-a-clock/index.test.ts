import { describe, expect, it } from "bun:test";
import { angleBetweenHandsOfAClock as angleClock } from ".";

describe("1344. Angle Between Hands of a Clock", () => {
	it("solves the examples from the problem statement", () => {
		expect(angleClock(12, 30)).toBeCloseTo(165);
		expect(angleClock(3, 30)).toBeCloseTo(75);
		expect(angleClock(3, 15)).toBeCloseTo(7.5);
	});

	it("handles the hands overlapping and pointing apart", () => {
		expect(angleClock(12, 0)).toBe(0);
		expect(angleClock(6, 0)).toBe(180);
		expect(angleClock(9, 0)).toBe(90);
	});

	it("stays between 0 and 180 at every minute", () => {
		for (let hour = 1; hour <= 12; hour++) {
			for (let minutes = 0; minutes < 60; minutes++) {
				const angle = angleClock(hour, minutes);
				expect(angle).toBeGreaterThanOrEqual(0);
				expect(angle).toBeLessThanOrEqual(180);
			}
		}
	});
});
