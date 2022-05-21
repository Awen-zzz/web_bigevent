$(function () {
  getUserInfo(); // 调用函数获取用户基本信息
  //获取layer
  const layer = layui.layer;
  $("#btnLogout").click(() => {
    layer.confirm("确认是否退出", { icon: 3, title: "" }, function (index) {
      localStorage.removeItem("token");
      location.href = "/login.html";
    });
  });
});
const layer = layui.layer;
function getUserInfo() {
  //获取用户基本信息
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    //请求的时候就需要设置请求头信息，把我们获取到的 `token` 传递给后台
    // headers: {
    //   Authorization: localStorage.getItem("token"),
    // },
    success: (res) => {
      console.log(res);
      if (res.status !== 0) return layer.msg("获取用户信息失败");
      layer.msg("获取用户信息成功！");
      getUserPic(res.data);
    },
    //不论成功还是失败，最终都会调用complete回调函数
  });
}
//渲染头像函数
const getUserPic = (user) => {
  //获取名字
  let name = user.nickname || user.username;
  //设置欢迎名字文本
  $("#welcome").html(`欢迎${name}`);
  //按需渲染头像
  if (user.user_pic !== null) {
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    const firstName = name[0].toUpperCase();
    $(".text-avatar").html(firstName).show();
    $(".layui-nav-img").hide();
  }
};
