import { describe, expect, it } from "bun:test";
import {
	ExpressionTreeNode,
	expressionTreeFromArray,
} from "../../structures/expression-tree-node";
import { createRandom, type Random } from "../../testing/random";
import { checkIfTwoExpressionTreesAreEquivalent as checkEquivalence } from ".";

/** A random sum tree over the given leaves, in a random shape. */
const randomTree = (random: Random, leaves: string[]): ExpressionTreeNode => {
	if (leaves.length === 1) return new ExpressionTreeNode(leaves[0]);
	const split = random.int(1, leaves.length - 1);
	return new ExpressionTreeNode(
		"+",
		randomTree(random, leaves.slice(0, split)),
		randomTree(random, leaves.slice(split)),
	);
};

const evaluate = (
	node: ExpressionTreeNode | null,
	values: Record<string, number>,
): number =>
	!node
		? 0
		: node.val === "+"
			? evaluate(node.left, values) + evaluate(node.right, values)
			: (values[node.val] ?? 0);

describe("1612. Check If Two Expression Trees are Equivalent", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			checkEquivalence(
				expressionTreeFromArray(["x"]),
				expressionTreeFromArray(["x"]),
			),
		).toBeTrue();
		expect(
			checkEquivalence(
				expressionTreeFromArray(["+", "a", "+", null, null, "b", "c"]),
				expressionTreeFromArray(["+", "+", "a", "b", "c"]),
			),
		).toBeTrue();
		expect(
			checkEquivalence(
				expressionTreeFromArray(["+", "a", "+", null, null, "b", "c"]),
				expressionTreeFromArray(["+", "+", "a", "b", "d"]),
			),
		).toBeFalse();
	});

	it("agrees with evaluating at random values on random trees", () => {
		const random = createRandom(1612);
		for (let run = 0; run < 300; run++) {
			const size = random.int(1, 6);
			const a = randomTree(
				random,
				Array.from({ length: size }, () => random.string(1, "abc")),
			);
			const b = randomTree(
				random,
				Array.from({ length: size }, () => random.string(1, "abc")),
			);
			const values = { a: 1, b: 100, c: 10000 };
			expect(checkEquivalence(a, b)).toBe(
				evaluate(a, values) === evaluate(b, values),
			);
		}
	});
});
