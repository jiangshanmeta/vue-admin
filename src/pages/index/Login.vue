<template>
    <el-form>
        <el-form-item label="手机号">
            <el-input v-model="phone" />
        </el-form-item>
        <el-form-item label="密码">
            <el-input
                v-model="pwd"
                type="password"
            />
        </el-form-item>
        <el-button
            type="success"
            @click="doLogin"
        >
            登录
        </el-button>
    </el-form>
</template>

<script>
export default {
    data () {
        return {
            phone: '',
            pwd: '',
        }
    },
    methods: {
        doLogin () {
            const phone = this.phone
            if (!phone) {
                alert('请输入手机号')
                return
            }
            const pwd = this.pwd
            if (!pwd) {
                alert('请输入手机号')
                return
            }
            const data = {
                phone,
                pwd,
            }
            this.$store.dispatch('doLogin', data)
        },
    },
}
</script>
