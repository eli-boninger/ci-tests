import { afterEach, expect, it, describe, vi } from "vitest";
import { sum } from "./sum";
import MessagingService from "./messagingService";

const mocks = vi.hoisted(() => ({
    post: vi.fn()
}));

vi.mock('axios', () => ({
    default: {
        post: mocks.post
    }
}));

describe('sum function', () => {
    it('called with 0 and 1 is equal to 1', () => {
        expect(sum(0, 1)).toBe(1);
    });

    it('called with 0 and -1 is equal to -1', () => {
        expect(sum(0, -1)).toBe(-1);
    });
});

describe('messagingService', () => {
    afterEach(() => {
        mocks.post.mockReset();
    });

    it('updates username correctly', () => {
        const service = new MessagingService('eli', 'https://testing.com');

        service.updateUsername('genesis');

        expect(service.username).toBe('genesis');
    });

    describe('sendMessage', () => {
        it('Posts to the api url with the to user and the message as the post body', async () => {
            const service = new MessagingService('eli', 'http://testing.com');

            await service.sendMessage('genesis', 'sup?');
            expect(mocks.post).toHaveBeenCalledOnce();
            expect(mocks.post).toHaveBeenNthCalledWith(1, 'http://testing.com/send?to=genesis', { 'message': 'sup?' });
        });

        it('Adds return value to ', async () => {
            const service = new MessagingService('eli', 'http://testing.com');
            mocks.post.mockResolvedValue(123);

            await service.sendMessage('genesis', 'sup?');
            expect(service.sentMessages[0]).toEqual(123);
            expect(service.sentMessages.length).toEqual(1);
            expect(mocks.post).toHaveBeenCalledOnce();
        });
    });
});
