import { globalStyles } from "@/styles/global-styles";
import { Pressable, Text } from "react-native";

interface Props {
  label: string;
  color?: string;
}

const CalculatorButton = ({ label }: Props) => {
  return (
    <Pressable style={globalStyles.button}>
      <Text style={globalStyles.buttonText}>{label}</Text>
    </Pressable>
  );
};

export default CalculatorButton;
