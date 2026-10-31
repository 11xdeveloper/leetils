/**
 * 2810. Faulty Keyboard
 *
 * Typing `i` reverses everything typed so far instead of adding a
 * letter. Returns the final text.
 *
 * Keep a deque, adding to whichever end is currently the back, and
 * reverse once at the end if needed.
 *
 * @see https://leetcode.com/problems/faulty-keyboard/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * faultyKeyboard("poiinter"); // "ponter"
 */
export const faultyKeyboard = (s: string): string => {
	const front: string[] = [];
	const back: string[] = [];
	let reversed = false;
	for (const c of s) {
		if (c === "i") reversed = !reversed;
		else if (reversed) front.push(c);
		else back.push(c);
	}
	const text = [...front.toReversed(), ...back];
	return (reversed ? text.toReversed() : text).join("");
};
