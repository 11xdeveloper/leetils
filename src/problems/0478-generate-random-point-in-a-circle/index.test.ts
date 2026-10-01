import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { GenerateRandomPointInACircle } from ".";

describe("478. Generate Random Point in a Circle", () => {
	it("returns points inside the circle", () => {
		const circle = new GenerateRandomPointInACircle(
			10,
			5,
			-7.5,
			createRandom(478).next,
		);
		for (let i = 0; i < 10_000; i++) {
			const [x = 0, y = 0] = circle.randPoint();
			expect(Math.hypot(x - 5, y + 7.5)).toBeLessThanOrEqual(10 + 1e-9);
		}
	});

	it("spreads points uniformly by area", () => {
		const circle = new GenerateRandomPointInACircle(
			1,
			0,
			0,
			createRandom(4780).next,
		);
		const samples = 100_000;
		let innerHalf = 0;
		const quadrants = [0, 0, 0, 0];
		for (let i = 0; i < samples; i++) {
			const [x = 0, y = 0] = circle.randPoint();
			if (Math.hypot(x, y) <= 0.5) innerHalf++;
			const quadrant = (x >= 0 ? 0 : 1) + (y >= 0 ? 0 : 2);
			quadrants[quadrant] = (quadrants[quadrant] ?? 0) + 1;
		}
		// The inner half of the radius is a quarter of the area.
		expect(Math.abs(innerHalf / samples - 0.25)).toBeLessThan(0.01);
		for (const count of quadrants)
			expect(Math.abs(count / samples - 0.25)).toBeLessThan(0.01);
	});
});
