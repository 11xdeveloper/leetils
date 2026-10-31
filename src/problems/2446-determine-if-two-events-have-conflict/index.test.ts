import { describe, expect, it } from "bun:test";
import { determineIfTwoEventsHaveConflict as haveConflict } from ".";

describe("2446. Determine if Two Events Have Conflict", () => {
	it("solves the examples from the problem statement", () => {
		expect(haveConflict(["01:15", "02:00"], ["02:00", "03:00"])).toBeTrue();
		expect(haveConflict(["01:00", "02:00"], ["01:20", "03:00"])).toBeTrue();
		expect(haveConflict(["10:00", "11:00"], ["14:00", "15:00"])).toBeFalse();
	});
});
