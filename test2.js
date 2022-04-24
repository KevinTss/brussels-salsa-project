const evt = {
  dancers: {
    leaders: ['L1', 'L2'],
    followers: ['F1'],
  },
  waitingList: {
    leaders: ['L3', 'L4', 'L5', 'L6'],
    followers: [],
  },
};

const [follower] = evt.waitingList.followers.splice(0, 1);
console.log('add follower', follower);
if (follower) {
  evt.dancers.followers.push(follower);
}
console.log('e', evt);
