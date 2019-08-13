import { Alert } from 'react-native';
import { all, takeLatest, put, call } from 'redux-saga/effects';
import getTime from 'date-fns/getTime';
import { parseISO } from 'date-fns';

import api from '~/services/api';

import { shareMeetupSuccess } from './actions';

export function* meetUp({ payload }) {
  const { meetup, myMeetup } = payload;
  yield put(shareMeetupSuccess(meetup, myMeetup));
}

export function* newMeetup({ payload }) {
  try {
    const { file_id, title, description, date, location } = payload;

    yield call(api.post, 'meetups', {
      file_id,
      title,
      description,
      date: getTime(date),
      location,
    });
    Alert.alert('Meetup criado com sucesso')
  } catch (error) {
    Alert.alert('Falha no cadastro', 'Verifique seus dados');
  }
}

export function* editMeetup({ payload }) {
  try {
    const { id, file_id, title, description, date, location } = payload;

    const newData = getTime(date) ? getTime(date) : getTime(parseISO(date));

    const meetup = Object.assign(
      { title, description, date: newData, location, file_id },
      Number(file_id) || {}
    );

    yield call(api.put, `meetups/${id}`, meetup);

    Alert.alert('Meetup editado com sucesso');
  } catch (error) {
    Alert.alert('Falha ao atualizar', 'Verifique seus dados');
  }
}

export function* deleteMeetup({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `meetups/${id}`, {});

    Alert.alert('Meetup cancelado');
  } catch (error) {
    Alert.alert('Falha ao cancelar Meetup');
  }
}

export default all([
  takeLatest('@meetup/SHARE_MEETUP_REQUEST', meetUp),
  takeLatest('@meetup/NEW_MEETUP_REQUEST', newMeetup),
  takeLatest('@meetup/EDIT_MEETUP_REQUEST', editMeetup),
  takeLatest('@meetup/DELETE_MEETUP_REQUEST', deleteMeetup),
]);
