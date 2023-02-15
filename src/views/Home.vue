<template>
    <el-container>
        <el-aside width="200px">
            <SideMenu></SideMenu>
        </el-aside>
        <el-container>
            <el-header>
                <strong>後台管理系統</strong>
                <div class="header-avatar">
                    <el-avatar
                        size="medium"
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                    ></el-avatar>
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            Admin<i
                                class="el-icon-arrow-down el-icon--right"
                            ></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>個人中心</el-dropdown-item>
                            <el-dropdown-item>登出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-link href="" target="_blank">網站</el-link>
                </div>
            </el-header>
            <el-main>
                <!-- 嵌入 child router 的內容 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import SideMenu from './include/SideMenu.vue'

export default {
    // 把 Home 當成 parent router
    name: "Home", 
    components: {
        SideMenu
    }
};
</script>

<style>
.el-container {
    padding: 0;
    margin: 0;
    height: 100%;
}
.header-avatar {
    float: right;
    width: 210px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.el-header {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    background-color: #d3dce6;
    color: #333;
    line-height: 200px;
}

.el-main {
    color: #333;
    text-align: center;
    line-height: 160px;
}

body > .el-container {
    margin-bottom: 40px;
}

.el-dropdown-link {
    cursor: pointer;
}
</style>
