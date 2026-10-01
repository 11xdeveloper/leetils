import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { smallestSufficientTeam } from ".";

/** The smallest team size, trying every subset of people. */
const smallestSize = (skills: string[], people: string[][]): number => {
	let best = Infinity;
	for (let subset = 0; subset < 2 ** people.length; subset++) {
		const members = people.filter((_, i) => subset & (1 << i));
		const covered = new Set(members.flat());
		if (skills.every((skill) => covered.has(skill)))
			best = Math.min(best, members.length);
	}
	return best;
};

const expectSmallestTeam = (skills: string[], people: string[][]) => {
	const team = smallestSufficientTeam(skills, people);
	expect(new Set(team).size).toBe(team.length);
	const covered = new Set(team.flatMap((i) => people[i] ?? []));
	for (const skill of skills) expect(covered).toContain(skill);
	expect(team).toHaveLength(smallestSize(skills, people));
};

describe("1125. Smallest Sufficient Team", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			smallestSufficientTeam(
				["java", "nodejs", "reactjs"],
				[["java"], ["nodejs"], ["nodejs", "reactjs"]],
			).sort(),
		).toEqual([0, 2]);
		expect(
			smallestSufficientTeam(
				["algorithms", "math", "java", "reactjs", "csharp", "aws"],
				[
					["algorithms", "math", "java"],
					["algorithms", "math", "reactjs"],
					["java", "csharp", "aws"],
					["reactjs", "csharp"],
					["csharp", "math"],
					["aws", "java"],
				],
			).sort(),
		).toEqual([1, 2]);
	});

	it("handles sixteen skills and sixty people", () => {
		const skills = Array.from({ length: 16 }, (_, i) => `s${i}`);
		const people = Array.from({ length: 60 }, (_, i) => [
			skills[i % 16] ?? "",
			skills[(i * 7 + 3) % 16] ?? "",
		]);
		const team = smallestSufficientTeam(skills, people);
		const covered = new Set(team.flatMap((i) => people[i] ?? []));
		expect(covered.size).toBe(16);
		expect(team).toHaveLength(8);
	});

	it("finds a smallest team on random inputs", () => {
		const random = createRandom(1125);
		for (let run = 0; run < 200; run++) {
			const skills = Array.from(
				{ length: random.int(1, 6) },
				(_, i) => `s${i}`,
			);
			const people = Array.from({ length: random.int(1, 8) }, () =>
				skills.filter(() => random.next() < 0.35),
			);
			const last = people.at(-1);
			for (const skill of skills) {
				if (!people.some((skills) => skills.includes(skill))) last?.push(skill);
			}
			expectSmallestTeam(skills, people);
		}
	});
});
