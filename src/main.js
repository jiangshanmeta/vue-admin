import Vue from 'vue';

import VueLocalstorage from 'vue-localstorage';
import VueConfigs from 'vue-configs';
import VueSingleton from '@/plugins/vue-singleton';

import router from './router';
import store from './store';

// 处理element ui库
import 'normalize.css';
import '@/assets/css/layout.css';
import '@/assets/css/text.css';
import '@/assets/css/img.css';
import '@/assets/css/table.css';

import {
    Pagination,
    Dialog,
    Autocomplete,
    Menu,
    Submenu,
    MenuItem,
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
    Select,
    Option,
    Button,
    Table,
    TableColumn,
    DatePicker,
    TimeSelect,
    TimePicker,
    Form,
    FormItem,
    Upload,
    Message,
    MessageBox,
} from 'element-ui';

import App from './App';

Vue.use(VueLocalstorage);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Autocomplete);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Upload);
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

Vue.use(VueConfigs, {
    optionKeys: [
        'config',
        'staticMethod',
        'state',
        'singleton',
    ],
});
Vue.use(VueSingleton);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App,
    },
    render (h) {
        return h('App');
    },
});
