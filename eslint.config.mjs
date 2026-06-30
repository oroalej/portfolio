import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextVitals,
  {
    ignores: [".next/**", "node_modules/**"],
    rules: {
      "react-hooks/exhaustive-deps": "error",
      "react-hooks/immutability": "error",
      "react-hooks/incompatible-library": "error",
      "react-hooks/refs": "error",
      "react-hooks/set-state-in-effect": "error",
    },
  },
];

export default eslintConfig;
