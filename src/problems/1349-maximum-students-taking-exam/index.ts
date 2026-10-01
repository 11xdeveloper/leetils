/**
 * 1349. Maximum Students Taking Exam
 *
 * Seats are `.` (usable) or `#` (broken). A student can see neighbours to
 * the left, right, front-left and front-right. Returns the most students
 * that can sit with none able to see another.
 *
 * Dynamic programming row by row over bitmasks of occupied seats: a row's
 * mask must use working seats and have no two neighbours, and must not
 * sit diagonally behind anyone in the previous row's mask.
 *
 * @see https://leetcode.com/problems/maximum-students-taking-exam/
 * @difficulty Hard
 * @timeComplexity O(m · 4^n)
 * @spaceComplexity O(2^n)
 *
 * @example
 * maximumStudentsTakingExam([["#", ".", "#", "#", ".", "#"], [".", "#", "#", "#", "#", "."], ["#", ".", "#", "#", ".", "#"]]); // 4
 */
export const maximumStudentsTakingExam = (
	seats: readonly (readonly string[])[],
): number => {
	const n = seats[0]?.length ?? 0;
	const full = 1 << n;
	const popcount = (mask: number) => {
		let count = 0;
		for (let rest = mask; rest !== 0; rest &= rest - 1) count++;
		return count;
	};
	let best = new Array<number>(full).fill(-Infinity);
	best[0] = 0;
	for (const row of seats) {
		const usable = row.reduce(
			(mask, seat, c) => (seat === "." ? mask | (1 << c) : mask),
			0,
		);
		const next = new Array<number>(full).fill(-Infinity);
		for (let mask = 0; mask < full; mask++) {
			if ((mask & ~usable) !== 0 || (mask & (mask << 1)) !== 0) continue;
			for (let above = 0; above < full; above++) {
				const previous = best[above] ?? -Infinity;
				if (previous === -Infinity) continue;
				if ((mask & (above << 1)) !== 0 || (mask & (above >> 1)) !== 0)
					continue;
				next[mask] = Math.max(
					next[mask] ?? -Infinity,
					previous + popcount(mask),
				);
			}
		}
		best = next;
	}
	return Math.max(...best);
};
