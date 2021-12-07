import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Login",
    hidden: true,
    meta: {
      title: "登录"
    },
    component: () => import("@/views/acount/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    hidden: true,
    meta: {
      title: "注册"
    },
    component: () => import("../views/acount/Register.vue"),
    children: []
  },
  //忘记密码
  {
    path: "/forget",
    name: "Forget",
    hidden: true,
    meta: {
      title: "忘记密码"
    },
    component: () => import("../views/acount/Forget.vue"),
    children: []
  },
    //管理后台-首页
  {
    path: "/index",
    name: "Index",
    meta: {
      title: "首111页",
      icon: "home"
    },
    component: () => import("../views/layout/Index.vue"),
    children: [
      {
        path: "/home",
        name: "Home",
        meta: {
          title: "首111页"
        },
        component: () => import("@/views/home/Index.vue"),
        
      },
    ]
  },
  //管理后台-管理总台
  {
    path: "/adminIndex",
    name: "AdminIndex",
    meta: {
      title: "管理总台",
      icon: "console"
    },
    component: () => import("../views/layout/Index.vue"),
    children: [
      {
        path: "/role",
        name: "Role",
        meta: {
          title: "角色管理",
          icon: "role"
        },
        component: () => import("../views/admin/Role.vue"),
        children: [
          {
            path: "/map",
            name: "Map",
            meta: {
              title: "热力地图"
            },
            component: () => import("../views/admin/Map.vue"),
            children: [
              {
                path: "/map",
                name: "Map",
                meta: {
                  title: "热力地图111"
                },
                component: () => import("../views/admin/Map.vue"),
              }
            ]
          },
          {
            path: "/map1",
            name: "Map1",
            meta: {
              title: "热力地图1"
            },
            component: () => import("../views/admin/Map.vue"),
          }
        ]
      },
      {
        path: "/user",
        name: "User",
        meta: {
          title: "用户管理",
          icon: "user"
        },
        component: () => import("../views/admin/User list.vue"),
      },
      {
        path: "/menu",
        name: "Menu",
        meta: {
          title: "菜单列表",
          icon: "product"
        },
        component: () => import("../views/admin/Menu Management.vue"),
      }

    ],
  },
  //管理后台-信息管理
  {
    path: "/newsIndex",
    name: "NewsIndex",
    meta: {
      title: "信息管理",
      icon: "information"
    },
    component: () => import("../views/news/Index.vue"),
    children: []
  },
  {
    path: "/member",
    name: "Member",
    meta: {
      title: "会员管理",
      icon: "member"
    },
    component: () => import("../views/News.vue"),
    children: []
  },
  {
    path: "/product",
    name: "Product",
    meta: {
      title: "产品管理",
      icon: "product"
    },
    component: () => import("../views/News.vue"),
    children: []
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
