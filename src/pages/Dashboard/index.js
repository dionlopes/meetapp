import React, { useState, useMemo, useEffect } from 'react';
import { Alert, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { subDays, addDays, format, isBefore } from 'date-fns';
import pt from 'date-fns/locale/pt';

import IconTab from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';

import Background from '~/components/Background';
import Button from '~/components/Button';
import CardMeetup from '~/components/CardMeetup';

import { Container, Header, Strong } from './styles';

export default function Dashboard({ navigation }) {
  const signed = useSelector(state => state.auth.signed);
  const [date, setDate] = useState(new Date());
  const [meetups, setMeetups] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  async function loadMeetups() {
    if (total) return;

    const data = await api.get('/meetups', {
      params: { page, date },
    });

    if (data.data.length < 1) {
      setTotal(true);
    } else {
      setTotal(false);
      setMeetups([...meetups, ...data.data]);
      setPage(page + 1);
    }
  }

  useEffect(() => {
    loadMeetups();
  }, [date]);

  function resetPage() {
    setMeetups([]);
    setTotal(false);
    setPage(1);
  }

  function handlePrevDay() {
    if (isBefore(new Date(), date)) {
      setDate(subDays(date, 1));
      resetPage();
    }
  }

  function handleNextDay() {
    resetPage();
    setDate(addDays(date, 1));
  }

  async function handleSubscription(id) {
    try {
      await api.post(`/meetups/${id}/subscriptions`);
      navigation.navigate('Subscription');
    } catch (error) {
      Alert.alert('Ops', 'Algo deu errado ao se inscrever');
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
        <FlatList
          contentContainerStyle={{
            paddingRight: 30,
            paddingLeft: 30,
            paddingBotton: 10,
          }}
          data={meetups}
          keyExtractor={item => String(item.id)}
          onEndReached={() => loadMeetups()}
          onEndReachedThreshold={0.1}
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

function tabBarIcon({ tintColor }) {
  return <IconTab name="list-ul" size={20} color={tintColor} />;
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon,
};

Dashboard.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
