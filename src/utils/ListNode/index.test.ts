import { test, expect, describe } from 'bun:test';
import { ListNode } from '../..';

describe('ListNode', () => {
    test('.from: Converts an array of numbers into ListNodes', () => {
        expect(ListNode.from([1, 2, 4])).toStrictEqual(
            new ListNode(1, new ListNode(2, new ListNode(4)))
        );
        expect(ListNode.from([1, 3, 4])).toStrictEqual(
            new ListNode(1, new ListNode(3, new ListNode(4)))
        );
        expect(ListNode.from([1, 1, 2, 3, 4, 4])).toStrictEqual(
            new ListNode(
                1,
                new ListNode(
                    1,
                    new ListNode(
                        2,
                        new ListNode(3, new ListNode(4, new ListNode(4)))
                    )
                )
            )
        );
    });

    test('.push: Adds nodes at the end of the ListNode', () => {
        expect(ListNode.from([1, 2, 4]).push(5)).toStrictEqual(
            ListNode.from([1, 2, 4, 5])
        );
        expect(ListNode.from([1, 1, 2, 3, 4, 4]).push(10, -9, 7)).toStrictEqual(
            ListNode.from([1, 1, 2, 3, 4, 4, 10, -9, 7])
        );
        expect(ListNode.from([1, 3, 4]).push(8, 2)).toStrictEqual(
            ListNode.from([1, 3, 4, 8, 2])
        );
    });

    test('.toArray: Converts the linked node list to a number array.', () => {
        expect(ListNode.from([1, 2, 4]).toArray()).toStrictEqual([1, 2, 4]);
        expect(ListNode.from([1, 3, 4]).toArray()).toStrictEqual([1, 3, 4]);
        expect(ListNode.from([1, 1, 2, 3, 4, 4]).toArray()).toStrictEqual([
            1, 1, 2, 3, 4, 4
        ]);
    });
});
