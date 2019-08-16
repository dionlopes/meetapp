import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 20px;
  max-width: 335px;
  max-height: 345px;
  border-radius: 4px;
  background-color: #ffffff;
`;

export const MeetupImg = styled.Image`
  width: 100%;
  min-height: 150px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const Info = styled.View`
  padding: 10px;
`;

export const Title = styled.Text`
  font-weight: bold;
`;

export const Additional = styled.View`
  margin: 10px 0;
`;

export const Item = styled.View`
  flex-direction: row;
  align-items: baseline;
  margin: 3px 0;
`;

export const Text = styled.Text`
  margin-left: 5px;
  color: #999;
  font-size: 13px;
`;
