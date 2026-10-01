import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { invalidTransactions } from ".";

/** Compares every pair of transactions. */
const byBruteForce = (transactions: string[]): string[] => {
	const parsed = transactions.map((t) => t.split(","));
	return transactions.filter((_, i) => {
		const [name, time, amount, city] = parsed[i] ?? [];
		if (Number(amount) > 1000) return true;
		return parsed.some(
			([otherName, otherTime, , otherCity]) =>
				otherName === name &&
				otherCity !== city &&
				Math.abs(Number(otherTime) - Number(time)) <= 60,
		);
	});
};

describe("1169. Invalid Transactions", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			invalidTransactions(["alice,20,800,mtv", "alice,50,100,beijing"]),
		).toEqual(["alice,20,800,mtv", "alice,50,100,beijing"]);
		expect(
			invalidTransactions(["alice,20,800,mtv", "alice,50,1200,mtv"]),
		).toEqual(["alice,50,1200,mtv"]);
		expect(
			invalidTransactions(["alice,20,800,mtv", "bob,50,1200,mtv"]),
		).toEqual(["bob,50,1200,mtv"]);
	});

	it("counts exactly 60 minutes apart as within", () => {
		expect(invalidTransactions(["a,0,1,x", "a,60,1,y", "a,121,1,x"])).toEqual([
			"a,0,1,x",
			"a,60,1,y",
		]);
	});

	it("matches comparing every pair on random inputs", () => {
		const random = createRandom(1169);
		for (let run = 0; run < 300; run++) {
			const transactions = Array.from(
				{ length: random.int(1, 12) },
				() =>
					`${random.string(1, "ab")},${random.int(0, 200)},${random.int(990, 1010)},${random.string(1, "xyz")}`,
			);
			expect(invalidTransactions(transactions)).toEqual(
				byBruteForce(transactions),
			);
		}
	});
});
