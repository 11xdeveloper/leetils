import { describe, expect, it } from "bun:test";
import { countAllValidPickupAndDeliveryOptions as countOrders } from ".";

/** Builds every valid sequence event by event. */
const byBruteForce = (n: number): number => {
	const picked = new Array<boolean>(n).fill(false);
	const delivered = new Array<boolean>(n).fill(false);
	const extend = (placed: number): number => {
		if (placed === 2 * n) return 1;
		let ways = 0;
		for (let order = 0; order < n; order++) {
			if (!picked[order]) {
				picked[order] = true;
				ways += extend(placed + 1);
				picked[order] = false;
			} else if (!delivered[order]) {
				delivered[order] = true;
				ways += extend(placed + 1);
				delivered[order] = false;
			}
		}
		return ways;
	};
	return extend(0);
};

describe("1359. Count All Valid Pickup and Delivery Options", () => {
	it("solves the examples from the problem statement", () => {
		expect(countOrders(1)).toBe(1);
		expect(countOrders(2)).toBe(6);
		expect(countOrders(3)).toBe(90);
	});

	it("matches building every sequence up to 5 orders", () => {
		for (let n = 1; n <= 5; n++) expect(countOrders(n)).toBe(byBruteForce(n));
	});

	it("matches the closed form (2n)! / 2^n modulo 10^9 + 7", () => {
		let factorial = 1n;
		for (let i = 1n; i <= 1000n; i++) factorial *= i;
		expect(countOrders(500)).toBe(
			Number((factorial / 2n ** 500n) % 1_000_000_007n),
		);
	});
});
