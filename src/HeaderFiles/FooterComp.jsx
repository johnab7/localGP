import React from "react";
import {CustomFootCon, CustomFootLink, CustomText} from "./HeaderReactDesign";
function FooterComp() {
    const year = new Date().getFullYear();
    return (
      <CustomFootCon>
        <CustomText>Local Surgery UOL {year}</CustomText>
        <CustomText>University Rd, Leicester</CustomText>
        <CustomText>LE1 7RH</CustomText>
      </CustomFootCon>
    );
  }
  
  export default FooterComp;