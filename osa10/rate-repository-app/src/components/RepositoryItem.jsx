import { View, Text } from "react-native";

const RepositoryItem = ({ rep }) => {
  return (
    <View>
      <Text>Full name: {rep.fullName}</Text>
      <Text>Description: {rep.description}</Text>
      <Text>Language: {rep.language}</Text>
      <Text>Stars: {rep.stargazerCount}</Text>
      <Text>Forks: {rep.forksCount}</Text>
      <Text>Reviews: {rep.reviewCount}</Text>
      <Text>Rating: {rep.ratingAverage}</Text>
    </View>
  );
};

export default RepositoryItem;

/* id: 'jaredpalmer.formik',
fullName: 'jaredpalmer/formik',
description: 'Build forms in React, without the tears',
language: 'TypeScript',
forksCount: 1589,
stargazersCount: 21553,
ratingAverage: 88,
reviewCount: 4,
ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4', */
