export const calculateBMI = (weight: number, height: number) => {
  return Number((weight / Math.pow(height / 100, 2)).toFixed(1));
};

export const getBMIStatus = (bmi: number) => {
  if (bmi < 18.5) {
    return {
      color: "text-blue-500",
      bg: "bg-blue-500",
    };
  }

  if (bmi < 25) {
    return {
      color: "text-emerald-500",
      bg: "bg-emerald-500",
    };
  }

  if (bmi < 30) {
    return {
      color: "text-orange-500",
      bg: "bg-orange-500",
    };
  }

  return {
    color: "text-red-500",
    bg: "bg-red-500",
  };
};
