// 生产环境导入组件
// module.exports = file => () => import('@/views/' + file + '.vue')
module.exports = file => (resolve) => require(['@/views/' + file+'.vue'], resolve)
