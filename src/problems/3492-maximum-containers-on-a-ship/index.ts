/**
 * 3492. Maximum Containers on a Ship
 *
 * The most containers of weight `w` that fit on an n × n deck (one per
 * cell) without passing `maxWeight`.
 *
 * Limited by both the cells and the weight.
 *
 * @see https://leetcode.com/problems/maximum-containers-on-a-ship/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumContainersOnAShip(2, 3, 15); // 4
 */
export const maximumContainersOnAShip = (
	n: number,
	w: number,
	maxWeight: number,
): number => Math.min(n * n, Math.floor(maxWeight / w));
