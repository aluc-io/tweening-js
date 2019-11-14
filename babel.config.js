module.exports = api => {
  return (api.env('test')) ? {
    presets: [
      ["@babel/env",{
        targets: { node: 'current' }
      }],
      ["@babel/typescript", {
        allExtensions: true,
      }],
    ],
    plugins: [
      'babel-plugin-rewire-ts',
      '@babel/plugin-transform-runtime',
    ]
  } : {
    presets: [
      ["@babel/env",{
        targets: { node: 'current' }
      }],
      ["@babel/typescript", {
        isTSX: true,
        allExtensions: true,
      }],
    ],
    plugins: [
      '@babel/plugin-transform-runtime',
    ]
  }
}

