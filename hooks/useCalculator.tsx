import { useEffect, useRef, useState } from "react";

enum Operation {
  add = "+",
  subtract = "-",
  multiply = "x",
  divide = "÷",

  clear = "C",
  negative = "+/-",
  delete = "del",
  decimal = ".",
  equals = "=",
}

export const useCalculator = () => {
  //logica de la calculadora

  const [formula, setFormula] = useState<string>("0");

  const [number, setNumber] = useState<string>("0");
  const [prevNumber, setPrevNumber] = useState<string>("0");

  const lastOperation = useRef<Operation | undefined>(undefined);

  //
  useEffect(() => {
    //calcular subresultado
    if (lastOperation.current) {
      const firstFormula = formula.split(" ").at(0);
      setFormula(`${firstFormula} ${lastOperation.current} ${number}`);
    } else {
      setFormula(number);
    }
  }, [number]);

  useEffect(() => {
    //calcular subresultado
    const subResult = calculateSubResult();
    setPrevNumber(`${subResult}`);
  }, [formula]);

  // btn Clear C
  const clear = () => {
    setNumber("0");
    setPrevNumber("0");
    setFormula("0");
    lastOperation.current = undefined;
  };

  // btn +/-
  const toggleSign = () => {
    if (number.includes("-")) {
      setNumber(number.replace("-", ""));
    } else {
      setNumber("-" + number);
    }
  };

  // btn delete
  const deleteLast = () => {
    if (
      number.length === 1 ||
      (number.length === 2 && number.startsWith("-"))
    ) {
      setNumber("0");
    } else {
      setNumber(number.slice(0, -1));
    }
  };

  //btn ÷, x, -, +, =
  const setLastNumber = () => {
    //calcular el resultado
    let currentNumber = number;
    if (currentNumber.endsWith(".")) {
      currentNumber = currentNumber.slice(0, -1);
    }
    setPrevNumber(currentNumber);
    setNumber("0");
  };

  //btn ÷
  const divideOperation = () => {
    setLastNumber();
    lastOperation.current = Operation.divide;
  };
  // btn x
  const multiplyOperation = () => {
    setLastNumber();
    lastOperation.current = Operation.multiply;
  };
  // btn -
  const subtractOperation = () => {
    setLastNumber();
    lastOperation.current = Operation.subtract;
  };
  // btn +
  const addOperation = () => {
    setLastNumber();
    lastOperation.current = Operation.add;
  };

  // btn =
  const calculateResult = () => {
    const result = calculateSubResult();
    setFormula(`${result}`);
    setNumber(`${result}`);
    lastOperation.current = undefined;
  };

  // Calcular subresultado
  const calculateSubResult = (): number => {
    const [firstValue, operation, secondValue] = formula.split(" ");

    const num1 = Number(firstValue);
    const num2 = Number(secondValue);

    // Si no hay segundo número, retornar el primero
    if (isNaN(num2)) return isNaN(num1) ? 0 : num1;

    // Validar que los números sean válidos
    if (isNaN(num1)) return 0;

    let result: number;

    switch (operation) {
      case Operation.add:
        result = num1 + num2;
        break;
      case Operation.subtract:
        result = num1 - num2;
        break;
      case Operation.multiply:
        result = num1 * num2;
        break;
      case Operation.divide:
        // Validar división por cero (dividendo es cero)
        if (num2 === 0) {
          return 0;
        }
        result = num1 / num2;
        break;
      default:
        return isNaN(num1) ? 0 : num1;
    }

    // Validar resultados especiales
    if (!isFinite(result)) {
      return 0;
    }

    // Limitar decimales a 10 dígitos para evitar números muy largos
    const decimalPlaces = result.toString().split(".")[1]?.length || 0;
    if (decimalPlaces > 10) {
      result = Number(result.toFixed(10));
    }

    return result;
  };

  // btn numeros y .

  const buildNumber = (numberString: string) => {
    // Limitar a 15 dígitos (sin contar el punto decimal y el signo)
    const digitCount = number.replace(/[.-]/g, "").length;
    if (digitCount >= 15 && numberString !== ".") return;

    // verificar si ya existe un punto decimal
    if (number.includes(".") && numberString === ".") return;

    if (number.startsWith("0") || number.startsWith("-0")) {
      //punto decimal
      if (numberString === ".") {
        return setNumber(number + numberString);
      }
      // evaluar si es otro cero y ya hay un punto decimal
      else if (numberString === "0" && number.includes(".")) {
        return setNumber(number + numberString);
      }
      // evaluar si es diferente de cero y no hay un punto decimal y si es primer numero
      if (numberString !== "0" && !number.includes(".")) {
        return setNumber(
          number.startsWith("-") ? "-" + numberString : numberString,
        );
      }
      // evitar 00000
      else if (numberString === "0" && !number.includes(".")) {
        return;
      } else {
        setNumber(number + numberString);
      }
    } else {
      setNumber(number + numberString);
    }
  };

  return {
    //props
    formula,
    number,
    prevNumber,

    //methods
    buildNumber,
    clear,
    toggleSign,
    deleteLast,
    divideOperation,
    multiplyOperation,
    subtractOperation,
    addOperation,
    calculateResult,
  };
};
