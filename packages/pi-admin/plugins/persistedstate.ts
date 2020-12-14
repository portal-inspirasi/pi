import createPersistedState from 'vuex-persistedstate';

export default (persist: any) => {
  createPersistedState({
    key: 'materiaCalc',
    paths: ['calculation', 'combination', 'material', 'product', 'setting']
  })(persist.store);
};
