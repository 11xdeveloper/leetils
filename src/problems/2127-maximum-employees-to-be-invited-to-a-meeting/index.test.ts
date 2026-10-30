import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumEmployeesToBeInvitedToAMeeting as maximumInvitations } from ".";

/** Tries every seating order of every group of employees. */
const byBruteForce = (favorite: number[]): number => {
	const n = favorite.length;
	let best = 0;
	const seat = (table: number[], used: number): void => {
		const size = table.length;
		if (
			size >= 2 &&
			size > best &&
			table.every((person, i) => {
				const f = favorite[person];
				return (
					f === table[(i + 1) % size] || f === table[(i - 1 + size) % size]
				);
			})
		)
			best = size;
		for (let person = 0; person < n; person++) {
			if (used & (1 << person)) continue;
			table.push(person);
			seat(table, used | (1 << person));
			table.pop();
		}
	};
	seat([], 0);
	return best;
};

describe("2127. Maximum Employees to Be Invited to a Meeting", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumInvitations([2, 2, 1, 2])).toBe(3);
		expect(maximumInvitations([1, 2, 0])).toBe(3);
		expect(maximumInvitations([3, 0, 1, 4, 1])).toBe(4);
	});

	it("matches trying every seating on random favourites", () => {
		const random = createRandom(2127);
		for (let run = 0; run < 60; run++) {
			const n = random.int(2, 6);
			const favorite = Array.from({ length: n }, (_, i) => {
				const f = random.int(0, n - 2);
				return f >= i ? f + 1 : f;
			});
			expect(maximumInvitations(favorite)).toBe(byBruteForce(favorite));
		}
	});
});
