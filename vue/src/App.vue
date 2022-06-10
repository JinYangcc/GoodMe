<template>
  <div>
    <div v-show="index == 0">
      <h1>饿了吗奶茶自助点单</h1>
      <el-button type="success" style="margin-bottom: 40px" @click="goOrder"
        >我已选好，去结账</el-button
      >
      <el-button type="primary" @click="goAdmin">管理员登录</el-button>
      <el-table style="width: 100%" :data="teaList" border>
        <el-table-column type="index" label="序号" width="80" align="center">
        </el-table-column>
        <el-table-column prop="name" label="名称" width="width">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="width">
        </el-table-column>
        <el-table-column prop="num" label="数量" width="width">
        </el-table-column>
        <el-table-column label="操作" width="width">
          <template slot-scope="{ row, $index }">
            <el-button type="info" size="mini" @click="choseNum(row, 'jian')"
              >-</el-button
            >
            <el-button type="primary" size="mini" @click="choseNum(row, 'jia')"
              >+</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="管理员登陆"
        :visible.sync="centerDialogVisible"
        width="30%"
        center
      >
        <el-input v-model="name" placeholder="用户名:admin"></el-input>
        <el-input v-model="password" placeholder="密码:admin"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handlerinput('cancel')">取 消</el-button>
          <el-button type="primary" @click="handlerinput('enter')"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
    <div v-show="index == 1">
      <h1>结算界面</h1>
      <h2>您的订单号为：{{ orderNum }}</h2>
      <el-table :data="orderList" style="width: 100%" border="">
        <el-table-column type="index" label="序号" width="80" align="center">
        </el-table-column>
        <el-table-column prop="name" label="名称" width="width">
        </el-table-column>
        <el-table-column prop="num" label="个数" width="width">
        </el-table-column>
        <el-table-column prop="TotalPrice" label="价格" width="width">
        </el-table-column>
      </el-table>
      <h3>总金额：{{ qian }}</h3>
      <el-button type="success" @click="two(1)">支付</el-button>
      <el-button type="info" @click="two(2)">取消</el-button>
    </div>
    <div v-show="index == 2">
      <h1>添加奶茶</h1>
      <el-input v-model="teaName" placeholder="请输入奶茶名称"></el-input>
      <el-input v-model="teaPrice" placeholder="请输入奶茶价格"></el-input>
      <el-button type="primary" @click="addTea">添加奶茶</el-button>
      <el-button type="info" @click="index = 0">回到首页</el-button>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { gettealist, getOrderNum, login, addTea } from "../api/index";
export default {
  name: "app",
  data() {
    return {
      teaList: [],
      orderList: [],
      index: 0,
      orderNum: "",
      qian: 0,
      centerDialogVisible: false,
      name: "",
      password: "",
      teaName: "",
      teaPrice: "",
    };
  },
  mounted() {
    this.getTeaList();
  },
  methods: {
    //*获取菜单数据
    async getTeaList() {
      let result = await gettealist();
      result.map((item) => {
        item.num = 0;
      });
      this.teaList = result;
    },
    //*获取订单号
    async getOrderNum() {
      let result = await getOrderNum();
      this.orderNum = result;
    },
    //*改变数量
    choseNum(row, type) {
      let arr = this.teaList.find((item) => {
        return item == row;
      });
      if (type == "jia") {
        arr.num += 1;
      } else {
        if (arr.num > 0) {
          arr.num -= 1;
        }
      }
    },
    //*去结账界面
    goOrder() {
      this.getOrderNum();
      let { teaList } = this;
      this.orderList = teaList.filter((item) => {
        return item.num != 0;
      });
      if (this.orderList.length == 0) {
        Message({
          type: "danger",
          message: "您还未选择",
        });
      } else {
        this.getTotalPrice();
        this.index = 1;
      }
    },
    //*算出总价钱
    getTotalPrice() {
      this.orderList.map((item) => {
        item.TotalPrice = item.num * item.price;
      });
      let arr = [];
      this.orderList.forEach((item) => {
        let price = item.price * item.num;
        arr.push(price);
      });
      let qian = arr.reduce((a, b) => {
        return a + b;
      });
      console.log(qian);
      this.qian = qian;
    },
    //*点击支付按钮 取消按钮
    two(type) {
      if (type == 1) {
        this.$messageBox("确定支付吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
          .then(() => {
            Message({
              type: "success",
              message: "支付成功!",
            });
          })
          .catch(() => {
            Message({
              type: "info",
              message: "已取消支付",
            });
          });
        setTimeout(() => {
          this.index = 0;
        }, 1500);
      } else {
        // console.log(2);
        this.index = 0;
      }
    },
    //*去管理员登录页
    goAdmin() {
      this.centerDialogVisible = true;
    },
    //*弹出框取消与确认
    async handlerinput(type) {
      if (type == "enter") {
        let { name, password } = this;
        if (name != "admin") {
          Message({
            type: "danger",
            message: "用户名错误",
          });
          return;
        }
        if (password != "admin") {
          Message({
            type: "danger",
            message: "密码错误",
          });
          return;
        }
        let result = await login({ name, password });
        console.log(result);
        // if (result=='登录成功！') {
        Message({
          type: "success",
          message: "登录成功",
        });
        this.centerDialogVisible = false;
        this.index = 2;
        // }
      } else {
        this.centerDialogVisible = false;
      }
    },
    //*添加
    async addTea() {
      let { teaName, teaPrice } = this;
      let result = await addTea({ name: teaName, price: teaPrice });
      console.log(result);
      Message({
        type: "success",
        message: "添加成功",
      });
    },
  },
};
</script>
<style>

</style>
