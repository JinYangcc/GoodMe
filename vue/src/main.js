import Vue from "vue";
import App from "./App.vue";

import {
  Button,
  Select,
  Table,
  TableColumn,
  MessageBox,
  Message,
  Dialog,
  Input
} from "element-ui";

Vue.component(Input.name, Input);
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(MessageBox.name, MessageBox);
Vue.component(Message.name, Message);
Vue.component(Dialog.name, Dialog);

// Message.install = function (Vue, options) {
//   Vue.prototype.$message = Message;
// };
Vue.prototype.$messageBox = MessageBox;
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
