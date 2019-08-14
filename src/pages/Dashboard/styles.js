import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  align-self: center;
  align-items: center;
  margin-top: ${props => (props.sig ? '10px' : '60px')};
`;

export const Strong = styled.Text`
  color: #fff;
  font-size: 18px;
  margin: 0 14px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingRight: 30,
    paddingLeft: 30,
    paddingBotton: 10,
  },
})`
  margin-top: 10px;
`;
