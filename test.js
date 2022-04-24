const classe = {
  balanceOffset: 2,
  spots: {
    base: 5,
    max: 99,
  },
};
const evt_test_1 = {
  dancers: {
    leaders: ['L1', 'L2'],
    followers: ['F1'],
  },
  waitingList: {
    leaders: ['L3', 'L4', 'L5', 'L6'],
    followers: [],
  },
};
const evt_test_2 = {
  dancers: {
    leaders: ['L1'],
    followers: ['F1', 'F2'],
  },
  waitingList: {
    leaders: [],
    followers: ['F3', 'F4', 'F5', 'F6'],
  },
};
const evt_test_3 = {
  dancers: {
    leaders: ['L1'],
    followers: ['F1'],
  },
  waitingList: {
    leaders: ['L2', 'L3', 'L4'],
    followers: ['F2', 'F3', 'F4', 'F5', 'F6'],
  },
};

const evt = evt_test_3;
console.log('Event before', evt);

let shouldCheckWaitingList = true;
let cpt = 0;
while (shouldCheckWaitingList) {
  cpt++;
  const leadersWaitingAmount = evt.waitingList.leaders.length;
  const followersWaitingAmount = evt.waitingList.followers.length;
  const leadersAmount = evt.dancers.leaders.length;
  const followersAmount = evt.dancers.followers.length;
  const totalDancers = leadersAmount + followersAmount;

  // Stop is no dancers in waiting list
  if (
    !leadersWaitingAmount &&
    !followersWaitingAmount &&
    totalDancers < classe.spots.max
  ) {
    console.log('BREAK 2');
    shouldCheckWaitingList = false;
    break;
  }

  if (cpt > 10) {
    console.log('SAFETY BREAK');
    shouldCheckWaitingList = false;
    break;
  }

  const differenceDancers = leadersAmount - followersAmount;
  let majority = null;
  if (differenceDancers > 0) {
    majority = 'leaders';
  } else if (differenceDancers < 0) {
    majority = 'followers';
  }
  console.log(
    'loop',
    cpt,
    'majority',
    majority,
    '(l:',
    leadersAmount,
    'f:',
    followersAmount,
    ')'
  );

  function addBothRolesDancer() {
    if (followersWaitingAmount) addFollowerFromWaitingList();
    if (leadersWaitingAmount) addLeaderFromWaitingList();
  }

  if (!majority) {
    /**
     * We can always add a dancer since the max spot is already checked
     */
    addBothRolesDancer();
  } else if (!shouldCheckBalance(leadersAmount, followersAmount)) {
    addBothRolesDancer();
  } else if (!isLimitOffsetReached(leadersAmount, followersAmount)) {
    addBothRolesDancer();
  } else {
    console.log('BREAK 2');
    shouldCheckWaitingList = false;
    break;
  }
}

console.log('event after', evt);

function addFollowerFromWaitingList() {
  const [follower] = evt.waitingList.followers.splice(0, 1);

  if (!follower) return;

  console.log('+ ADD FOLLOWER', follower);
  evt.dancers.followers.push(follower);
}

function addLeaderFromWaitingList() {
  const [leader] = evt.waitingList.leaders.splice(0, 1);

  if (!leader) return;

  console.log('+ ADD LEADER', leader);
  evt.dancers.leaders.push(leader);
}

function shouldCheckBalance(lAmount, fAmount) {
  console.log(
    'shouldCheckBalance ?',
    'totalDancers',
    lAmount + fAmount,
    'baseSpot',
    classe.spots.base,
    '->',
    lAmount + fAmount >= classe.spots.base
  );
  return lAmount + fAmount >= classe.spots.base;
}

function isLimitOffsetReached(lAmount, fAmount) {
  const differenceDancersAbs = Math.abs(lAmount - fAmount);
  console.log(
    'isLimitOffsetReached ?',
    'differenceDancersAbs',
    differenceDancersAbs,
    'balanceOffset',
    classe.balanceOffset,
    '->',
    differenceDancersAbs > classe.balanceOffset
  );

  return differenceDancersAbs >= classe.balanceOffset;
}
