/**
 * 1871. Jump Game VII
 *
 * From index 0 of the binary string `s`, jumps of `minJump … maxJump`
 * may only land on `0`s. Returns whether the last index is reachable.
 *
 * Index `i` is reachable if any reachable index lies in
 * `[i − maxJump, i − minJump]`; a sliding count of reachable indices in
 * that window answers it in constant time.
 *
 * @see https://leetcode.com/problems/jump-game-vii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * jumpGameVII("011010", 2, 3); // true
 */
export const jumpGameVII = (
	s: string,
	minJump: number,
	maxJump: number,
): boolean => {
	const reachable = new Uint8Array(s.length);
	reachable[0] = 1;
	let inWindow = 0;
	for (let i = 1; i < s.length; i++) {
		if (i >= minJump) inWindow += reachable[i - minJump] ?? 0;
		if (i > maxJump) inWindow -= reachable[i - maxJump - 1] ?? 0;
		if (s[i] === "0" && inWindow > 0) reachable[i] = 1;
	}
	return reachable[s.length - 1] === 1;
};
