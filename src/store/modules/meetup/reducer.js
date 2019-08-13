import produce from 'immer';

const INITIAL_STATE = {
  meetup: {},
  myMeetup: null,
};

export default function meetup(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetup/SHARE_MEETUP_SUCCESS': {
        draft.meetup = action.payload.meetup;
        draft.myMeetup = action.payload.myMeetup;
        break;
      }
      default:
    }
  });
}
