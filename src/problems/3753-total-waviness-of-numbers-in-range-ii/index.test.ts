import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { totalWavinessOfNumbersInRangeI } from "../3751-total-waviness-of-numbers-in-range-i";
import { totalWavinessOfNumbersInRangeII as totalWaviness } from ".";

describe("3753. Total Waviness of Numbers in Range II", () => {
	it("solves the examples from the problem statement", () => {
		expect(totalWaviness(120, 130)).toBe(3);
		expect(totalWaviness(198, 202)).toBe(3);
		expect(totalWaviness(4848, 4848)).toBe(2);
	});

	it("matches checking every number on random ranges", () => {
		const random = createRandom(3753);
		for (let run = 0; run < 100; run++) {
			const num1 = random.int(1, 20000);
			const num2 = random.int(num1, num1 + 3000);
			expect(totalWaviness(num1, num2)).toBe(
				totalWavinessOfNumbersInRangeI(num1, num2),
			);
		}
	});
});
