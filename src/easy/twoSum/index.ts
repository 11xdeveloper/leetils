export const twoSum = (nums: number[], target: number): number[] => {
	const mapping = new Map<number, number>();

	for (const [i, num] of nums.entries()) {
		const search = mapping.get(num);
		if (search !== undefined) return [search, i];
		mapping.set(target - num, i);
	}

	return [];
};
