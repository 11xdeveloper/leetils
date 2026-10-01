import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumSpeedToArriveOnTime as minSpeedOnTime } from ".";

describe("1870. Minimum Speed to Arrive on Time", () => {
	it("solves the examples from the problem statement", () => {
		expect(minSpeedOnTime([1, 3, 2], 6)).toBe(1);
		expect(minSpeedOnTime([1, 3, 2], 2.7)).toBe(3);
		expect(minSpeedOnTime([1, 3, 2], 1.9)).toBe(-1);
	});

	it("matches trying speeds in order on random inputs", () => {
		const random = createRandom(1870);
		for (let run = 0; run < 200; run++) {
			const dist = random.array(random.int(1, 5), 1, 20);
			const hour = random.int(dist.length * 100 - 99, 3000) / 100;
			let expected = -1;
			for (let speed = 1; speed <= 2000; speed++) {
				// Compare in hundredths with exact integer arithmetic.
				const whole = dist
					.slice(0, -1)
					.reduce((t, d) => t + Math.ceil(d / speed), 0);
				if (
					(whole * speed + (dist.at(-1) ?? 0)) * 100 <=
					Math.round(hour * 100) * speed
				) {
					expected = speed;
					break;
				}
			}
			if (expected !== -1) expect(minSpeedOnTime(dist, hour)).toBe(expected);
		}
	});
});
