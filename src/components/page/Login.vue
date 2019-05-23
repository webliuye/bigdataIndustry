<template>
  <section class="login-wrap">
    <h1 class="web-title"></h1>
    <div class="login-content-bg">
      <div class="login-content">
        <h2>用户登录</h2>
        <el-form
          :model="loginForm"
          :rules="loginRules"
          ref="loginForm"
        >
          <el-form-item prop="username">
            <el-input
              placeholder="用户名"
              prefix-icon="el-icon-user"
              @keyup.enter.native="submitLogin"
              v-model="loginForm.username"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="密码"
              prefix-icon="el-icon-lock"
              type="password"
              @keyup.enter.native="submitLogin"
              v-model="loginForm.password"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input
              style="width: calc(100% - 120px)"
              placeholder="验证码"
              prefix-icon="el-icon-message"
              @keyup.enter.native="submitLogin"
              v-model="loginForm.code"
            >
            </el-input>
            <div
              @click="refreshCode"
              class="get-code"
            >
              <verification-code :identifyCode="identifyCode"></verification-code>
            </div>
          </el-form-item>
          <p class="forget-password">忘记密码</p>
          <el-form-item>
            <el-button
              @click="submitLogin"
              type="primary"
            >登 录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </section>
</template>

<script>
import verificationCode from '@/components/common/VerificationCode.vue';
import bus from '../common/bus';

export default {
  data: function () {
    // 验证码自定义验证规则
    const validateVerifycode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else if (value !== this.identifyCode) {
        callback(new Error('验证码不正确!'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'jingxin',
        password: '123',
        code: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 12, message: '密码长度为3-12位', trigger: 'blur' }
        ],
        code: [
          { required: true, trigger: 'blur', validator: validateVerifycode }
        ]
      },
      identifyCodes: '1234567890',
      identifyCode: '',
      loginUser: {
        jingxin: {
          username: 'jingxin',
          password: '123',
          userType: 'admin'
        },
        street: {
          username: 'street',
          password: '123',
          userType: 'street'
        },
        company: {
          username: 'company',
          password: '123',
          userType: 'company'
        }
      }
    }
  },
  components: {
    verificationCode
  },
  mounted () {
    // 验证码初始化
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  methods: {
    // 生成随机数
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 切换验证码
    refreshCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    // 生成四位随机验证码
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ]
      }
      this.loginForm.code = this.identifyCode
    },
    submitLogin () {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          const _loginInfo = this.loginUser[this.loginForm.username]
          if (_loginInfo && _loginInfo.password === this.loginForm.password) {
            localStorage.setItem('userName', _loginInfo.username)
            localStorage.setItem('userType', _loginInfo.userType)

            bus.$emit('user-change', _loginInfo.userType)

            this.$axios.get(`/mock/menu/${_loginInfo.userType}.json`)
              .then(res => {
                localStorage.setItem('menuData', JSON.stringify(res.data));
                localStorage.setItem('currentNav', '/dashboard');
                bus.$emit('menu-data', res.data);
                this.$router.push('/');
              })
          } else {
            this.$message.error('用户名或密码错误')
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-wrap {
  width: 100%;
  height: 100%;
  min-height: 800px;
  overflow: auto;
  overflow: hidden;
  background: url('../../assets/img/login/bg.png') no-repeat center;
  background-size: cover;
  position: relative;

  .web-title {
    width: 44%;
    height: 7.5%;
    margin-left: -22%;
    position: absolute;
    top: 7%;
    left: 50%;
    background: url('../../assets/img/login/logo.png') no-repeat center;
    background-size: contain;
  }

  .login-content-bg {
    width: 30%;
    max-width: 500px;
    min-width: 350px;
    position: absolute;
    right: 10%;
    top: 50%;
    transform: translateY(-45%);
    background-color: #ffffff;
    // background: url('../../assets/img/login/login-main.png') no-repeat center right;
    // background-size: contain;

    .login-content {
      margin-top: 12px;
      padding: 20px;
      box-sizing: border-box;

      h2 {
        text-align: center;
        font-size: 22px;
        font-weight: normal;
        color: #262626;
        padding: 10px 0;
        letter-spacing: 1px;
      }

      .get-code {
        float: right;
        width: 112px;
        height: 38px;
        overflow: hidden;
      }

      .forget-password {
        text-align: right;
        color: #666666;
        cursor: pointer;
        font-size: 14px;
        margin-top: -20px;
      }

      .el-form-item {
        margin: 25px 0;
      }

      .el-button {
        width: 100%;
        height: 45px;
        font-size: 16px;
      }
    }
  }
}
</style>

<style lang="less">
.login-content {
  .el-input {
    height: 40px;

    .el-input__inner {
      height: 40px;
      line-height: 40px;
      padding-left: 35px;
      font-size: 16px;
    }

    .el-input__icon {
      font-size: 18px;
    }
  }
}
</style>