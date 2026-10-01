import { describe, expect, it } from "bun:test";
import {
	type ExpressionTreeNode,
	expressionTreeToArray,
} from "../../structures/expression-tree-node";
import { createRandom, type Random } from "../../testing/random";
import { buildBinaryExpressionTreeFromInfixExpression as expTree } from ".";

const inorder = (node: ExpressionTreeNode | null): string =>
	node ? inorder(node.left) + node.val + inorder(node.right) : "";

const evaluate = (node: ExpressionTreeNode | null): number => {
	if (!node) return 0;
	if (!node.left) return Number(node.val);
	const [a, b] = [evaluate(node.left), evaluate(node.right)];
	return node.val === "+"
		? a + b
		: node.val === "-"
			? a - b
			: node.val === "*"
				? a * b
				: a / b;
};

/** A recursive-descent evaluator for the infix string itself. */
const evaluateInfix = (s: string): number => {
	let i = 0;
	const factor = (): number => {
		if (s[i] === "(") {
			i++;
			const value = expression();
			i++;
			return value;
		}
		return Number(s[i++]);
	};
	const term = (): number => {
		let value = factor();
		while (s[i] === "*" || s[i] === "/")
			value = s[i++] === "*" ? value * factor() : value / factor();
		return value;
	};
	const expression = (): number => {
		let value = term();
		while (s[i] === "+" || s[i] === "-")
			value = s[i++] === "+" ? value + term() : value - term();
		return value;
	};
	return expression();
};

const randomExpression = (random: Random, depth: number): string => {
	if (depth === 0 || random.next() < 0.3) return String(random.int(1, 9));
	const inner = `${randomExpression(random, depth - 1)}${"+-*/"[random.int(0, 3)]}${randomExpression(random, depth - 1)}`;
	return random.next() < 0.3 ? `(${inner})` : inner;
};

describe("1597. Build Binary Expression Tree From Infix Expression", () => {
	it("solves the examples from the problem statement", () => {
		expect(expressionTreeToArray(expTree("3*4-2*5"))).toEqual([
			"-",
			"*",
			"*",
			"3",
			"4",
			"2",
			"5",
		]);
		expect(expressionTreeToArray(expTree("2-3/(5*2)+1"))).toEqual([
			"+",
			"-",
			"1",
			"2",
			"/",
			null,
			null,
			null,
			null,
			"3",
			"*",
			null,
			null,
			"5",
			"2",
		]);
		expect(expressionTreeToArray(expTree("1+2+3+4+5"))).toEqual([
			"+",
			"+",
			"5",
			"+",
			"4",
			null,
			null,
			"+",
			"3",
			null,
			null,
			"1",
			"2",
		]);
	});

	it("keeps the operands in order and the value right on random expressions", () => {
		const random = createRandom(1597);
		for (let run = 0; run < 300; run++) {
			const s = randomExpression(random, 4);
			const tree = expTree(s);
			expect(inorder(tree)).toBe(s.replace(/[()]/g, ""));
			expect(evaluate(tree)).toBe(evaluateInfix(s));
		}
	});
});
