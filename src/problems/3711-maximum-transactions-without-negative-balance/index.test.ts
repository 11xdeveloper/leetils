import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumTransactionsWithoutNegativeBalance as maxTransactions } from ".";

/** Tries every subset. */
const byBruteForce = (transactions: number[]): number => {
	let best = 0;
	for (let mask = 0; mask < 1 << transactions.length; mask++) {
		let [balance, count, ok] = [0, 0, true];
		transactions.forEach((amount, i) => {
			if (!((mask >> i) & 1)) return;
			balance += amount;
			count++;
			if (balance < 0) ok = false;
		});
		if (ok) best = Math.max(best, count);
	}
	return best;
};

describe("3711. Maximum Transactions Without Negative Balance", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxTransactions([7, -5, 3, -8])).toBe(3);
		expect(maxTransactions([-1, -2, -3])).toBe(0);
		expect(maxTransactions([3, -2, 3, -2, 1, -1])).toBe(6);
	});

	it("matches trying every subset on random transactions", () => {
		const random = createRandom(3711);
		for (let run = 0; run < 300; run++) {
			const transactions = random.array(random.int(1, 10), -6, 6);
			expect(maxTransactions(transactions)).toBe(byBruteForce(transactions));
		}
	});
});
