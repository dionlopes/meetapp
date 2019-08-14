import React, { useState, useMemo, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';

import { subDays, addDays, format, isBefore } from 'date-fns';
import pt from 'date-fns/locale/pt';

import IconTab from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';

import Background from '~/components/Background';
import Button from '~/components/Button';
import CardMeetup from '~/components/CardMeetup';
import { Container, Header, Strong, List } from './styles';

export default function Dashboard({ navigation }) {
  const signed = useSelector(state => state.auth.signed);
  const [date, setDate] = useState(new Date());
  const [meetups, setMeetups] = useState([]);
  const [page, setPage] = useState(1);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('/meetups', {
        params: { page, date },
      });

      setMeetups(response.data);
    }
    loadMeetups();
  }, [date, page]);

  function handlePrevDay() {
    if (isBefore(new Date(), date)) setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  async function handleSubscription(id) {
    try {
      await api.post(`/meetups/${id}/subscriptions`);
      navigation.navigate('Subscription');
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Algo deu errado ao se inscrever');
    }
  }
  return (
    <Background>
      <Container>
        <Header>
          <Button type="button" onPress={handlePrevDay}>
            <Icon name="keyboard-arrow-left" size={20} color="#fff" />
          </Button>
          <Strong>{dateFormatted}</Strong>
          <Button type="button" onPress={handleNextDay}>
            <Icon name="keyboard-arrow-right" size={20} color="#fff" />
          </Button>
        </Header>

        <List
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item: cardMeetup }) => (
            <CardMeetup
              subscription={() => handleSubscription(cardMeetup.id)}
              data={cardMeetup}
              signed={signed}
            />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <IconTab name="list-ul" size={20} color={tintColor} />
  ),
};
