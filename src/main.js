import { createApp } from 'vue'
import { createPinia } from 'pinia';
import router from './router/index.js'
import VueAxios from 'vue-axios';
import axios from 'axios';
import { 
    Checkbox ,
    Input,
    Select,
    Avatar,
    Table,
    Card,
    Menu ,
    List,
    Drawer, 
    Button, 
    message 
} from 'ant-design-vue';
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'bootstrap/dist/css/bootstrap-utilities.min.css'
import 'ant-design-vue/dist/reset.css';



const app = createApp(App);
app.use(VueAxios, axios);

app.use(router);
app.use(createPinia());
app.use(Button);
app.use(Checkbox);
app.use(Input);
app.use(Select);
app.use(Avatar);
app.use(Card);
app.use(Drawer);
app.use(List);
app.use(Menu );
app.use(Table);
app.mount('#app');

app.config.globalProperties.$message = message;