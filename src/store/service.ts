import axios from 'axios';
// import { message } from 'antd';


// 实例化 ajax请求对象
const ajaxinstance = axios.create({
  // http://testapi.dnatime.com/tools/indexToolList
  // baseURL: '//testapi.dnatime.com/tools/indexToolList',
  baseURL: '//testapi.dnatime.com',
  timeout: 60000,
  headers: {
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Method': 'POST,GET',
    responseType: 'json',
    token: localStorage.getItem('token'),
  },
});

// 请求拦截器
ajaxinstance
  .interceptors
  .request
  .use((request) => {
    const { params = {}, data={}} = request
    if (params.loadingTag || data.loadingTag){
      // message.loading('加载中...', 10)
    }
    return request
  }, (error) => {
    // message.destroy()
    Promise.reject(error)
  })

// 响应拦截器
ajaxinstance.interceptors.response.use(
  (response) => {
    const { config, data } = response
    const { params = {} } = config
    const { code = 1, result, msg } = data
    const loadingTag =  config.data ? JSON.parse(config.data).loadingTag : ''
    if (loadingTag || params.loadingTag){
      // message.destroy()
    }
    if (+code) {
      if (+code === 100104) {
        window.location.href = '/user/login';
      } else if (+code === 600008) {
        return data;
      } else {
        // message.error(msg || '服务器繁忙！！！');
      }
    }
    
    return +code ? null : result || {};
  }, (error) => {
    // message.destroy()
    return Promise.reject(error);
  },
);



// 调整检测项规则顺序
async function sortTraitRule(postData: any) {
  const { reportUpgradeId, isUp } = postData
  return ajaxinstance.post(`/api/upgradeCfg/sortTraitRule?reportUpgradeId=${reportUpgradeId}&isUp=${isUp}`)
}

// 获取插件配置
async function getPluginList(params: any) {
  return ajaxinstance.get('/api/upgradeCfg/getPluginList', { params });
}

// app工具列表
async function indexToolList(params: any){
  return ajaxinstance.get('/tools/indexToolList', {params})
}

export default {
  sortTraitRule, getPluginList,
  indexToolList,
}
