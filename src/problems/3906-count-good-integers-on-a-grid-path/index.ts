/**
 * 3906. Count Good Integers on a Grid Path
 *
 * Write each integer as 16 digits (with leading zeros) filling a 4 × 4
 * grid row by row, and follow `directions` (three D, three R) from the
 * top-left. Counts the integers from `l` to `r` whose digits along the
 * path never decrease.
 *
 * The path only moves right or down, so it visits its cells in reading
 * order. Digit DP over the 16 digits, tracking the last digit seen on the
 * path.
 *
 * @see https://leetcode.com/problems/count-good-integers-on-a-grid-path/
 * @difficulty Hard
 * @timeComplexity O(16 · 10²)
 * @spaceComplexity O(16 · 10)
 *
 * @example
 * countGoodIntegersOnAGridPath(8, 10, "DDDRRR"); // 2
 */
export const countGoodIntegersOnAGridPath = (
	l: number,
	r: number,
	directions: string,
): number => {
	const onPath = new Uint8Array(16);
	let [row, column] = [0, 0];
	onPath[0] = 1;
	for (const step of directions) {
		if (step === "D") row++;
		else column++;
		onPath[row * 4 + column] = 1;
	}
	const upTo = (n: number): number => {
		if (n < 0) return 0;
		const digits = String(n).padStart(16, "0");
		const memo = new Map<string, number>();
		const go = (pos: number, last: number, tight: boolean): number => {
			if (pos === 16) return 1;
			const key = `${pos},${last}`;
			const cached = tight ? undefined : memo.get(key);
			if (cached !== undefined) return cached;
			const top = tight ? Number(digits[pos]) : 9;
			let count = 0;
			for (let d = 0; d <= top; d++) {
				if (onPath[pos] && d < last) continue;
				count += go(pos + 1, onPath[pos] ? d : last, tight && d === top);
			}
			if (!tight) memo.set(key, count);
			return count;
		};
		return go(0, 0, true);
	};
	return upTo(r) - upTo(l - 1);
};
