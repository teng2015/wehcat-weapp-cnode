'use strict';
// api 路径
var HOST = 'https://cnodejs.org/api/v1';
// get /topics 主题首页,tab 主题分类, page 页码
var getTopics = (tab = 'all', page = 1) => {
    return `${HOST}/topics?tab=${tab}&page=${page}&limit=10`;
} 
//get /topic/:id 主题详情
var getTopicContent = (id) => {
    return `${HOST}/topic/${id}`;
}
//
var postTopic = function(token, tab, title, content) {

}
// post /accesstoken 验证 accessToken 的正确性
var accesstoken = HOST + '/accesstoken';
// post /topic_collect/collect 收藏主题
var collect = HOST + '/topic_collect/collect';
// post /topic_collect/de_collect 取消主题
var de_collect = HOST + '/topic_collect/de_collect';
// post /reply/:reply_id/ups 为评论点赞
function reply (id) {
  return HOST + "/reply/"+ id +"/ups"
}

// get请求方法
function fetchGet(url, successcb) {
  wx.request({
    url: url,
    header: { 'Content-Type': 'application/json' },
    success: function(res) {
        successcb(res.data)
    },
  })
}

// post请求方法
function fetchPost(url, data, callback) {
  wx.request({
    method: 'POST',
    url: url,
    data: data,
    success (res) {
      callback(null, res.data)
    },
    fail (e) {
      console.error(e)
      callback(e)
    }
  })
}

module.exports = {
  // API
  getTopics: getTopics,
  getTopicContent: getTopicContent,
  accesstoken: accesstoken,
  collect: collect,
  de_collect: de_collect,
  reply: reply,


  // METHOD
  fetchGet: fetchGet,
  fetchPost: fetchPost


}
