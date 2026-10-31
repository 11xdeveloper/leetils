/**
 * 3412. Find Mirror Score of a String
 *
 * A letter's mirror is its reverse in the alphabet ('a' and 'z'). Going
 * left to right, each letter pairs with the closest unpaired mirror letter
 * before it, if any, scoring the distance between them. Returns the total.
 *
 * Keep a stack of unpaired positions per letter; pair with the top of the
 * mirror letter's stack.
 *
 * @see https://leetcode.com/problems/find-mirror-score-of-a-string/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findMirrorScoreOfAString("aczzx"); // 5
 */
export const findMirrorScoreOfAString = (s: string): number => {
	const stacks: number[][] = Array.from({ length: 26 }, () => []);
	let score = 0;
	for (let i = 0; i < s.length; i++) {
		const letter = s.charCodeAt(i) - 97;
		const partner = stacks[25 - letter]?.pop();
		if (partner === undefined) stacks[letter]?.push(i);
		else score += i - partner;
	}
	return score;
};
