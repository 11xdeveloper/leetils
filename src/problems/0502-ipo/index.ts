import { Heap } from "../../internal/heap";

/**
 * 502. IPO
 *
 * Starting with capital `w`, you may finish at most `k` projects. Project
 * `i` needs capital `capital[i]` to start and adds `profits[i]` to your
 * capital when done. Returns the most capital you can end with.
 *
 * Greedy: each time, do the most profitable project you can afford, since
 * more capital only unlocks more projects. Projects are sorted by the
 * capital they need and moved into a max-heap of profits as they become
 * affordable.
 *
 * @see https://leetcode.com/problems/ipo/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * ipo(2, 0, [1, 2, 3], [0, 1, 1]); // 4
 */
export const ipo = (
	k: number,
	w: number,
	profits: readonly number[],
	capital: readonly number[],
): number => {
	const byCapital = profits
		.map((_, i) => i)
		.sort((a, b) => (capital[a] ?? 0) - (capital[b] ?? 0));
	const affordable = new Heap<number>((a, b) => b - a);
	let next = 0;

	for (let done = 0; done < k; done++) {
		while (
			next < byCapital.length &&
			(capital[byCapital[next] ?? 0] ?? 0) <= w
		) {
			affordable.push(profits[byCapital[next] ?? 0] ?? 0);
			next++;
		}
		const profit = affordable.pop();
		if (profit === undefined) break;
		w += profit;
	}

	return w;
};
