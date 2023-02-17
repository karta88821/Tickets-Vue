<template>
    <el-container>
        <el-aside width="200px">
            <SideMenu></SideMenu>
        </el-aside>
        <el-container>
            <el-header>
                <strong>後台管理系統</strong>
                <div class="header-avatar">
                    <el-avatar size="medium" :src="userInfo.avatar"></el-avatar>
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            {{ userInfo.username
                            }}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <router-link to="/system/userCenter">
                                    個人中心
                                </router-link>
                            </el-dropdown-item>
                            <el-dropdown-item @click.native="logout"
                                >登出</el-dropdown-item
                            >
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-link href="" target="_blank">網站</el-link>
                </div>
            </el-header>
            <el-main>
                <!-- 嵌入 child router 的內容 -->
                <Tabs></Tabs>
                <div style="margin: 0 15px">
                    <router-view></router-view>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import SideMenu from "./include/SideMenu.vue";
import Tabs from "./include/Tabs.vue";

export default {
    // 把 Home 當成 parent router
    name: "Home",
    components: {
        SideMenu,
        Tabs,
    },
    data() {
        return {
            userInfo: {
                id: "",
                username: "",
                avatar: "",
            },
        };
    },
    created() {
        this.getUserInfo();
    },
    methods: {
        getUserInfo() {
            this.$axios.get("/system/userInfo").then((res) => {
                this.userInfo = res.data.data;
            });
        },
        logout() {
            this.$axios.post("/logout").then((res) => {
                localStorage.clear();
                sessionStorage.clear();

                this.$store.commit("resetState");

                this.$router.push("/login");
            });
        },
    },
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
    padding: 0;
    /* line-height: 160px; */
}

body > .el-container {
    margin-bottom: 40px;
}

.el-dropdown-link {
    cursor: pointer;
}

a {
    text-decoration: none;
}
</style>
