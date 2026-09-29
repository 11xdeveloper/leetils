/**
 * 552. Student Attendance Record II
 *
 * Counts the attendance records of length `n` (each day `A`, `L` or `P`)
 * that qualify for an award: fewer than 2 absences and never 3 late days
 * in a row. The count is returned modulo 10^9 + 7.
 *
 * A record so far only matters through its number of absences (0 or 1) and
 * how many late days it ends with (0 to 2), so it counts records in each of
 * those 6 states, day by day.
 *
 * @see https://leetcode.com/problems/student-attendance-record-ii/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * studentAttendanceRecordII(2); // 8: every record except "AA"
 */
export const studentAttendanceRecordII = (n: number): number => {
	const MOD = 1_000_000_007;
	// counts[absences * 3 + trailingLate]
	let counts = [1, 0, 0, 0, 0, 0];

	for (let day = 0; day < n; day++) {
		const next = [0, 0, 0, 0, 0, 0];
		for (let absences = 0; absences < 2; absences++) {
			for (let late = 0; late < 3; late++) {
				const count = counts[absences * 3 + late] ?? 0;
				if (count === 0) continue;
				// Present resets the late run.
				next[absences * 3] = ((next[absences * 3] ?? 0) + count) % MOD;
				// Absent, if it's the first absence.
				if (absences === 0) next[3] = ((next[3] ?? 0) + count) % MOD;
				// Late, if the run stays under 3.
				if (late < 2)
					next[absences * 3 + late + 1] =
						((next[absences * 3 + late + 1] ?? 0) + count) % MOD;
			}
		}
		counts = next;
	}

	return counts.reduce((total, count) => (total + count) % MOD, 0);
};
