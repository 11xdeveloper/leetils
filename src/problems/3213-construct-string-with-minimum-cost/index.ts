/**
 * 3213. Construct String with Minimum Cost
 *
 * Build `target` by appending words from `words`, where `words[i]` costs
 * `costs[i]` each time. Returns the smallest total cost, or -1.
 *
 * Put the words in an Aho–Corasick automaton, keeping each word's cheapest
 * cost at its node and a link from every node to the nearest word that's a
 * suffix of it. Walking `target` through the automaton then lists every
 * word ending at each position, and `best[i]` is the cheapest way to build
 * the first i letters. There are only O(√L) distinct word lengths, so few
 * words end at any one position.
 *
 * @see https://leetcode.com/problems/construct-string-with-minimum-cost/
 * @difficulty Hard
 * @timeComplexity O(L · 26 + n √L), for L letters of words
 * @spaceComplexity O(L · 26 + n)
 *
 * @example
 * constructStringWithMinimumCost("abcdef", ["abdef", "abc", "d", "def", "ef"], [100, 1, 1, 10, 5]); // 7
 */
export const constructStringWithMinimumCost = (
	target: string,
	words: readonly string[],
	costs: readonly number[],
): number => {
	const children: number[] = new Array<number>(26).fill(-1);
	const cost: number[] = [Number.POSITIVE_INFINITY];
	const depth: number[] = [0];
	const addNode = (d: number): number => {
		for (let c = 0; c < 26; c++) children.push(-1);
		cost.push(Number.POSITIVE_INFINITY);
		depth.push(d);
		return cost.length - 1;
	};
	words.forEach((word, i) => {
		let node = 0;
		for (let k = 0; k < word.length; k++) {
			const slot = node * 26 + word.charCodeAt(k) - 97;
			let child = children[slot] ?? -1;
			if (child === -1) {
				child = addNode(k + 1);
				children[slot] = child;
			}
			node = child;
		}
		cost[node] = Math.min(cost[node] ?? 0, costs[i] ?? 0);
	});
	const count = cost.length;
	const fail = new Int32Array(count);
	const output = new Int32Array(count).fill(-1);
	const queue: number[] = [];
	for (let c = 0; c < 26; c++) {
		const child = children[c] ?? -1;
		if (child === -1) children[c] = 0;
		else queue.push(child);
	}
	for (let i = 0; i < queue.length; i++) {
		const node = queue[i] ?? 0;
		const link = fail[node] ?? 0;
		output[node] =
			(cost[link] ?? 0) < Number.POSITIVE_INFINITY
				? link
				: (output[link] ?? -1);
		for (let c = 0; c < 26; c++) {
			const slot = node * 26 + c;
			const child = children[slot] ?? -1;
			const fallback = children[link * 26 + c] ?? 0;
			if (child === -1) children[slot] = fallback;
			else {
				fail[child] = fallback;
				queue.push(child);
			}
		}
	}
	const best = new Float64Array(target.length + 1).fill(
		Number.POSITIVE_INFINITY,
	);
	best[0] = 0;
	let state = 0;
	for (let i = 0; i < target.length; i++) {
		state = children[state * 26 + target.charCodeAt(i) - 97] ?? 0;
		for (
			let node =
				(cost[state] ?? 0) < Number.POSITIVE_INFINITY
					? state
					: (output[state] ?? -1);
			node > 0;
			node = output[node] ?? -1
		)
			best[i + 1] = Math.min(
				best[i + 1] ?? 0,
				(best[i + 1 - (depth[node] ?? 0)] ?? 0) + (cost[node] ?? 0),
			);
	}
	const answer = best[target.length] ?? Number.POSITIVE_INFINITY;
	return answer === Number.POSITIVE_INFINITY ? -1 : answer;
};
