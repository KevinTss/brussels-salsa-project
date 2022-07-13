import {
  addUserToWaitingList,
  addUserToDancers,
  getTotalDancers,
  getLeaderDancerIds,
  getFollowerDancerIds,
  getWaitingLeaderDancerIds,
  getWaitingFollowerDancerIds,
  getParticipantsIds,
} from '../utils';
import { mockEventEmpty, getMockUser, getMockEvent } from '../mocks';

describe('Test function: addUserToWaitingList', () => {
  it(`should add leader to waiting lists`, () => {
    const leader = getMockUser({ role: 'leader' });
    const updatedEvent = addUserToWaitingList(mockEventEmpty, leader);

    expect(updatedEvent.waitingList.leaders.length).toBe(1);
    expect(updatedEvent.waitingList.leaders[0].userId).toBe(leader.id);
  });

  it(`should add follower to waiting lists`, () => {
    const follower = getMockUser({ role: 'follower' });
    const updatedEvent = addUserToWaitingList(mockEventEmpty, follower);

    expect(updatedEvent.waitingList.followers.length).toBe(1);
    expect(updatedEvent.waitingList.followers[0].userId).toBe(follower.id);
  });
});

describe('Test function: addUserToDancers', () => {
  it(`should add leader to dancers lists`, () => {
    const leader = getMockUser({ role: 'leader' });
    const updatedEvent = addUserToDancers(mockEventEmpty, leader);

    expect(updatedEvent.dancers.leaders.length).toBe(1);
    expect(updatedEvent.dancers.leaders[0].userId).toBe(leader.id);
  });

  it(`should add follower to dancers lists`, () => {
    const follower = getMockUser({ role: 'follower' });
    const updatedEvent = addUserToDancers(mockEventEmpty, follower);

    expect(updatedEvent.dancers.followers.length).toBe(1);
    expect(updatedEvent.dancers.followers[0].userId).toBe(follower.id);
  });
});

describe('Test function: getTotalDancers', () => {
  it(`should get '0' dancers on empty event`, () => {
    const event = getMockEvent();
    const totalDancers = getTotalDancers(event);

    expect(totalDancers).toBe(0);
  });

  it(`should get '3' dancers on: Leader 3 | Follower 0`, () => {
    const event = getMockEvent({ dancerLeaderAmount: 3 });
    const totalDancers = getTotalDancers(event);

    expect(totalDancers).toBe(3);
  });

  it(`should get '8' dancers on: Leader 3 | Follower 5`, () => {
    const event = getMockEvent({
      dancerLeaderAmount: 3,
      dancerFollowerAmount: 5,
    });
    const totalDancers = getTotalDancers(event);

    expect(totalDancers).toBe(8);
  });
});

describe('Test function: getLeaderDancerIds', () => {
  it(`should get '0' leader ids`, () => {
    const event = getMockEvent();
    const leaderIds = getLeaderDancerIds(event);

    expect(leaderIds.length).toBe(0);
  });

  it(`should get '2' leader ids`, () => {
    const event = getMockEvent({ dancerLeaderAmount: 2 });
    const leaderIds = getLeaderDancerIds(event);

    expect(leaderIds.length).toBe(2);
  });
});

describe('Test function: getFollowerDancerIds', () => {
  it(`should get '0' follower ids`, () => {
    const event = getMockEvent();
    const followerIds = getFollowerDancerIds(event);

    expect(followerIds.length).toBe(0);
  });

  it(`should get '6' follower ids`, () => {
    const event = getMockEvent({ dancerFollowerAmount: 6 });
    const followerIds = getFollowerDancerIds(event);

    expect(followerIds.length).toBe(6);
  });
});

describe('Test function: getWaitingLeaderDancerIds', () => {
  it(`should get '0' waiting leader ids`, () => {
    const event = getMockEvent();
    const leaderIds = getWaitingLeaderDancerIds(event);

    expect(leaderIds.length).toBe(0);
  });

  it(`should get '2' waiting leader ids`, () => {
    const event = getMockEvent({ dancerLeaderWaitingAmount: 2 });
    const leaderIds = getWaitingLeaderDancerIds(event);

    expect(leaderIds.length).toBe(2);
  });
});

describe('Test function: getWaitingFollowerDancerIds', () => {
  it(`should get '0' waiting leader ids`, () => {
    const event = getMockEvent();
    const followerIds = getWaitingFollowerDancerIds(event);

    expect(followerIds.length).toBe(0);
  });

  it(`should get '2' waiting leader ids`, () => {
    const event = getMockEvent({ dancerFollowerWaitingAmount: 2 });
    const followerIds = getWaitingFollowerDancerIds(event);

    expect(followerIds.length).toBe(2);
  });
});

describe('Test function: getParticipantsIds', () => {
  it(`should get no participant ids`, () => {
    const event = getMockEvent();
    const participantIds = getParticipantsIds(event);

    expect(participantIds.leadersIds.length).toBe(0);
    expect(participantIds.followersIds.length).toBe(0);
    expect(participantIds.waitingLeadersIds.length).toBe(0);
    expect(participantIds.waitingFollowersIds.length).toBe(0);
  });

  it(`should get participant ids`, () => {
    const event = getMockEvent({
      dancerLeaderAmount: 1,
      dancerFollowerAmount: 3,
      dancerLeaderWaitingAmount: 4,
      dancerFollowerWaitingAmount: 2,
    });
    const participantIds = getParticipantsIds(event);

    expect(participantIds.leadersIds.length).toBe(1);
    expect(participantIds.followersIds.length).toBe(3);
    expect(participantIds.waitingLeadersIds.length).toBe(4);
    expect(participantIds.waitingFollowersIds.length).toBe(2);
  });
});
