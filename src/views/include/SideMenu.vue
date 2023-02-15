<template>
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
    >
        <el-menu-item index="0">
            <template slot="title">
                <i class="el-icon-s-home"></i>
                <span>首頁</span>
            </template>
        </el-menu-item>

        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-s-operation"></i>
                <span>系統管理</span>
            </template>
            <el-menu-item index="1-1">
                <template slot="title">
                    <i class="el-icon-user-solid"></i>
                    <span>用戶管理</span>
                </template>
            </el-menu-item>
            <el-menu-item index="1-2">
                <template slot="title">
                    <i class="el-icon-rank"></i>
                    <span>角色管理</span>
                </template>
            </el-menu-item>
            <el-menu-item index="1-3">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>菜單管理</span>
                </template>
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {
    name: "SideMenu",
};
</script>

<style>
.el-menu-vertical-demo {
    height: 100%;
}
</style>
