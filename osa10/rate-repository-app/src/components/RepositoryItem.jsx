import { View, Text, StyleSheet, Image } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "white",
  },
  statsContainer: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    maxWidth: 350,
  },
  stat: {
    padding: 8,
    fontWeight: theme.fontWeights.bold,
    textAlign: "center",
  },
  name: {
    padding: 5,
    fontSize: theme.fontSizes.subheading,
    font: theme.fonts.main,
    fontWeight: theme.fontWeights.bold,
  },
  description: {
    padding: 5,
    font: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    maxWidth: 300,
  },
  language: {
    border: "solid",
    borderColor: "white",
    backgroundColor: theme.colors.primary,
    color: "white",
    padding: 5,
    borderRadius: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
});

const formatNumber = (number) => {
  if (number >= 1000) {
    const thousands = Math.round((number / 1000) * 10) / 10;
    const numString = thousands.toString();
    console.log(numString);
    return `${numString.substring(0, numString.indexOf(".") + 2)}k`;
  }
  return number;
};

const RepositoryItem = ({ rep }) => {
  return (
    <View style={{ ...styles.container, padding: 10, flex: 1 }}>
      <View style={{ ...styles.container, flexDirection: "row" }}>
        <View style={styles.container}>
          <Image style={styles.image} source={rep.ownerAvatarUrl}></Image>
        </View>
        <View
          style={{ ...styles.container, paddingLeft: 10, flexWrap: "wrap" }}
        >
          <Text style={styles.name}>{rep.fullName}</Text>
          <Text style={styles.description}>{rep.description}</Text>
          <Text style={styles.language}>{rep.language}</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.stat}>
          {`${formatNumber(rep.stargazersCount)}`} Stars
        </Text>
        <Text style={styles.stat}>
          {`${formatNumber(rep.forksCount)}`} Forks
        </Text>
        <Text style={styles.stat}>{rep.reviewCount} Reviews</Text>
        <Text style={styles.stat}>{rep.ratingAverage} Rating</Text>
      </View>
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
