export default {
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,

  importOrder: [
    '^@nestjs/(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^@repo/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ['typescript', 'decorators-legacy'],
  plugins: ['@trivago/prettier-plugin-sort-imports'],
}
