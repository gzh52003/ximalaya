 const { override, fixBabelImports } = require('customize-cra');
//   antd 按需加载
 module.exports = override(
    //  es modules 模块
   fixBabelImports('import', {
     libraryName: 'antd',
     libraryDirectory: 'es',
     style: 'css',
   }),
 );