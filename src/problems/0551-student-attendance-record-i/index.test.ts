import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { studentAttendanceRecordI as checkRecord } from ".";

const byCounting = (s: string): boolean => {
	let absences = 0;
	let lateRun = 0;
	for (const day of s) {
		if (day === "A") absences++;
		lateRun = day === "L" ? lateRun + 1 : 0;
		if (absences >= 2 || lateRun >= 3) return false;
	}
	return true;
};

describe("551. Student Attendance Record I", () => {
	it("solves the examples from the problem statement", () => {
		expect(checkRecord("PPALLP")).toBeTrue();
		expect(checkRecord("PPALLL")).toBeFalse();
	});

	it("matches counting day by day on random records", () => {
		const random = createRandom(551);
		for (let run = 0; run < 1000; run++) {
			const s = random.string(random.int(1, 12), "PPLLA");
			expect(checkRecord(s)).toBe(byCounting(s));
		}
	});
});
