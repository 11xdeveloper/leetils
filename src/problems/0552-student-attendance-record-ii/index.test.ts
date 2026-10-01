import { describe, expect, it } from "bun:test";
import { studentAttendanceRecordI } from "../0551-student-attendance-record-i";
import { studentAttendanceRecordII as checkRecord } from ".";

/** Checks every record of length n. */
const byBruteForce = (n: number): number => {
	let count = 0;
	for (let code = 0; code < 3 ** n; code++) {
		let record = "";
		for (let rest = code, i = 0; i < n; i++, rest = Math.floor(rest / 3))
			record += "APL".charAt(rest % 3);
		if (studentAttendanceRecordI(record)) count++;
	}
	return count;
};

describe("552. Student Attendance Record II", () => {
	it("solves the examples from the problem statement", () => {
		expect(checkRecord(2)).toBe(8);
		expect(checkRecord(1)).toBe(3);
		expect(checkRecord(10101)).toBe(183236316);
	});

	it("matches checking every record up to length 9", () => {
		for (let n = 1; n <= 9; n++) expect(checkRecord(n)).toBe(byBruteForce(n));
	});

	it("handles the largest input", () => {
		expect(checkRecord(100_000)).toBeWithin(0, 1_000_000_007);
	});
});
