const express = require("express");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const app = express();
let tealist = {
  code: "200",
  data: [
    { id: "1000001", name: "柠檬芦荟茶", price: "5" },
    { id: "1000002", name: "手捣西瓜冻", price: "11" },
    { id: "1000003", name: "益禾烤奶", price: "8" },
    { id: "1000004", name: "海盐嘿凤梨", price: "13" },
  ],
};
let buyid = 0;
let id = 1000004;
//*奶茶列表
app.get("/tealist", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.send(tealist);
});
//*订单号
app.get("/buyid", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  buyid++;
  let buyId = {
    code: "200",
    data: `${buyid}`,
  };
  response.send(buyId);
});
//*登录
app.post("/login", urlencodedParser, (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  if (request.body.name == "admin" && request.body.password == "admin") {
    let login = {
      code: "200",
      data: "登录成功",
    };
    response.send(login);
  } else {
    let login = {
      code: "400",
      data: "登录失败",
    };
    response.send(login);
  }
});
//*添加
app.post("/addtea", urlencodedParser, (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  let name = request.body.name;
  let price = request.body.price;
  id++;
  let flag;
  //*如果name或者price为空
  if (name == ""||price=='') {
    let addtea = {
      code: "400",
      data: "请勿添加空数据",
    };
    response.send(addtea);
    return;
  }
  //*我也不知道为啥有这步 没有就报错   获取data中对象的索引
  for (let item in tealist.data) {
    // console.log(item);
  }
  for (let item of tealist.data) {
    flag = true;
    // console.log(item.name);
    if (item.name.indexOf(name) === 0) {
      flag = false;
    }
  }
  //*如果无相同的
  if (flag != false) {
    let addtea = {
      code: "200",
      data: "添加成功",
    };
    tealist.data.push({ id, name, price });
    response.send(addtea);
  } else {
    //*如果有相同
    let addtea = {
      code: "400",
      data: "请勿重复添加",
    };
    response.send(addtea);
  }
});
app.listen(8000, () => {
  console.log("8000端口监听中...");
});
