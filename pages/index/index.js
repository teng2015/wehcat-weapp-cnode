//index.js
//获取应用实例
let app = getApp();
let Api = require('../../utils/api.js');
let fetchGet = Api.fetchGet;
let formatDate = require('../../utils/util.js').formatDate;
Page({
  data: {
    isFetching: false,
    currentTab: 'all',
    currentData: [],
    tabList: [
      {
        title: '全部',
        index: 'all'
      },
      {
        title: '精华',
        index: 'good'
      },
      {
        title: '分享',
        index: 'share'
      },
      {
        title: '问答',
        index: 'ask'
      },
      {
        title: '招聘',
        index: 'job'
      },
    ],
    all: {
      page: 1,
      data: []
    },
    good: {
      page: 1,
      data: []
    },
    ask: {
      page: 1,
      data: []
    },
    share: {
      page: 1,
      data: []
    },
    job: {
      page: 1,
      data: []
    },

  },
  onLoad: function () {
    console.log('onLoad');
    this.getTopics('all', 1);
  },
  onReady: function() {
    console.log('onReady');
  },

  // 加载topics的方法
  getTopics: function(tab, page) {
    this.setData({
      isFetching: true
    });
    let url = Api.getTopics(tab, page);
    fetchGet(url, (res) => {
        if(res.success) {
          // 把content属性删除，太占地方，因为setData有大小限制。
          let newData = res.data;
          newData.forEach((item) => {
            delete item.content;
            item.create_at = formatDate(item.create_at);
          });
          // 已经存在数据的话就用拼接，用在加载更多的时候。
          console.log(this.data[tab].data.length);
          if (this.data[tab].data.length > 0) {
            // 无法直接操作this.data中的数据，所以需要slice一个新数组。
            newData = this.data[tab].data.slice(0).concat(newData);
          }
          var targetPath = tab + '.data'
          this.setData({
            [tab]: {
              data: newData,
              page: page + 1
            },
            currentData: newData,  
            isFetching: false
          });
        }
    });
  },
  onTapTabBar: function(e) {
    let newTab = e.target.dataset.index;
    if(newTab !== this.data.currentTab){
      this.setData({
        currentTab: newTab,
        currentData: this.data[newTab].data
      });
      if(this.data[newTab].data.length === 0) {
        this.getTopics(newTab, 1);
      }
    }
  },
  getNextPage: function() {
    console.log('next');
    let { currentTab, [currentTab]:{ page } } = this.data; 
    this.getTopics(currentTab, page);
  }
})
