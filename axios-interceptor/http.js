import axios from 'axios';
import { reLogin } from './commonFuc';
// import router from '@/router';
import notification from 'ant-design-vue/es/notification';
import modal from 'ant-design-vue/es/modal';
import store from '@/store';

const option = {
  baseURL: '/apiProxy',
};

const instance = axios.create(option);
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
let is401 = false;
// http request 拦截器
instance.interceptors.request.use(
  (config) => {
    if (config.url.indexOf('/apiProxy') < 0) {
      config.url = '/apiProxy' + config.url;
    }
    config.headers.token = sessionStorage.getItem('access_token');
    config.cancelToken = source.token;
    return config;
  },
  (err) => Promise.reject(err),
);

// http response 拦截器
instance.interceptors.response.use(
  (response) => {
    const res = response.data;
    // 判断处理结果是文件类型时，不对结果集处理，直接返回
    if (res instanceof Blob) {
      return response;
    }
    // 这里需要根据不同的项目后端接口封装情况做适当调整
    if (res.code !== 200) {
      if (store.state.isShowError) {
        notification.error({ message: '提示', description: (res && res.msg) || (res && res.message) || '未知异常！' });
      }
      return Promise.reject(new Error((res && res.msg) || (res && res.message) || '未知异常！'));
    } else {
      return response;
    }
  },
  async (error) => {
    if (error.response) {
      console.log('错误信息状态', error.response.status);
      console.log('错误信息', error.response);
      let msg = error.response.data.msg;
      if (error.response.config.responseType === 'blob') {
        const text = await error.response.data.text();
        const errorJson = JSON.parse(text);
        msg = errorJson.msg;
      }
      if (error.response.status === 401 && !is401) {
        is401 = true;
        store.commit('changeErrorShow', false);
        // console.log('执行重新登录');
        // const response = error.response;
        // notification.error({ message: '提示', description: (response.data && response.data.msg) || (response.data && response.data.message) || '无权限！' });
        // reLogin();
        source.cancel();
        modal.confirm({
          title: '提示',
          content: msg,
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            reLogin();
            store.commit('changeErrorShow', true);
            is401 = false;
          },
          onCancel: () => {
            store.commit('changeErrorShow', true);
            is401 = false;
          },
        });
        return error;
      } else {
        if (store.state.isShowError) {
          notification.error({ message: '提示', description: msg });
        }
      }
    }
    // 返回接口返回的错误信息
    // const res = error.response;
    // message.error((res && res.data && res.data.error && res.data.error.message) || '未知异常！');
    return Promise.reject(error);
  },
);

export default instance;
