import Cookies from 'js-cookie';

const logout = () => {
  Cookies.remove('ACCESS_TOKEN');
  Cookies.remove('REFRESH_TOKEN');
};

const login = (datas) => {
  datas.forEach((item) => {
    Cookies.set(item.name, item.value);
  });
};

const get = (name) => {
  return Cookies.get(name);
};

const set = (name, value, expire: number | null = null) => {
  Cookies.set(name, value, { expires: expire });
};

export default {
  login,
  logout,
  get,
  set,
};
