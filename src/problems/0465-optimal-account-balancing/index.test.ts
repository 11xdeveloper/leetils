import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { optimalAccountBalancing as minTransfers } from ".";

/** Settles the first unsettled person against every possible partner in turn. */
const byBacktracking = (transactions: number[][]): number => {
	const balances = new Map<number, number>();
	for (const [from = 0, to = 0, amount = 0] of transactions) {
		balances.set(from, (balances.get(from) ?? 0) - amount);
		balances.set(to, (balances.get(to) ?? 0) + amount);
	}
	const debts = [...balances.values()].filter((balance) => balance !== 0);
	const settle = (start: number): number => {
		while (start < debts.length && debts[start] === 0) start++;
		if (start === debts.length) return 0;
		let best = Number.POSITIVE_INFINITY;
		const debt = debts[start] ?? 0;
		for (let i = start + 1; i < debts.length; i++) {
			if ((debts[i] ?? 0) * debt >= 0) continue;
			debts[i] = (debts[i] ?? 0) + debt;
			best = Math.min(best, 1 + settle(start + 1));
			debts[i] = (debts[i] ?? 0) - debt;
		}
		return best;
	};
	return settle(0);
};

describe("465. Optimal Account Balancing", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minTransfers([
				[0, 1, 10],
				[2, 0, 5],
			]),
		).toBe(2);
		expect(
			minTransfers([
				[0, 1, 10],
				[1, 0, 1],
				[1, 2, 5],
				[2, 0, 5],
			]),
		).toBe(1);
	});

	it("needs no transactions when everything already cancels out", () => {
		expect(
			minTransfers([
				[0, 1, 5],
				[1, 0, 5],
			]),
		).toBe(0);
	});

	it("matches backtracking over settlements on random inputs", () => {
		const random = createRandom(465);
		for (let run = 0; run < 300; run++) {
			const transactions = Array.from({ length: random.int(1, 8) }, () => {
				const from = random.int(0, 11);
				const to = (from + random.int(1, 11)) % 12;
				return [from, to, random.int(1, 10)];
			});
			expect(minTransfers(transactions)).toBe(byBacktracking(transactions));
		}
	});
});
