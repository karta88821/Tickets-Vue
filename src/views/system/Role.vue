<template>
    <div>
        <el-form :inline="true">
            <el-form-item>
                <el-input
                    v-model="searchForm.name"
                    placeholder="名稱"
                    clearable
                ></el-input>
            </el-form-item>

            <el-form-item>
                <el-button @click="getRoleList">查詢</el-button>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="dialogVisible = true"
                    >新增</el-button
                >
            </el-form-item>

            <el-form-item>
                <el-popconfirm
                    title="確定要批量删除吗？"
                    @confirm="deleteHandle(null)"
                >
                    <el-button
                        type="danger"
                        slot="reference"
                        :disabled="disableDeleteBtn"
                        >批量删除</el-button
                    >
                </el-popconfirm>
            </el-form-item>
        </el-form>

        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            border
            stripe
            style="width: 100%"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="name" label="名稱" width="120">
            </el-table-column>
            <el-table-column prop="code" label="唯一編碼" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="remark" label="描述" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="status" label="狀態">
                <template slot-scope="scope">
                    <el-tag
                        size="small"
                        type="success"
                        v-if="scope.row.status === 1"
                        >正常</el-tag
                    >
                    <el-tag
                        size="small"
                        type="danger"
                        v-else-if="scope.row.status === 0"
                        >禁用</el-tag
                    >
                </template>
            </el-table-column>
            <el-table-column prop="operations" label="操作">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        @click="permissionHandle(scope.row.id)"
                        >分配權限</el-button
                    >
                    <el-divider direction="vertical"></el-divider>
                    <el-button type="text" @click="editHandle(scope.row.id)"
                        >編輯</el-button
                    >
                    <el-divider direction="vertical"></el-divider>

                    <template>
                        <el-popconfirm
                            title="这是一段内容确定删除吗？"
                            @confirm="deleteHandle(scope.row.id)"
                        >
                            <el-button type="text" slot="reference"
                                >删除</el-button
                            >
                        </el-popconfirm>
                    </template>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes, prev, pager, next, jumper"
            :page-sizes="[10, 25, 50, 100]"
            :current-page="current"
            :page-size="size"
            :total="total"
        >
        </el-pagination>

        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="600px"
            :before-close="handleClose"
        >
            <el-form
                :model="editForm"
                :rules="editFormRules"
                ref="editForm"
                label-width="100px"
                class="demo-editForm"
            >
                <el-form-item label="角色名稱" prop="name" label-width="100px">
                    <el-input
                        v-model="editForm.name"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>

                <el-form-item label="唯一編碼" prop="code" label-width="100px">
                    <el-input
                        v-model="editForm.code"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>

                <el-form-item label="描述" prop="remark" label-width="100px">
                    <el-input
                        v-model="editForm.remark"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>

                <el-form-item label="狀態" prop="status" label-width="100px">
                    <el-radio-group v-model="editForm.status">
                        <el-radio :label="0">禁用</el-radio>
                        <el-radio :label="1">正常</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('editForm')"
                        >建立</el-button
                    >
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog
            title="分配權限"
            :visible.sync="permissionDialogVisible"
            width="600px"
        >
            <el-form :model="permissionForm">
                <el-tree
                    :data="permissionTreeData"
                    show-checkbox
                    :check-strictly="true"
                    ref="permissionTree"
                    :default-expand-all="true"
                    node-key="id"
                    :props="defaultProps"
                >
                </el-tree>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="permissionDialogVisible = false"
                    >取 消</el-button
                >
                <el-button
                    type="primary"
                    @click="submitFormPermissionHandle('permissionForm')"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "Role",
    data() {
        return {
            current: 1,
            total: 0,
            size: 10,

            dialogVisible: false,
            editForm: {},
            editFormRules: {
                name: [
                    {
                        required: true,
                        message: "请输入角色名称",
                        trigger: "blur",
                    },
                ],
                code: [
                    {
                        required: true,
                        message: "请输入唯一編碼",
                        trigger: "blur",
                    },
                ],
                status: [
                    { required: true, message: "请选择状态", trigger: "blur" },
                ],
            },

            searchForm: {},
            disableDeleteBtn: true,
            tableData: [],
            multipleSelection: [],

            permissionTreeData: [],
            permissionDialogVisible: false,
            defaultProps: {
                children: "children",
                label: "name",
            },
            permissionForm: {},
        };
    },
    created() {
        // 頁面建立成功後呼叫
        this.getRoleList();

        this.$axios.get("/system/menu/list").then((res) => {
            this.permissionTreeData = res.data.data;
        });
    },
    methods: {
        toggleSelection(rows) {
            if (rows) {
                rows.forEach((row) => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            this.disableDeleteBtn = val.length == 0;
        },
        handleSizeChange(val) {
            console.log(`每頁 ${val} 條`);
            this.size = val;
            this.getRoleList();
        },
        handleCurrentChange(val) {
            console.log(`當前頁: ${val}`);
            this.current = val;
            this.getRoleList();
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.dialogVisible = false;
            this.editForm = {};
        },
        handleClose() {
            this.resetForm("editForm");
        },
        getRoleList() {
            this.$axios
                .get("/system/role/list", {
                    params: {
                        name: this.searchForm.name,
                        current: this.current,
                        size: this.size,
                    },
                })
                .then((res) => {
                    let data = res.data.data;
                    this.tableData = data.records;
                    this.size = data.size;
                    this.total = data.total;
                    this.current = data.current;
                });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios
                        .post(
                            "/system/role/" +
                                (this.editForm.id ? "update" : "save"),
                            this.editForm
                        )
                        .then((res) => {
                            this.$message({
                                showClose: true,
                                message: "恭喜你，操作成功",
                                type: "success",
                                onClose: () => {
                                    this.getRoleList();
                                },
                            });

                            this.resetForm("editForm");
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        editHandle(id) {
            this.$axios.get("/system/role/info/" + id).then((res) => {
                this.editForm = res.data.data;
                this.dialogVisible = true;
            });
        },
        deleteHandle(id) {
            var ids = [];

            if (id) {
                ids.push(id);
            } else {
                this.multipleSelection.forEach((row) => {
                    ids.push(row.id);
                });
            }

            console.log("ids");
            console.log(ids);

            this.$axios.post("/system/role/delete", ids).then((res) => {
                this.$message({
                    showClose: true,
                    message: "恭喜你，操作成功",
                    type: "success",
                    onClose: () => {
                        this.getRoleList();
                    },
                });
            });
        },
        permissionHandle(id) {
            this.permissionDialogVisible = true;
            this.$axios.get("/system/role/info/" + id).then((res) => {
                this.$refs.permissionTree.setCheckedKeys(res.data.data.menuIds); // 顯示原本的狀態
                this.permissionFrom = res.data.data;
            });
        },
        submitFormPermissionHandle(formName) {
            let menuIds = this.$refs.permissionTree.getCheckedKeys();
            console.log(menuIds);
            this.$axios
                .post(
                    "/system/role/permission/" + this.permissionForm.id,
                    menuIds
                )
                .then((res) => {
                    this.$message({
                        showClose: true,
                        message: "恭喜你，操作成功",
                        type: "success",
                        onClose: () => {
                            this.getRoleList();
                        },
                    });
                    this.permissionDialogVisible = false
                });
        },
    },
};
</script>

<style>
.el-pagination {
    float: right;
    margin-top: 22px;
}
</style>