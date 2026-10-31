/**
 * 2232. Minimize Result by Adding Parentheses to Expression
 *
 * `expression` is `"<num1>+<num2>"`. Adds one pair of parentheses around
 * the `+` (any digits on either side may stay outside, multiplying the
 * bracket) to make the value smallest, and returns the expression.
 *
 * Try every split of each number.
 *
 * @see https://leetcode.com/problems/minimize-result-by-adding-parentheses-to-expression/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * minimizeResultByAddingParenthesesToExpression("247+38"); // "2(47+38)"
 */
export const minimizeResultByAddingParenthesesToExpression = (
	expression: string,
): string => {
	const [left = "", right = ""] = expression.split("+");
	let [best, answer] = [Infinity, ""];
	for (let i = 0; i < left.length; i++) {
		for (let j = 1; j <= right.length; j++) {
			const before = Number(left.slice(0, i) || "1");
			const after = Number(right.slice(j) || "1");
			const value =
				before * (Number(left.slice(i)) + Number(right.slice(0, j))) * after;
			if (value >= best) continue;
			best = value;
			answer = `${left.slice(0, i)}(${left.slice(i)}+${right.slice(0, j)})${right.slice(j)}`;
		}
	}
	return answer;
};
