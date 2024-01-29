export default (nums: number[], target: number) => {
    const result: number[][] = [];

    const recurse = (
        start: number,
        currentSum: number,
        currentCombination: number[]
    ) => {
        if (currentSum === target) {
            result.push(currentCombination);
            return;
        }

        for (let i = start; i < nums.length; i++) {
            const num = nums[i]!;

            if (currentSum + num > target) continue;

            recurse(i, currentSum + num, [...currentCombination, num]);
        }
    };

    recurse(0, 0, []);
    return result;
};
