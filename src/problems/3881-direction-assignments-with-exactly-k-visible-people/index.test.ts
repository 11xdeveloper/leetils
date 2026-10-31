import { describe, expect, it } from "bun:test";
import { directionAssignmentsWithExactlyKVisiblePeople as countVisiblePeople } from ".";

describe("3881. Direction Assignments with Exactly K Visible People", () => {
	it("solves the examples from the problem statement", () => {
		expect(countVisiblePeople(3, 1, 0)).toBe(2);
		expect(countVisiblePeople(3, 2, 1)).toBe(4);
		expect(countVisiblePeople(1, 0, 0)).toBe(2);
	});

	it("matches trying every assignment", () => {
		for (let n = 1; n <= 8; n++)
			for (let pos = 0; pos < n; pos++)
				for (let k = 0; k < n; k++) {
					let expected = 0;
					for (let mask = 0; mask < 1 << n; mask++) {
						let seen = 0;
						for (let i = 0; i < n; i++)
							if (i !== pos && ((mask >> i) & 1) === (i < pos ? 0 : 1)) seen++;
						if (seen === k) expected++;
					}
					expect(countVisiblePeople(n, pos, k)).toBe(expected);
				}
	});
});
