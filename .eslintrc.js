module.exports = {
  extends: ["airbnb", "prettier", "plugin:prettier/recommended"],
  plugins: ["react", "jsx-a11y", "import", "prettier"],
  rules: {
    "react/jsx-filename-extension": "off",
    "react/prop-types": "off",
    "react/sort-comp": "off",
    "react/destructuring-assignment": "off"
  }
}
