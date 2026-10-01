/**
 * 1505. Minimum Possible Integer After at Most K Adjacent Swaps On Digits
 *
 * Returns the smallest digit string reachable from `num` with at most `k`
 * swaps of neighbouring digits.
 *
 * Greedy, position by position: bring forward the smallest digit that can
 * reach the front within the swaps left, taking its earliest copy. Moving
 * a digit costs the number of digits still in front of it, which a Fenwick
 * tree over the original positions counts as digits are used up.
 *
 * @see https://leetcode.com/problems/minimum-possible-integer-after-at-most-k-adjacent-swaps-on-digits/
 * @difficulty Hard
 * @timeComplexity O(10 · n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumPossibleIntegerAfterAtMostKAdjacentSwapsOnDigits("4321", 4); // "1342"
 */
export const minimumPossibleIntegerAfterAtMostKAdjacentSwapsOnDigits = (
	num: string,
	k: number,
): string => {
	const n = num.length;
	const positions = Array.from({ length: 10 }, (): number[] => []);
	for (let i = 0; i < n; i++) positions[Number(num[i])]?.push(i);
	const fronts = new Array<number>(10).fill(0);
	// tree counts digits already moved out, by original position.
	const tree = new Array<number>(n + 1).fill(0);
	const movedBefore = (i: number) => {
		let count = 0;
		for (let at = i; at > 0; at -= at & -at) count += tree[at] ?? 0;
		return count;
	};
	let left = k;
	let result = "";
	for (let placed = 0; placed < n; placed++) {
		for (let digit = 0; digit <= 9; digit++) {
			const list = positions[digit] ?? [];
			const front = fronts[digit] ?? 0;
			const position = list[front];
			if (position === undefined) continue;
			const cost = position - movedBefore(position);
			if (cost > left) continue;
			left -= cost;
			result += digit;
			fronts[digit] = front + 1;
			for (let at = position + 1; at <= n; at += at & -at)
				tree[at] = (tree[at] ?? 0) + 1;
			break;
		}
	}
	return result;
};
