module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
   ignorePatterns: [
    'node_modules/',
    'dist/',
    'prisma/generated/', // <- ignora arquivos gerados pelo Prisma
  ],
  rules: {
    "prettier/prettier": "error", // mantém Prettier como erro
    "@typescript-eslint/no-unused-vars": "off", // ignora variáveis não usadas
    "@typescript-eslint/no-explicit-any": "off", // ignora uso de any
    "@typescript-eslint/no-empty-object-type": "off",
    "@typescript-eslint/no-unsafe-function-type": "off",
    "@typescript-eslint/no-wrapper-object-types": "off",
    "@typescript-eslint/no-unnecessary-type-constraint": "off",
    "@typescript-eslint/no-unused-expressions": "off",
  },
};
