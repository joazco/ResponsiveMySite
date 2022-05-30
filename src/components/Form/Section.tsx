import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";

type SectionProps = {
  title: string;
  children?: React.ReactChild | React.ReactChild[];
};
const Section = (props: SectionProps) => {
  const { title, children } = props;
  return (
    <View style={styles.section}>
      <View style={styles.sectionTextContent}>
        <Text style={styles.sectionText}>{title}</Text>
      </View>
      {children}
    </View>
  );
};

export default Section;
