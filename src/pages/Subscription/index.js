import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome5';
import api from '~/services/api';

import Background from '~/components/Background';
import CardMeetup from '~/components/CardMeetup';

import { Container, List, EmptyList, TitleEmptyList } from './styles';

export default function Subscription({ navigation }) {
  const [meetups, setMeetups] = useState([]);

  async function loadMeetups() {
    const response = await api.get('/subscriptions');

    setMeetups(response.data);
  }

  useEffect(() => {
    loadMeetups();
  }, []);

  useEffect(() => {
    this.focusListener = navigation.addListener('didFocus', () => {
      loadMeetups();
    });
  }, []);

  async function Unsubscribe(id) {
    try {
      await api.delete(`/subscriptions/${id}`);
      loadMeetups();
    } catch (error) {
      Alert.alert('Ops!', 'Algo aconteceu ao cancelar o meetup');
    }
  }

  return (
    <Background>
      <Container>
        {meetups.length > 0 ? (
          <List
            data={meetups}
            keyExtractor={item => String(item.id)}
            renderItem={({ item: cardMeetup }) => (
              <CardMeetup
                data={cardMeetup.Meetup}
                unsubscribe={() => Unsubscribe(cardMeetup.id)}
              />
            )}
          />
        ) : (
          <EmptyList>
            <Icon name="frown" size={40} color="#FFFF" />
            <TitleEmptyList>Você não tem inscrições</TitleEmptyList>
          </EmptyList>
        )}
      </Container>
    </Background>
  );
}

function tabBarIcon({ tintColor }) {
  return <Icon name="tag" size={18} color={tintColor} />;
}

Subscription.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon,
};

Subscription.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired,
  }).isRequired,
};

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
