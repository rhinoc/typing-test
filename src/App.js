import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import "./app.scss";
import Pinyin from "./pinyin";

import { Input, Button, Tooltip } from "antd";
import { RedoOutlined } from "@ant-design/icons";

var timer = 0;
var type_count = 0;
var type_ind = 0;
var round = 0;

var dict = [];
var alldict = [
  "移动",
  "通信",
  "面向",
  "系统",
  "技术",
  "发展",
  "处于",
  "探索",
  "阶段",
  "结合",
  "国内",
  "最新",
  "基本",
  "需求",
  "技术",
  "特点",
  "可能",
  "途径",
  "展望",
  "并分",
  "传输",
  "网络",
  "部分",
  "重点",
  "论述",
  "富有",
  "关键",
  "通过",
  "操作",
  "控制",
  "列表",
  "样式",
  "变量",
  "保存",
  "项目",
  "环境",
  "全局",
  "安装",
  "动态",
  "添加",
  "绑定",
  "切换",
  "基站",
  "逻辑",
  "配合",
  "教程",
  "习惯",
  "行内",
  "按钮",
  "手动",
  "变换",
  "数字",
  "模拟",
  "信号",
  "分析",
  "处理",
  "技术",
  "扩频",
  "信息",
  "熵增",
  "规格",
  "严格",
  "功夫",
  "到家",
  "扩频",
  "话务",
  "业务",
  "交换",
  "符合",
  "物理",
  "网络",
  "链路",
  "模型",
  "寄存",
  "数据",
  "蜂窝",
  "商业",
  "分组",
  "消息",
  "开放",
  "分享",
  "响应",
  "网关",
  "协议",
  "互联",
  "简化",
  "增值",
  "本地",
  "宽带",
  "带宽",
  "用户",
  "门户",
  "认证",
  "计费",
  "结算",
  "账务",
  "积分",
  "管理",
  "文档",
  "授权",
  "记录",
  "鉴权",
  "功能",
  "转发",
  "编码",
  "移动",
  "代理",
  "后续",
  "判断",
  "特殊",
  "格式",
  "短信",
  "中心",
  "恢复",
  "启动",
  "现代",
  "小区",
  "科普",
  "中国",
  "百科",
  "词条",
  "应用",
  "审核",
  "传送",
  "专业",
  "术语",
  "解释",
  "比特",
  "量化",
  "差错",
  "建议",
  "完整",
  "立即",
  "下载",
  "升级",
  "日志",
  "媒体",
  "帮助",
  "考古",
  "宗教",
  "哲学",
  "伦理",
  "文学",
  "其他",
  "运动",
  "休闲",
  "城市",
  "皮肤",
  "游戏",
  "企业",
  "助手",
  "浏览",
  "资讯",
  "标注",
  "日常",
  "大全",
  "态度",
  "观点",
  "程度",
  "长远",
  "利益",
  "交流",
  "思想",
  "精髓",
  "措施",
  "时间",
  "社会",
  "重视",
  "知识",
  "层面",
  "间接",
  "翻译",
  "经理",
  "英语",
  "中文",
  "作文",
  "介绍",
  "演讲",
  "参考",
  "整理",
  "范文",
  "格式",
  "叙事",
  "动物",
  "大家",
  "喜欢",
  "衣服",
  "习惯",
  "馄饨",
  "葫芦",
  "麻花",
  "甘蔗",
  "酸梅",
  "长寿",
  "加工",
  "烤箱",
  "冰箱",
  "餐桌",
  "食品",
  "餐具",
  "纸巾",
  "肥皂",
  "桌布",
  "水表",
  "插头",
  "行李",
  "托运",
  "贵重",
  "公文",
  "旅行",
  "候机",
  "航班",
  "集合",
  "定金",
  "套房",
  "登记",
  "油漆",
  "浇水",
  "电视",
  "躺椅",
  "折叠",
  "肥皂",
  "牙膏",
  "起居",
  "浴缸",
  "喷头",
  "毛巾",
  "马桶",
  "通风",
  "沙发",
  "点心",
  "虾片",
  "芋头",
  "肉丸",
  "红豆",
  "鱿鱼",
  "猪肚",
  "蛤蜊",
  "乌龙",
  "乌冬",
  "尼龙",
  "草帽",
  "帆布",
];

function App() {
  const [time, setTime] = useState("1:00");
  const [flag, setFlag] = useState(0); //0 未开始 1 已开始 2 结束
  const [val, setVal] = useState("");
  const [res, setRes] = useState(0);
  const [wordlist, setWordlist] = useState([]);

  useEffect(() => {
    shuffle();
  }, []);

  function shuffle() {
    dict = [];

    for (let i = 1; i < alldict.length; i++) {
      const random = Math.floor(Math.random() * (i + 1));
      [alldict[i], alldict[random]] = [alldict[random], alldict[i]];
    }

    for (let word of alldict) {
      dict.push({
        word,
        pinyin: Pinyin.getSpell(word, (c, s) => s[1]),
      });
    }

    turnPage(0);
  }

  function turnPage(i) {
    var left = i * 10;
    var right = left + 10;
    var cur_dist = dict.slice(left, right);
    setWordlist(cur_dist);
  }

  function onInput(event) {
    console.log("onChange", flag);
    var cur_input = event.target.value;
    setVal(cur_input);
    switch (flag) {
      case 0:
        var count = 60;
        setFlag(1);
        timer = setInterval(function () {
          count--;
          var timestr = count >= 10 ? "0:" + count : "0:0" + count;
          setTime(timestr);
          if (count === 0) {
            setRes(type_count);
            setFlag(2);
            clearInterval(timer);
            return;
          }
        }, 1000);
        break;
      case 1:
        if (cur_input === dict[type_ind].pinyin) {
          type_ind++;
          type_count++;
          setVal("");
          if (type_ind % 10 === 0) {
            turnPage(++round);
          }
        }
        break;
      default:
        break;
    }
  }

  function refreshTimer() {
    console.log("onRefresh", flag);
    clearInterval(timer);
    setFlag(0);
    setTime("1:00");
    setVal("");
    type_count = 0;
    type_ind = 0;
    shuffle();
  }

  return (
    <div className="App">
      <nav className="navbar">
        <a>词组设置</a>
        <a>方案选择</a>
        <a>尺寸选择</a>
      </nav>
      <main className="container">
        <div id="word-list">
          {wordlist.map((item, index) => {
            return (
              <div
                className={
                  type_ind % 10 === index
                    ? "word-container current"
                    : "word-container"
                }
              >
                <p className="word">{item.word}</p>
                <p className="pinyin">{item.pinyin}</p>
              </div>
            );
          })}
        </div>
        <div id="typing-container">
          <Input
            addonBefore={time}
            placeholder="输入后开始计时"
            size="large"
            width={200}
            value={val}
            onChange={(event) => {
              onInput(event);
            }}
          ></Input>
          <Tooltip title="刷新">
            <Button
              type="primary"
              shape="circle"
              icon={<RedoOutlined />}
              onClick={() => {
                refreshTimer();
              }}
            ></Button>
          </Tooltip>
        </div>
        <div id="result">{flag === 2 ? <p>{res} wpm</p> : ""}</div>
      </main>
    </div>
  );
}

export default App;
