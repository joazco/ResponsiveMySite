import React from "react";
import { Image, StyleSheet, Text } from "react-native";
import { View } from "react-native-animatable";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { logoJoazco } from "../../../assets/images";
import i18n from "../../translations/i18n";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginBottom: 10,
    textAlign: "center",
  },
  bigText: {
    fontSize: 36,
    textAlign: "center",
  },
  image: {
    width: 64,
    height: 64,
  },
});

type OfflineComponentProps = {
  name: string;
  color: string;
};

const OfflineComponent = ({ name, color }: OfflineComponentProps) => {
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: color, padding: 10 }}>
        <Image style={styles.image} source={logoJoazco} resizeMode="contain" />
      </View>
      <View style={styles.content}>
        <MaterialCommunityIcons
          name="server-network-off"
          size={64 * 1.5}
          color="black"
          style={styles.icon}
        />
        <Text style={styles.bigText}>:(</Text>
        <Text style={styles.bigText}>{i18n.t("offlinecomponenttitle")}</Text>
        <Text>{i18n.t("offlinecomponentmessage").replace("{name}", name)}</Text>
      </View>
    </View>
  );
};

export default OfflineComponent;
