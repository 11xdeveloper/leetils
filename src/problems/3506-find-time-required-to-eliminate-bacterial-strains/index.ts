import { Heap } from "../../internal/heap";

/**
 * 3506. Find Time Required to Eliminate Bacterial Strains
 *
 * One white blood cell must kill every strain; strain i takes `timeReq[i]`
 * to kill, and a cell can split into two in `splitTime`, each killing one
 * strain at the end. Returns the least total time.
 *
 * Like building a Huffman tree: repeatedly combine the two quickest jobs
 * into one that takes the slower of them plus a split.
 *
 * @see https://leetcode.com/problems/find-time-required-to-eliminate-bacterial-strains/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * findTimeRequiredToEliminateBacterialStrains([10, 4, 5], 2); // 12
 */
export const findTimeRequiredToEliminateBacterialStrains = (
	timeReq: readonly number[],
	splitTime: number,
): number => {
	const jobs = new Heap<number>((a, b) => a - b, timeReq);
	while (jobs.size > 1) {
		jobs.pop();
		jobs.push((jobs.pop() ?? 0) + splitTime);
	}
	return jobs.peek() ?? 0;
};
