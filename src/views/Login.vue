<template>
    <el-row type="flex" class="row-bg" justify="center">
        <!--- xl和lg是動態布局 --->
        <el-col :xl="6" :lg="7">
            <h2>Welcome to Admin Management System</h2>
            <!--- :src="require('@/assets/logo.png')"用來載入圖片--->
            <el-image :src="require('@/assets/logo.png')" style="height: 180px; width: 180px"></el-image>
        </el-col>

        <el-col :span="1">
            <el-divider direction="vertical"></el-divider>
        </el-col>

        <el-col :span="6">
            <!--- script中定義loginForm裡面的欄位，這邊的每個欄位的名稱要相同--->
            <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
                <el-form-item label="username" prop="username" style="width: 380px">
                    <el-input v-model="loginForm.username"></el-input>
                </el-form-item>

                <el-form-item label="password" prop="password" style="width: 380px">
                    <el-input v-model="loginForm.password"></el-input>
                </el-form-item>

                <el-form-item label="code" prop="code" style="width: 380px">
                    <el-input v-model="loginForm.code" style="width: 172px; float: left"></el-input>
                    <!--- 載入script所return的capImg--->
                    <el-image :src="capImg" class="capImg"></el-image>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">立即创建</el-button>
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    username: '',
                    password: '',
                    code: '',
                    token: ''
                },
                rules: {
                    username: [
                        { required: true, message: '請輸入使用者名稱', trigger: 'blur' },
                        { min: 6, max: 12, message: '長度在 6 到 12 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '請輸入密碼', trigger: 'blur' },
                        { min: 6, max: 12, message: '長在 6 到 12 个字符', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '請輸入驗證碼', trigger: 'blur' },
                        { min: 5, max: 5, message: '長度為 5 个字符', trigger: 'blur' }
                    ]
                },
                capImg: null // 一開始圖片是空的，在created()呼叫了getCapImg()，以設定圖片
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 若前端驗證欄位都合法，向server發送post request來登入，$axios是http的library(在main.js就載入了)
                    this.$axios.post('/login', this.loginForm).then(res => {

                        const jwt = res.headers['authorization']
                        
                        // 交給 store 的 mutations 去改變 store 中 token 的 state
                        this.$store.commit('SET_TOKEN', jwt)

                        // 跳轉到 /index
                        this.$router.push('/index')
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            getCapImg() {
                this.$axios.get('/capImg').then(res => {
                    console.log("capImg")
                    console.log(res)
                    this.loginForm.token = res.data.data.token
                    this.capImg = res.data.data.capImg
                })
            }
        },
        created() { // vue的lifecycle之一，要載入的資料要在created()呼叫
            this.getCapImg()
        }
    }
</script>

<style scoped>

	.el-row {
		background-color: #fafafa;
		height: 100%;
		display: flex;
		align-items: center;
		text-align: center;
		justify-content: center;
	}

    .el-divider {
        height: 200px;
    }

    .capImg {
        float: left;
        margin-left: 8px;
        border-radius: 4px;
    }
</style>
