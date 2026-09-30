import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { validateBinaryTreeNodes } from ".";

/** Tries each node as the root, walking with a visited set that must never repeat. */
const byBruteForce = (n: number, left: number[], right: number[]): boolean => {
	for (let root = 0; root < n; root++) {
		const seen = new Set<number>();
		const stack = [root];
		let ok = true;
		for (let node = stack.pop(); node !== undefined; node = stack.pop()) {
			if (seen.has(node)) {
				ok = false;
				break;
			}
			seen.add(node);
			for (const child of [left[node] ?? -1, right[node] ?? -1])
				if (child !== -1) stack.push(child);
		}
		if (ok && seen.size === n) return true;
	}
	return false;
};

describe("1361. Validate Binary Tree Nodes", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			validateBinaryTreeNodes(4, [1, -1, 3, -1], [2, -1, -1, -1]),
		).toBeTrue();
		expect(
			validateBinaryTreeNodes(4, [1, -1, 3, -1], [2, 3, -1, -1]),
		).toBeFalse();
		expect(validateBinaryTreeNodes(2, [1, 0], [-1, -1])).toBeFalse();
	});

	it("rejects a tree plus a separate cycle", () => {
		// 0 is a lone root; 1 and 2 point at each other.
		expect(validateBinaryTreeNodes(3, [-1, 2, 1], [-1, -1, -1])).toBeFalse();
	});

	it("matches trying every root on random inputs", () => {
		const random = createRandom(1361);
		for (let run = 0; run < 500; run++) {
			const n = random.int(1, 6);
			const left = random.array(n, -1, n - 1);
			const right = random.array(n, -1, n - 1);
			expect(validateBinaryTreeNodes(n, left, right)).toBe(
				byBruteForce(n, left, right),
			);
		}
	});
});
