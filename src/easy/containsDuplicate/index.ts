export const containsDuplicate = (nums: number[]): boolean =>
	new Set(nums).size !== nums.length;
