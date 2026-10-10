module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    // R3F 속성(position, intensity, castShadow 등)은 HTML 속성이 아니라서 이 규칙과 맞지 않는다
    'react/no-unknown-property': 'off',
    'react/prop-types': 'off',
  },
}
