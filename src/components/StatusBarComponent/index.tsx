import React from "react";
import { View, StatusBar } from "react-native";
import Constants from "expo-constants";

import { StatusBarType } from "../../../types";

const StatusBarComponent = ({ statusBar }: { statusBar: StatusBarType }) => {
  return (
    <React.Fragment>
      <View
        style={{
          backgroundColor: statusBar.backgroundColor,
          paddingTop: Constants.statusBarHeight + 10,
        }}
      >
        <StatusBar
          translucent
          barStyle={`${statusBar.style}-content`}
          backgroundColor={statusBar.backgroundColor}
        />
      </View>
      <View style={{ backgroundColor: statusBar.backgroundColor }} />
    </React.Fragment>
  );
};

export default StatusBarComponent;
