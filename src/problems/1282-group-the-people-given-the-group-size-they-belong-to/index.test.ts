import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { groupThePeopleGivenTheGroupSizeTheyBelongTo as groupThePeople } from ".";

const expectValid = (groupSizes: number[]) => {
	const groups = groupThePeople(groupSizes);
	expect(groups.flat().sort((a, b) => a - b)).toEqual(
		groupSizes.map((_, i) => i),
	);
	for (const group of groups) {
		for (const person of group) expect(groupSizes[person]).toBe(group.length);
	}
};

describe("1282. Group the People Given the Group Size They Belong To", () => {
	it("solves the examples from the problem statement", () => {
		expectValid([3, 3, 3, 3, 3, 1, 3]);
		expectValid([2, 1, 3, 3, 3, 2]);
	});

	it("groups random valid inputs correctly", () => {
		const random = createRandom(1282);
		for (let run = 0; run < 300; run++) {
			const sizes: number[] = [];
			for (let groups = random.int(1, 5); groups > 0; groups--) {
				const size = random.int(1, 4);
				sizes.push(...new Array<number>(size).fill(size));
			}
			expectValid(sizes.sort(() => random.next() - 0.5));
		}
	});
});
