<template>
  <el-row class="menu_page">
    <el-col>
      <el-menu
          mode="vertical"
          background-color="#324057"
          text-color="#fff"
          active-text-color="#409eff"
          class="el-menu-vertical-demo">
        <router-link to="/home">
          <el-menu-item index="0">
            <i class="fa fa-margin fa-server notice-margin"></i>
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>
        <template  v-for="item in items" >
          <el-submenu v-if="item.children" :index="item.path" :key="item.path">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <router-link v-for="(citem,cindex) in item.children"
                         :to="citem.path" :key="cindex">
              <el-menu-item
                  :index='citem.path'>
                <span slot="title">{{citem.name}}</span>
              </el-menu-item>
            </router-link>
          </el-submenu>

        </template>
        <router-link to="/usermes">
          <el-menu-item index="3">
            <i class="fa fa-margin el-icon-edit notice-margin"></i>
            <span slot="title">用户留言</span>
          </el-menu-item>
        </router-link>
        <router-link to="/notice">
          <el-menu-item index="1">
            <i class="fa fa-margin el-icon-bell notice-margin"></i>
            <span slot="title">系统公告</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    name: "leftmenu",
    data() {
      return {
        items: [
          {
            icon: "el-icon-zoom-in",
            name: "用电查询",
            path: 'search',
            children: [{ path: "electricitysearch", name: "电费电量" }]
          },
          {
            icon: "el-icon-tickets",
            name: "用电明细",
            path: 'info',
            children: [{ path: "electricityinfo", name: "订单详细" }]
          },
          {
            icon: "el-icon-service",
            name: "用户档案",
            path: 'userfile',
            children: [{ path: "userfile", name: "用户资料" }]
          },
          {
            icon: "el-icon-setting",
            name: "信息管理",
            path: 'user',
            children: [{ path: "user", name: "帐号信息" }]
          }
        ]
      };
    }
  };
</script>
<style scoped>
  .menu_page {
    position: fixed;
    top: 80px;
    left: 0;
    min-height: 100%;
    background-color: #324057;
    z-index: 99;
  }
  .el-menu {
    border: none;
  }
  .fa-margin {
    margin-right: 5px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
    min-height: 400px;
  }
  .el-menu-vertical-demo {
    width: 35px;
  }
  .el-submenu .el-menu-item {
    min-width: 180px;
  }

  .hiddenDropdown,
  .hiddenDropname {
    display: none;
  }
  a {
    text-decoration: none;
  }

  .notice-margin {
    display: inline-block;
    margin: 0 10px 0 6px;
  }

</style>
