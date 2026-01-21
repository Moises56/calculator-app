import CalculatorButton from "@/components/CalculatorButton";
import ThemeText from "@/components/ThemeText";
import { globalStyles } from "@/styles/global-styles";
import React from "react";
import { View } from "react-native";

const CalculatorApp = () => {
  return (
    <View style={globalStyles.calculatorContainer}>
      {/* Results */}
      <View style={{ paddingHorizontal: 30, marginBottom: 20 }}>
        <ThemeText variant="h1">50 x 50</ThemeText>
        <ThemeText variant="h2">2500</ThemeText>
      </View>

      {/* Buttons filas*/}
      <View style={globalStyles.row}>
        {/* bt1 */}
        <CalculatorButton label={"C"} />
        <CalculatorButton label={"+/-"} />
        <CalculatorButton label={"del"} />
        <CalculatorButton label={"÷"} />
      </View>
    </View>
  );
};

export default CalculatorApp;
