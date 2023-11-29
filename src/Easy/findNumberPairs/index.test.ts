import findNumberPairs from '.';

test('FindNumberPairs: Finds all pairs of numbers in a given array that sum to a given target. (Modified version of Two Sum)', () => {
    expect(findNumberPairs([2, 7, 11, 15], 9)).toStrictEqual([[2, 7]]);
    expect(findNumberPairs([3, 2, 4], 6)).toStrictEqual([[2, 4]]);
    expect(findNumberPairs([3, 3], 6)).toStrictEqual([[3, 3]]);
    expect(findNumberPairs([0, 0], 1)).toStrictEqual([]);
    expect(findNumberPairs([1, 2, 3, 0, 4, -1], 3)).toStrictEqual([
        [1, 2],
        [3, 0],
        [4, -1]
    ]);
});
