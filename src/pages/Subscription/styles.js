import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  justify-content: center;
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

export const EmptyList = styled.View`
  align-items: center;
`;

export const TitleEmptyList = styled.Text`
  margin-top: 5px;
  color: #ffff;
`;
