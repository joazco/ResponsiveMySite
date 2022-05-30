import React, { useMemo, useState } from "react";
import { Image } from "react-native";
import { logoNotFound } from "../../../assets/images";
import { Logo as LogoType } from "../../../types";

type LogoProps = {
  uri: LogoType;
  style?: any;
  height?: number;
  width?: number;
};
const Logo = (props: LogoProps) => {
  const { uri, height = 144, width = 144, style } = props;
  const finalStyle = useMemo(
    () => ({ width, height, ...style }),
    [width, height, style]
  );
  const [imageError, setImageError] = useState<boolean>(false);
  if (!uri || imageError) {
    return (
      <Image source={logoNotFound} style={finalStyle} resizeMode="contain" />
    );
  }
  return (
    <Image
      source={{ uri }}
      style={finalStyle}
      resizeMode="contain"
      onError={() => setImageError(true)}
    />
  );
};

export default Logo;
