import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximizeTotalTastinessOfPurchasedFruits as maxTastiness } from ".";

/** Tries every choice per fruit: skip, buy, or buy with a coupon. */
const byBruteForce = (
	price: number[],
	tastiness: number[],
	maxAmount: number,
	maxCoupons: number,
): number => {
	let best = 0;
	const choose = (
		i: number,
		money: number,
		coupons: number,
		taste: number,
	): void => {
		if (money > maxAmount || coupons > maxCoupons) return;
		if (i === price.length) {
			best = Math.max(best, taste);
			return;
		}
		const [cost = 0, t = 0] = [price[i], tastiness[i]];
		choose(i + 1, money, coupons, taste);
		choose(i + 1, money + cost, coupons, taste + t);
		choose(i + 1, money + Math.floor(cost / 2), coupons + 1, taste + t);
	};
	choose(0, 0, 0, 0);
	return best;
};

describe("2431. Maximize Total Tastiness of Purchased Fruits", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxTastiness([10, 20, 20], [5, 8, 8], 20, 1)).toBe(13);
		expect(maxTastiness([10, 15, 7], [5, 8, 20], 10, 2)).toBe(28);
	});

	it("matches trying every choice on random fruits", () => {
		const random = createRandom(2431);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 6);
			const price = random.array(n, 0, 10);
			const tastiness = random.array(n, 0, 10);
			const maxAmount = random.int(0, 20);
			const maxCoupons = random.int(0, 3);
			expect(maxTastiness(price, tastiness, maxAmount, maxCoupons)).toBe(
				byBruteForce(price, tastiness, maxAmount, maxCoupons),
			);
		}
	});
});
