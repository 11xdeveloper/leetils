/**
 * 2305. Fair Distribution of Cookies
 *
 * Gives every bag of cookies to one of `k` children. Returns the smallest
 * possible largest total any child receives.
 *
 * Backtrack over bag assignments, pruning totals already no better than
 * the best found and children with the same total as an earlier one.
 *
 * @see https://leetcode.com/problems/fair-distribution-of-cookies/
 * @difficulty Medium
 * @timeComplexity O(k^n)
 * @spaceComplexity O(k + n)
 *
 * @example
 * fairDistributionOfCookies([8, 15, 10, 20, 8], 2); // 31
 */
export const fairDistributionOfCookies = (
	cookies: readonly number[],
	k: number,
): number => {
	const bags = cookies.toSorted((a, b) => b - a);
	const totals = new Array<number>(k).fill(0);
	let best = Infinity;
	const assign = (bag: number, largest: number): void => {
		if (largest >= best) return;
		if (bag === bags.length) {
			best = largest;
			return;
		}
		const tried = new Set<number>();
		for (let child = 0; child < k; child++) {
			const total = totals[child] ?? 0;
			if (tried.has(total)) continue;
			tried.add(total);
			const next = total + (bags[bag] ?? 0);
			totals[child] = next;
			assign(bag + 1, Math.max(largest, next));
			totals[child] = total;
		}
	};
	assign(0, 0);
	return best;
};
