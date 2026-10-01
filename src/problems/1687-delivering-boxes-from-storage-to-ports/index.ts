/**
 * 1687. Delivering Boxes from Storage to Ports
 *
 * A ship carries at most `maxBoxes` boxes and `maxWeight` weight per trip,
 * delivers boxes `[port, weight]` in order, and returns to storage.
 * Returns the fewest trips (each move between ports or storage counts) to
 * deliver everything.
 *
 * `best[i]` is the cheapest way to deliver the first `i` boxes. A load of
 * boxes `j … i − 1` costs 2 plus the number of port changes inside it,
 * which is `changes[i − 1] − changes[j]` with prefix counts. So
 * `best[i] = changes[i − 1] + 2 + min(best[j] − changes[j])` over the
 * loads that fit, a sliding window kept in a monotonic deque.
 *
 * @see https://leetcode.com/problems/delivering-boxes-from-storage-to-ports/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * deliveringBoxesFromStorageToPorts([[1, 1], [2, 1], [1, 1]], 2, 3, 3); // 4
 */
export const deliveringBoxesFromStorageToPorts = (
	boxes: readonly (readonly number[])[],
	_portsCount: number,
	maxBoxes: number,
	maxWeight: number,
): number => {
	const n = boxes.length;
	const changes = new Array<number>(n).fill(0);
	for (let i = 1; i < n; i++) {
		changes[i] =
			(changes[i - 1] ?? 0) + (boxes[i]?.[0] === boxes[i - 1]?.[0] ? 0 : 1);
	}
	const best = new Array<number>(n + 1).fill(0);
	const key = (j: number) => (best[j] ?? 0) - (changes[j] ?? 0);
	const window: number[] = [0];
	let head = 0;
	let [start, weight] = [0, 0];
	for (let i = 1; i <= n; i++) {
		weight += boxes[i - 1]?.[1] ?? 0;
		while (i - start > maxBoxes || weight > maxWeight) {
			weight -= boxes[start]?.[1] ?? 0;
			start++;
		}
		while ((window[head] ?? 0) < start) head++;
		best[i] = (changes[i - 1] ?? 0) + 2 + key(window[head] ?? 0);
		if (i === n) break;
		while (window.length > head && key(window.at(-1) ?? 0) >= key(i))
			window.pop();
		window.push(i);
	}
	return best[n] ?? 0;
};
