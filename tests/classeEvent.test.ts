import { addUserToWaitingList, addUserToDancers } from '../utils';
import { mockEventEmpty, getMockUser } from '../mocks';

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
