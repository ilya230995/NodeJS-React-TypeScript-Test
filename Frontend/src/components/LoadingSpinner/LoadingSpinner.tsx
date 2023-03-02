import React from "react";
import { Oval } from "react-loader-spinner";
import s from "./LoadingSpinner.module.scss";

interface LoadingSpinnerI {
  height?: number;
  width?: number;
  center?: boolean;
  mt?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerI> = ({
  height,
  width,
  center,
  mt,
}) => {
  return (
    <div className={`${!!center ? s.center : ""} ${!!mt ? s.mt : ""}`}>
      <Oval color="#CED0D3" height={height} width={width} />
    </div>
  );
};

export default LoadingSpinner;

LoadingSpinner.defaultProps = {
  height: 50,
  width: 50,
};
