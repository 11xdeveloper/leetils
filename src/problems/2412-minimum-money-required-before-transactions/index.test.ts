import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumMoneyRequiredBeforeTransactions as minimumMoney } from ".";

/** Tries every order, taking the most money any needs. */
const byBruteForce = (transactions: number[][]): number => {
	let worst = 0;
	const visit = (order: number[], used: number): void => {
		if (order.length === transactions.length) {
			let [needed, balance] = [0, 0];
			for (const i of order) {
				const [cost = 0, cashback = 0] = transactions[i] ?? [];
				needed = Math.max(needed, cost - balance);
				balance += cashback - cost;
			}
			worst = Math.max(worst, needed);
			return;
		}
		for (let i = 0; i < transactions.length; i++)
			if (!(used & (1 << i))) visit([...order, i], used | (1 << i));
	};
	visit([], 0);
	return worst;
};

describe("2412. Minimum Money Required Before Transactions", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumMoney([
				[2, 1],
				[5, 0],
				[4, 2],
			]),
		).toBe(10);
		expect(
			minimumMoney([
				[3, 0],
				[0, 3],
			]),
		).toBe(3);
	});

	it("matches trying every order on random transactions", () => {
		const random = createRandom(2412);
		for (let run = 0; run < 100; run++) {
			const transactions = Array.from({ length: random.int(1, 5) }, () => [
				random.int(0, 9),
				random.int(0, 9),
			]);
			expect(minimumMoney(transactions)).toBe(byBruteForce(transactions));
		}
	});
});
