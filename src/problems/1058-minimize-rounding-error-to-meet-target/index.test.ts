import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimizeRoundingErrorToMeetTarget as minimizeError } from ".";

/** Tries rounding every price each way, in thousandths. */
const byBruteForce = (prices: string[], target: number): string => {
	const values = prices.map((price) => Math.round(Number(price) * 1000));
	let best = Number.POSITIVE_INFINITY;
	for (let mask = 0; mask < 1 << values.length; mask++) {
		let sum = 0;
		let error = 0;
		for (const [i, value] of values.entries()) {
			const rounded =
				mask & (1 << i) ? Math.ceil(value / 1000) : Math.floor(value / 1000);
			sum += rounded;
			error += Math.abs(rounded * 1000 - value);
		}
		if (sum === target) best = Math.min(best, error);
	}
	return best === Number.POSITIVE_INFINITY ? "-1" : (best / 1000).toFixed(3);
};

describe("1058. Minimize Rounding Error to Meet Target", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimizeError(["0.700", "2.800", "4.900"], 8)).toBe("1.000");
		expect(minimizeError(["1.500", "2.500", "3.500"], 10)).toBe("-1");
		expect(minimizeError(["1.500", "2.500", "3.500"], 9)).toBe("1.500");
	});

	it("matches trying every rounding on random prices", () => {
		const random = createRandom(1058);
		for (let run = 0; run < 500; run++) {
			const prices = Array.from({ length: random.int(1, 8) }, () =>
				(random.int(0, 5000) / 1000).toFixed(3),
			);
			const target = random.int(0, 30);
			expect(minimizeError(prices, target)).toBe(byBruteForce(prices, target));
		}
	});
});
