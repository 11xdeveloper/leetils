import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { palindromeRemoval as minimumMoves } from ".";

/** Breadth-first search over the arrays left after each removal. */
const byBruteForce = (arr: number[]): number => {
	const isPalindrome = (a: number[]) =>
		a.every((value, i) => value === a[a.length - 1 - i]);
	let frontier = [arr.join(",")];
	const seen = new Set(frontier);
	for (let moves = 0; ; moves++) {
		if (frontier.includes("")) return moves;
		const next: string[] = [];
		for (const key of frontier) {
			const current = key.split(",").map(Number);
			for (let i = 0; i < current.length; i++) {
				for (let j = i; j < current.length; j++) {
					if (!isPalindrome(current.slice(i, j + 1))) continue;
					const rest = [...current.slice(0, i), ...current.slice(j + 1)].join(
						",",
					);
					if (seen.has(rest)) continue;
					seen.add(rest);
					next.push(rest);
				}
			}
		}
		frontier = next;
	}
};

describe("1246. Palindrome Removal", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumMoves([1, 2])).toBe(2);
		expect(minimumMoves([1, 3, 4, 1, 5])).toBe(3);
	});

	it("removes a palindrome in one move", () => {
		expect(minimumMoves([1, 2, 1])).toBe(1);
		expect(minimumMoves([1, 1])).toBe(1);
		expect(minimumMoves([4])).toBe(1);
	});

	it("matches searching over removals on random inputs", () => {
		const random = createRandom(1246);
		for (let run = 0; run < 200; run++) {
			const arr = random.array(random.int(1, 8), 1, 3);
			expect(minimumMoves(arr)).toBe(byBruteForce(arr));
		}
	});
});
