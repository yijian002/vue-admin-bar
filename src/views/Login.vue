<template>
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <h3 class="title">【网吧管家】运营后台登录</h3>
        <el-form-item prop="account">
            <el-input type="text" v-model="ruleForm2.account" @keyup.enter.native="handleSubmit" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" @keyup.enter.native="handleSubmit" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    import { requestLogin} from '../api/api';

    export default {
        data() {
            return {
                logining: false,
                ruleForm2: {
                    account: '',
                    checkPass: ''
                },
                rules2: {
                    account: [{required: true, message: '请输入账号', trigger: 'blur'}],
                    checkPass: [{required: true, message: '请输入密码', trigger: 'blur'}]
                },
                checked: true
            };
        },
        methods: {
            handleSubmit() {
                this.$refs.ruleForm2.validate((valid) => {
                    if (!valid) {
                        return;
                    }

                    this.logining = true;
                    var loginParams = {
                        tuser_account: this.ruleForm2.account,
                        tuser_pwd: this.ruleForm2.checkPass
                    };

                    requestLogin(loginParams).then(res => {
                        this.logining = false;
                        let {
                            message,
                            code,
                            data
                        } = res;

                        if (code !== 0) {
                            this.$message({message: message || '登录失败，请检查输入是否正确！', type: 'error'});
                        } else {
                            sessionStorage.setItem('user', JSON.stringify(data));
                            this.$router.push({ path: '/index' });
                        }
                    });
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
.login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
    .remember {
        margin: 0px 0px 35px 0px;
    }
}
</style>
