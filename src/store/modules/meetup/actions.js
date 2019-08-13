export function shareMeetupRequest(meetup, myMeetup) {
  return {
    type: '@meetup/SHARE_MEETUP_REQUEST',
    payload: { meetup, myMeetup },
  };
}
export function shareMeetupSuccess(meetup, myMeetup) {
  return {
    type: '@meetup/SHARE_MEETUP_SUCCESS',
    payload: { meetup, myMeetup },
  };
}

export function editMeetupRequest(
  id,
  file_id,
  title,
  description,
  date,
  location
) {
  return {
    type: '@meetup/EDIT_MEETUP_REQUEST',
    payload: { id, file_id, title, description, date, location },
  };
}

export function newMeetupRequest(file_id, title, description, date, location) {
  return {
    type: '@meetup/NEW_MEETUP_REQUEST',
    payload: { file_id, title, description, date, location },
  };
}

export function deleteMeetupRequest(id) {
  return {
    type: '@meetup/DELETE_MEETUP_REQUEST',
    payload: { id },
  };
}
