import { describe, expect, it } from "bun:test";
import { subtreeRemovalGameWithFibonacciTree as aliceWins } from ".";

/** Plays the game out on the tree's nodes, as bitmasks of removed nodes. */
const byBruteForce = (n: number): boolean => {
	const children: number[][] = [];
	const build = (order: number): number => {
		const node = children.length;
		children.push([]);
		if (order >= 2) {
			if (order >= 3) children[node]?.push(build(order - 2));
			children[node]?.push(build(order - 1));
		}
		return node;
	};
	build(n);
	const subtree = children.map(() => 0);
	for (let node = children.length - 1; node >= 0; node--) {
		subtree[node] = 1 << node;
		for (const child of children[node] ?? [])
			subtree[node] = (subtree[node] ?? 0) | (subtree[child] ?? 0);
	}
	const wins = new Map<number, boolean>();
	const toMoveWins = (removed: number): boolean => {
		const cached = wins.get(removed);
		if (cached !== undefined) return cached;
		let result = false;
		for (let node = 1; node < children.length && !result; node++) {
			if (!(removed & (1 << node)))
				result = !toMoveWins(removed | (subtree[node] ?? 0));
		}
		wins.set(removed, result);
		return result;
	};
	return toMoveWins(0);
};

describe("2005. Subtree Removal Game with Fibonacci Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(aliceWins(3)).toBeTrue();
		expect(aliceWins(1)).toBeFalse();
		expect(aliceWins(2)).toBeTrue();
	});

	it("matches playing out every game on small trees", () => {
		for (let n = 1; n <= 6; n++) expect(aliceWins(n)).toBe(byBruteForce(n));
	});

	it("loses exactly when n is one more than a multiple of 6", () => {
		for (let n = 1; n <= 100; n++) expect(aliceWins(n)).toBe(n % 6 !== 1);
	});
});
