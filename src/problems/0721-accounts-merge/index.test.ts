import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { accountsMerge } from ".";

const normalise = (accounts: string[][]): string[] =>
	accounts.map((account) => account.join()).sort();

describe("721. Accounts Merge", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			normalise(
				accountsMerge([
					["John", "johnsmith@mail.com", "john_newyork@mail.com"],
					["John", "johnsmith@mail.com", "john00@mail.com"],
					["Mary", "mary@mail.com"],
					["John", "johnnybravo@mail.com"],
				]),
			),
		).toEqual(
			normalise([
				[
					"John",
					"john00@mail.com",
					"john_newyork@mail.com",
					"johnsmith@mail.com",
				],
				["Mary", "mary@mail.com"],
				["John", "johnnybravo@mail.com"],
			]),
		);
	});

	it("merges accounts linked through a chain of shared emails", () => {
		const random = createRandom(721);
		for (let run = 0; run < 300; run++) {
			// Each person owns a disjoint set of emails; their accounts each list some of them.
			const people = random.int(1, 4);
			const emails = Array.from({ length: people }, (_, p) =>
				Array.from({ length: random.int(1, 4) }, (_, e) => `p${p}e${e}@x.com`),
			);
			const accounts: string[][] = [];
			for (const [p, owned] of emails.entries()) {
				// A chain of accounts, each sharing an email with the next, covering every email.
				for (let e = 0; e < owned.length; e++)
					accounts.push([
						`Name${p % 2}`,
						owned[e] ?? "",
						owned[Math.min(e + 1, owned.length - 1)] ?? "",
					]);
			}
			accounts.sort(() => random.next() - 0.5);
			const expected = emails.map((owned, p) => [
				`Name${p % 2}`,
				...owned.toSorted(),
			]);
			expect(normalise(accountsMerge(accounts))).toEqual(normalise(expected));
		}
	});
});
