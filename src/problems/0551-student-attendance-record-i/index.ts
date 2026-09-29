/**
 * 551. Student Attendance Record I
 *
 * `s` records each day as `A` (absent), `L` (late) or `P` (present).
 * Returns whether the student qualifies for an award: fewer than 2 absences
 * in total and never 3 or more late days in a row.
 *
 * Checks both conditions directly on the string.
 *
 * @see https://leetcode.com/problems/student-attendance-record-i/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * studentAttendanceRecordI("PPALLL"); // false
 */
export const studentAttendanceRecordI = (s: string): boolean =>
	s.indexOf("A") === s.lastIndexOf("A") && !s.includes("LLL");
