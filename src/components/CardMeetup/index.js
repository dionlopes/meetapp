import React, { useMemo } from 'react';
import { formatRelative, parseISO, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '~/components/Button';

import {
  Container,
  MeetupImg,
  Info,
  Title,
  Additional,
  Item,
  Text,
} from './styles';

export default function CardMeetup({
  data,
  signed,
  subscription,
  unsubscribe,
}) {
  const dateParsed = useMemo(() => {
    return formatRelative(subHours(parseISO(data.date), 0), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.date]);

  return (
    <Container>
      {data.imagem && (
        <MeetupImg source={{ uri: data.imagem.url }} resizeMode="stretch" />
      )}
      <Info>
        <Title>{data.title}</Title>
        <Additional>
          <Item>
            <Icon name="event" size={14} color="#999" />
            <Text>{dateParsed}</Text>
          </Item>
          <Item>
            <Icon name="place" size={14} color="#999" />
            <Text>{data.location}</Text>
          </Item>
          <Item>
            <Icon name="person" size={14} color="#999" />
            <Text>Organizador: {data.user.name}</Text>
          </Item>
        </Additional>
        {signed && <Button onPress={subscription}>Realizar inscrição</Button>}
        {unsubscribe && (
          <Button onPress={unsubscribe}>Cancelar inscrição</Button>
        )}
      </Info>
    </Container>
  );
}

CardMeetup.propTypes = {
  data: PropTypes.shape({
    date: PropTypes.string,
    location: PropTypes.string,
    title: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
    imagem: PropTypes.shape({
      url: PropTypes.string,
    }),
  }).isRequired,
  signed: PropTypes.bool,
  subscription: PropTypes.func,
  unsubscribe: PropTypes.func,
};

CardMeetup.defaultProps = {
  signed: false,
  subscription: null,
  unsubscribe: null,
};
