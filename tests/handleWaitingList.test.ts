import { handleWaitingList } from '../utils';
import { Classe, ClasseEvent, DancerJoin } from '../types';
import {
  MOCK_CLASSE,
  commonEventAttributes,
  commonClasseAttributes,
  getMockedDancers,
} from '../mocks';

describe('Test function: handleWaitingList', () => {
  it(`should not updated anything with empty waiting lists`, () => {
    const MOCK_EVENT_EMPTY = {
      ...commonEventAttributes,
      dancers: {
        followers: [],
        leaders: [],
      },
      waitingList: {
        followers: [],
        leaders: [],
      },
    };
    const { updatedEvent, addedDancerIds } = handleWaitingList(
      MOCK_EVENT_EMPTY,
      MOCK_CLASSE
    );

    expect(JSON.stringify(MOCK_EVENT_EMPTY)).toBe(JSON.stringify(updatedEvent));
    expect(JSON.stringify(addedDancerIds)).toBe('[]');
  });

  it('should not updated anything with empty waiting lists', () => {
    const MOCK_EVENT_EMPTY_WAITING_LIST = {
      ...commonEventAttributes,
      dancers: {
        followers: getMockedDancers(),
        leaders: getMockedDancers(),
      },
      waitingList: {
        followers: [],
        leaders: [],
      },
    };
    const { updatedEvent, addedDancerIds } = handleWaitingList(
      MOCK_EVENT_EMPTY_WAITING_LIST,
      MOCK_CLASSE
    );

    expect(JSON.stringify(MOCK_EVENT_EMPTY_WAITING_LIST)).toBe(
      JSON.stringify(updatedEvent)
    );
    expect(JSON.stringify(addedDancerIds)).toBe('[]');
  });

  it('should add a single leader into the list', () => {
    const MOCK_EVENT = {
      ...commonEventAttributes,
      dancers: {
        followers: getMockedDancers(),
        leaders: getMockedDancers(),
      },
      waitingList: {
        followers: [],
        leaders: getMockedDancers(),
      },
    };
    const { updatedEvent, addedDancerIds } = handleWaitingList(
      MOCK_EVENT,
      MOCK_CLASSE
    );

    expect(updatedEvent.dancers.leaders.length).toBe(2);
    expect(updatedEvent.dancers.followers.length).toBe(1);
    expect(updatedEvent.waitingList.followers.length).toBe(0);
    expect(updatedEvent.waitingList.leaders.length).toBe(0);
    expect(JSON.stringify(addedDancerIds)).toBe(
      `["${MOCK_EVENT.waitingList.leaders[0].userId}"]`
    );
  });

  it('should add a single follower into the list', () => {
    const MOCK_EVENT = {
      ...commonEventAttributes,
      dancers: {
        followers: getMockedDancers(),
        leaders: getMockedDancers(),
      },
      waitingList: {
        followers: getMockedDancers(),
        leaders: [],
      },
    };
    const { updatedEvent, addedDancerIds } = handleWaitingList(
      MOCK_EVENT,
      MOCK_CLASSE
    );

    expect(updatedEvent.dancers.leaders.length).toBe(1);
    expect(updatedEvent.dancers.followers.length).toBe(2);
    expect(updatedEvent.waitingList.followers.length).toBe(0);
    expect(updatedEvent.waitingList.leaders.length).toBe(0);
    expect(JSON.stringify(addedDancerIds)).toBe(
      `["${MOCK_EVENT.waitingList.followers[0].userId}"]`
    );
  });

  it('should add leaders without check the balance', () => {
    const MOCK_EVENT = {
      ...commonEventAttributes,
      dancers: {
        followers: getMockedDancers(),
        leaders: getMockedDancers(),
      },
      waitingList: {
        followers: [],
        leaders: getMockedDancers(10),
      },
    };
    const CLASSE = {
      ...commonClasseAttributes,
      balanceOffset: 2,
      spots: { base: 100 },
    };
    const { updatedEvent, addedDancerIds } = handleWaitingList(
      MOCK_EVENT,
      CLASSE
    );

    expect(updatedEvent.dancers.leaders.length).toBe(11);
    expect(updatedEvent.dancers.followers.length).toBe(1);
    expect(updatedEvent.waitingList.followers.length).toBe(0);
    expect(updatedEvent.waitingList.leaders.length).toBe(0);
    expect(addedDancerIds.length).toBe(10);
  });

  it('should add followers without check the balance', () => {
    const MOCK_EVENT = {
      ...commonEventAttributes,
      dancers: {
        followers: getMockedDancers(),
        leaders: getMockedDancers(),
      },
      waitingList: {
        followers: getMockedDancers(50),
        leaders: [],
      },
    };
    const CLASSE = {
      ...commonClasseAttributes,
      balanceOffset: 2,
      spots: { base: 100 },
    };
    const { updatedEvent, addedDancerIds } = handleWaitingList(
      MOCK_EVENT,
      CLASSE
    );

    expect(updatedEvent.dancers.leaders.length).toBe(1);
    expect(updatedEvent.dancers.followers.length).toBe(51);
    expect(updatedEvent.waitingList.followers.length).toBe(0);
    expect(updatedEvent.waitingList.leaders.length).toBe(0);
    expect(addedDancerIds.length).toBe(50);
  });

  it('should not add leader by respecting the balance offset', () => {
    const MOCK_EVENT = {
      ...commonEventAttributes,
      dancers: {
        followers: getMockedDancers(),
        leaders: getMockedDancers(),
      },
      waitingList: {
        followers: [],
        leaders: getMockedDancers(10),
      },
    };
    const CLASSE = {
      ...commonClasseAttributes,
      balanceOffset: 2,
      spots: { base: 5 },
    };
    const { updatedEvent, addedDancerIds } = handleWaitingList(
      MOCK_EVENT,
      CLASSE
    );

    /**
     * Till a total of 5 we don't check the balance
     */
    expect(updatedEvent.dancers.leaders.length).toBe(4);
    expect(updatedEvent.dancers.followers.length).toBe(1);
    expect(updatedEvent.waitingList.followers.length).toBe(0);
    expect(updatedEvent.waitingList.leaders.length).toBe(7);
    expect(addedDancerIds.length).toBe(3);
  });

  it('should not add followers by respecting the balance offset', () => {
    const MOCK_EVENT = {
      ...commonEventAttributes,
      dancers: {
        followers: getMockedDancers(),
        leaders: getMockedDancers(),
      },
      waitingList: {
        followers: getMockedDancers(10),
        leaders: [],
      },
    };
    const CLASSE = {
      ...commonClasseAttributes,
      balanceOffset: 2,
      spots: { base: 5 },
    };
    const { updatedEvent, addedDancerIds } = handleWaitingList(
      MOCK_EVENT,
      CLASSE
    );

    /**
     * Till a total of 5 we don't check the balance
     */
    expect(updatedEvent.dancers.leaders.length).toBe(1);
    expect(updatedEvent.dancers.followers.length).toBe(4);
    expect(updatedEvent.waitingList.followers.length).toBe(7);
    expect(updatedEvent.waitingList.leaders.length).toBe(0);
    expect(addedDancerIds.length).toBe(3);
  });

  it('should add dancers by respecting the balance offset - scenario 1', () => {
    const MOCK_EVENT = {
      ...commonEventAttributes,
      dancers: {
        followers: getMockedDancers(),
        leaders: [],
      },
      waitingList: {
        followers: getMockedDancers(10),
        leaders: getMockedDancers(15),
      },
    };
    const CLASSE = {
      ...commonClasseAttributes,
      balanceOffset: 2,
      spots: { base: 5 },
    };
    const { updatedEvent, addedDancerIds } = handleWaitingList(
      MOCK_EVENT,
      CLASSE
    );

    expect(updatedEvent.dancers.leaders.length).toBe(13);
    expect(updatedEvent.dancers.followers.length).toBe(11);
    expect(updatedEvent.waitingList.followers.length).toBe(0);
    expect(updatedEvent.waitingList.leaders.length).toBe(2);
    expect(addedDancerIds.length).toBe(23);
  });

  it('should add dancers by respecting the balance offset - scenario 2', () => {
    const MOCK_EVENT = {
      ...commonEventAttributes,
      dancers: {
        followers: getMockedDancers(),
        leaders: [],
      },
      waitingList: {
        followers: getMockedDancers(2),
        leaders: getMockedDancers(5),
      },
    };
    const CLASSE = {
      ...commonClasseAttributes,
      balanceOffset: 2,
      spots: { base: 2 },
    };
    const { updatedEvent, addedDancerIds } = handleWaitingList(
      MOCK_EVENT,
      CLASSE
    );

    expect(updatedEvent.dancers.leaders.length).toBe(5);
    expect(updatedEvent.dancers.followers.length).toBe(3);
    expect(updatedEvent.waitingList.followers.length).toBe(0);
    expect(updatedEvent.waitingList.leaders.length).toBe(0);
    expect(addedDancerIds.length).toBe(7);
  });

  it('should add dancers by respecting the balance offset - scenario 3', () => {
    const MOCK_EVENT = {
      ...commonEventAttributes,
      dancers: {
        followers: getMockedDancers(),
        leaders: [],
      },
      waitingList: {
        followers: getMockedDancers(2),
        leaders: getMockedDancers(5),
      },
    };
    const CLASSE = {
      ...commonClasseAttributes,
      balanceOffset: 1,
      spots: { base: 2 },
    };
    const { updatedEvent, addedDancerIds } = handleWaitingList(
      MOCK_EVENT,
      CLASSE
    );

    expect(updatedEvent.dancers.leaders.length).toBe(4);
    expect(updatedEvent.dancers.followers.length).toBe(3);
    expect(updatedEvent.waitingList.followers.length).toBe(0);
    expect(updatedEvent.waitingList.leaders.length).toBe(1);
    expect(addedDancerIds.length).toBe(6);
  });
});
