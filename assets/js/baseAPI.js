//请求拦截器
$.ajaxPrefilter((option) => {
  option.url = `http://www.liulongbin.top:3007` + option.url;
  //在请求之前给有权限的接口注入token
  if (option.url.includes("/my/")) {
    option.headers = {
      Authorization: localStorage.getItem("token"),
    };
  }

  //统一处理权限问题
  option.complete = (res) => {
    if (
      // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
      res.responseJSON.status === 1 &&
      res.responseJSON.message === "身份认证失败！"
    ) {
      //清空token，登录的唯一标识，确认是否登录
      localStorage.removeItem("token");
      location.href = "/login.html";
    }
  };
});
