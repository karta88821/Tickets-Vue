<template>
    <div>
        <el-form :inline="true">
            <el-form-item>
                <el-button type="primary" @click="dialogVisible = true"
                    >新增</el-button
                >
            </el-form-item>
        </el-form>

        <el-table
            :data="tableData"
            style="width: 100%; margin-bottom: 20px"
            row-key="id"
            border
            stripe
            default-expand-all
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
            <el-table-column
                prop="name"
                label="名稱"
                sortable
                width="180"
            ></el-table-column>
            <el-table-column
                prop="permission"
                label="權限編碼"
                sortable
                width="180"
            ></el-table-column>
            <el-table-column prop="icon" label="圖標"></el-table-column>
            <el-table-column prop="type" label="類型">
                <template slot-scope="scope">
                    <el-tag size="small" v-if="scope.row.type === 0"
                        >目錄</el-tag
                    >
                    <el-tag
                        size="small"
                        v-else-if="scope.row.type === 1"
                        type="success"
                        >菜單</el-tag
                    >
                    <el-tag
                        size="small"
                        v-else-if="scope.row.type === 2"
                        type="info"
                        >按鈕</el-tag
                    >
                </template>
            </el-table-column>
            <el-table-column prop="path" label="menu path"></el-table-column>
            <el-table-column
                prop="component"
                label="menu component"
            ></el-table-column>
            <el-table-column prop="orderNum" label="排序號"></el-table-column>
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
                    <el-button type="text" @click="editHandle(scope.row.id)">編輯</el-button>
                    <el-divider direction="vertical"></el-divider>

                    <template>
                        <el-popconfirm title="这是一段内容确定删除吗？" @confirm="deleteHandle(id)">
                            <el-button type="text" slot="reference">删除</el-button>
                        </el-popconfirm>
                    </template>
                    
                </template>
            </el-table-column>
        </el-table>

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
                <el-form-item label="上級菜單" prop="parentId">
                    <el-select
                        v-model="editForm.parentId"
                        placeholder="請選擇上級菜單"
                    >
                        <template v-for="item in tableData">
                            <el-option
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                            <template v-for="child in item.children">
                                <el-option
                                    :label="child.name"
                                    :value="child.id"
                                >
                                    <span>{{ "- " + child.name }}</span>
                                </el-option>
                            </template>
                        </template>
                    </el-select>
                </el-form-item>

                <el-form-item label="菜單名稱" prop="name" label-width="100px">
                    <el-input
                        v-model="editForm.name"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>

                <el-form-item
                    label="權限編碼"
                    prop="permission"
                    label-width="100px"
                >
                    <el-input
                        v-model="editForm.perms"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>

                <el-form-item label="圖示" prop="icon" label-width="100px">
                    <el-input
                        v-model="editForm.icon"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="菜單路徑" prop="path" label-width="100px">
                    <el-input
                        v-model="editForm.path"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>

                <el-form-item
                    label="菜單組件"
                    prop="component"
                    label-width="100px"
                >
                    <el-input
                        v-model="editForm.component"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>

                <el-form-item label="類型" prop="type" label-width="100px">
                    <el-radio-group v-model="editForm.type">
                        <el-radio :label="0">目录</el-radio>
                        <el-radio :label="1">菜单</el-radio>
                        <el-radio :label="2">按钮</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="狀態" prop="status" label-width="100px">
                    <el-radio-group v-model="editForm.statu">
                        <el-radio :label="0">禁用</el-radio>
                        <el-radio :label="1">正常</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item
                    label="排序號"
                    prop="orderNum"
                    label-width="100px"
                >
                    <el-input-number
                        v-model="editForm.orderNum"
                        :min="1"
                        label="排序號"
                        >1</el-input-number
                    >
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('editForm')"
                        >建立</el-button
                    >
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "Menu",
    data() {
        return {
            dialogVisible: false,
            editForm: {},
            editFormRules: {
                parentId: [
                    {
                        required: true,
                        message: "请选择上级菜单",
                        trigger: "blur",
                    },
                ],
                name: [
                    { required: true, message: "请输入名称", trigger: "blur" },
                ],
                perms: [
                    {
                        required: true,
                        message: "请输入权限编码",
                        trigger: "blur",
                    },
                ],
                type: [
                    { required: true, message: "请选择状态", trigger: "blur" },
                ],
                orderNum: [
                    {
                        required: true,
                        message: "请填入排序号",
                        trigger: "blur",
                    },
                ],
                statu: [
                    { required: true, message: "请选择状态", trigger: "blur" },
                ],
            },
            tableData: [],
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.post('/system/menu/' + (this.editForm.id ? 'update' : 'save'), this.editForm)
                    .then(res => {
                        this.$message({
                            showClose: true,
                            message: '恭喜你，操作成功',
                            type: 'success',
                            onClose: () => {
                                this.getMenuTree()
                            }
                        });

                        this.resetForm('editForm')
                    })
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.dialogVisible = false
            this.editForm = {}
        },
        handleClose() {
			this.resetForm('editForm')
		},
        getMenuTree() {
            this.$axios.get("/system/menu/list").then(res => {
                this.tableData = res.data.data
            })
        },
        editHandle(id) {
            this.$axios.get('/system/menu/info/' + id).then(res => {
                this.editForm = res.data.data
                this.dialogVisible = true
            })
        },
        deleteHandle(id) {
            this.$axios.post('/system/menu/delete/' + id).then(res => {
                this.$message({
                    showClose: true,
                    message: '恭喜你，操作成功',
                    type: 'success',
                    onClose: () => {
                        this.getMenuTree()
                    }
                });
            })
        }
    },
    created() {
        this.getMenuTree()
    }
};
</script>

<style>
</style>