import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 50 50" {...props} width="80%">
        <path d="M0 6.25C3.8147e-06 4.5924 0.658482 3.00268 1.83059 1.83058C3.00269 0.65848 4.5924 0 6.25 0L31.25 0C32.9076 0 34.4973 0.65848 35.6694 1.83058C36.8415 3.00268 37.5 4.5924 37.5 6.25V22.9167H43.75C45.4076 22.9167 46.9973 23.5751 48.1694 24.7472C49.3415 25.9193 50 27.5091 50 29.1667V50H22.9167V37.5H0V6.25ZM27.0833 45.8333H45.8333V29.1667C45.8333 28.6141 45.6138 28.0842 45.2231 27.6935C44.8324 27.3028 44.3025 27.0833 43.75 27.0833H37.5V37.5H27.0833V45.8333ZM27.0833 29.1667V33.3333H33.3333V27.0833H29.1667C28.6141 27.0833 28.0842 27.3028 27.6935 27.6935C27.3028 28.0842 27.0833 28.6141 27.0833 29.1667ZM4.16667 33.3333H22.9167V29.1667C22.9203 28.2386 23.1339 27.3233 23.5417 26.4896L12.5 15.4479V22.9167H8.33334V8.33333H22.9167V12.5H15.4458L26.4875 23.5417C27.3219 23.1336 28.2379 22.9199 29.1667 22.9167H33.3333V6.25C33.3333 5.69747 33.1138 5.16756 32.7231 4.77686C32.3324 4.38616 31.8025 4.16667 31.25 4.16667H6.25C5.69747 4.16667 5.16756 4.38616 4.77686 4.77686C4.38616 5.16756 4.16667 5.69747 4.16667 6.25V33.3333Z"/>  
    </Svg>
  );
};

export default Icon;