import React from "react";
//@ts-ignore
import styles from "./style.module.css";
// import "./style.css";

const GrammerCheckTooltip = (props: any, handleClick: any) => {
  return (
    <div
      style={{
        width: "214px",
        height: "101px",
        background: "#FFFFFF",
        boxShadow: "0px 4px 30px rgba(34, 34, 34, 0.25)",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "184px",
          height: "16px",
          fontFamily: "Inter",
          fontStyle: "normal",
          fontSize: "12px",
          lineHeight: "135%",
          display: "flex",
          alignItems: "center",
          letterSpacing: "0.01em",
          color: "#475161",
          marginLeft: "15px",
          //@ts-ignore
          fontWeight: "700",
        }}
      >
        Grammer
      </div>
      <div
        style={{
          width: "184px",
          height: "16px",
          fontFamily: "Inter",
          fontStyle: "normal",
          fontSize: "12px",
          lineHeight: "130%",
          display: "flex",
          alignItems: "center",
          color: "#475161",
          marginLeft: "15px",
          //   fontWeight: "700"
        }}
      >
        Use "{props.leaf["grammar-check"].corrected_input}" instead of "
        {props.leaf["grammar-check"].incorrect_input}".
      </div>
      <div
        style={{
          width: "fit-content",
          height: "20px",
          border: "1px solid #007A52",
          borderRadius: "4px",
          marginLeft: "15px",
          textAlign: "center",
          padding: "0px 5px 5px",
        }}
      >
        <span
          style={{
            width: "100%",
            height: "20px",
            fontFamily: "Inter",
            fontStyle: "normal",
            fontSize: "12px",
            lineHeight: "130%",
            textAlign: "center",
            color: "#007A52",
            cursor: "pointer",
          }}
          onClick={props.handleClick}
        >
          {props.leaf["grammar-check"].corrected_input}
        </span>
      </div>
    </div>
  );
};

export default GrammerCheckTooltip;
