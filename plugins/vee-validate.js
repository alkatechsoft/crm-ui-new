import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate';
import Vue from 'vue'
import * as rules from 'vee-validate/dist/rules';
import en from 'vee-validate/dist/locale/en.json';

import 'bootstrap-vue/dist/bootstrap-vue.css'
// Install components globally
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});
localize('en', en);
