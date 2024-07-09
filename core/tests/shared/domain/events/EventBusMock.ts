import {expect, vi} from "vitest";
import {EventBus} from "../../../../src/shared/domain/events/EventBus";
import {DomainEvent} from "../../../../src/shared/domain/events/DomainEvent";

export class EventBusMock implements EventBus {
    private publishSpy = vi.fn();

    async publish(...events: DomainEvent[]) {
        this.publishSpy(events);
    }

    assertLastPublishedEventIs(expectedEvent: DomainEvent) {
        const publishSpyCalls = this.publishSpy.mock.calls;

        expect(publishSpyCalls.length).toBeGreaterThan(0);

        const lastPublishSpyCall = publishSpyCalls[publishSpyCalls.length - 1];
        const lastPublishedEvent = lastPublishSpyCall[0][0];

        const expected = this.getDataFromDomainEvent(expectedEvent);
        const published = this.getDataFromDomainEvent(lastPublishedEvent);

        expect(expected).toMatchObject(published);
    }

    private getDataFromDomainEvent(event: DomainEvent) {
        const { eventId, occurredOn, ...attributes } = event;

        return attributes;
    }
}
