/**
 * 1298. Maximum Candies You Can Get from Boxes
 *
 * Starting with `initialBoxes`, an open box (`status[i]` of 1, or one
 * we've found a key for) yields its candies, keys to other boxes and the
 * boxes inside it. Returns the total candies collected.
 *
 * A search over the boxes we hold: a box is opened as soon as we have it
 * and it's open or we have its key, whichever comes second.
 *
 * @see https://leetcode.com/problems/maximum-candies-you-can-get-from-boxes/
 * @difficulty Hard
 * @timeComplexity O(n + total keys and contained boxes)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumCandiesYouCanGetFromBoxes([1, 0, 1, 0], [7, 5, 4, 100], [[], [], [1], []], [[1, 2], [3], [], []], [0]); // 16
 */
export const maximumCandiesYouCanGetFromBoxes = (
	status: readonly number[],
	candies: readonly number[],
	keys: readonly (readonly number[])[],
	containedBoxes: readonly (readonly number[])[],
	initialBoxes: readonly number[],
): number => {
	const n = status.length;
	const [have, unlocked, opened] = [
		new Uint8Array(n),
		new Uint8Array(n),
		new Uint8Array(n),
	];
	status.forEach((open, box) => {
		unlocked[box] = open;
	});
	const ready: number[] = [];
	const check = (box: number) => {
		if (have[box] && unlocked[box] && !opened[box]) {
			opened[box] = 1;
			ready.push(box);
		}
	};
	for (const box of initialBoxes) {
		have[box] = 1;
		check(box);
	}
	let total = 0;
	for (let box = ready.pop(); box !== undefined; box = ready.pop()) {
		total += candies[box] ?? 0;
		for (const key of keys[box] ?? []) {
			unlocked[key] = 1;
			check(key);
		}
		for (const inner of containedBoxes[box] ?? []) {
			have[inner] = 1;
			check(inner);
		}
	}
	return total;
};
