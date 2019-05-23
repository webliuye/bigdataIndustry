<template>
  <div class="add-task">
    <h2 class="title">任务详情</h2>
    <el-form :model="addForm" :rules="addRules" ref="addForm" label-width="100px" class="add-form" style="padding-top: 20px">
      <!-- <el-form-item label="任务ID：" prop="id">
        <el-input disabled v-model="addForm.id"></el-input>
      </el-form-item> -->
      <el-form-item label="任务名称：" prop="name">
        <el-input disabled v-model="addForm.name"></el-input>
        <!-- <span class="info-span" v-text="addForm.name"></span> -->
      </el-form-item>
      <el-form-item label="发布日期：" prop="releaseDate">
        <el-input disabled v-model="addForm.releaseDate"></el-input>
        <!-- <span class="info-span" v-text="addForm.releaseDate"></span> -->
      </el-form-item>
      <el-form-item label="发布机构：" prop="department">
        <el-input disabled v-model="addForm.department"></el-input>
        <!-- <span class="info-span" v-text="addForm.department"></span> -->
      </el-form-item>
      <el-form-item label="经办人：" prop="publisher">
        <el-input disabled v-model="addForm.publisher"></el-input>
        <!-- <span class="info-span" v-text="addForm.publisher"></span> -->
      </el-form-item>
      <el-form-item label="任务类型：" prop="type">
        <el-input disabled v-model="addForm.type"></el-input>
        <!-- <span class="info-span" v-text="addForm.type"></span> -->
      </el-form-item>
      <el-form-item label="填报周期：" prop="cycle">
        <el-date-picker
          disabled
          v-model="addForm.cycle"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <!-- <span class="info-span" v-text="addForm.cycle[0] + ' — ' + addForm.cycle[1]"></span> -->
      </el-form-item>
      <el-form-item label="填报主体：" prop="park">
        <el-input disabled v-model="addForm.park"></el-input>
        <!-- <span class="info-span" v-text="addForm.park"></span> -->
      </el-form-item>
      <el-form-item label="附件上传：" prop="file">
        <span class="info-span" v-text="'未上传附件'"></span>
      </el-form-item>
      <el-form-item label="填报说明：" prop="remarks">
        <el-input disabled type="textarea" v-model="addForm.remarks"></el-input>
        <!-- <span class="info-span" v-text="addForm.remarks"></span> -->
      </el-form-item>
    </el-form>
    <div style="padding: 30px 30px 0; width: 100%; text-align: right; box-sizing: border-box">
      <el-button type="primary" @click="closeLook">关闭</el-button>
    </div>
  </div>
</template>

<script>
  import low from 'lowdb'
  import LocalStorage from 'lowdb/adapters/LocalStorage'

  export default {
    props: {
      communication: {
        type: Object,
        default: () => {
          return {

          }
        }
      }
    },
    data() {
      return {
        fileList: [],
        addForm: {
          id: '',
          name: '',
          releaseDate: '',
          department: '',
          publisher: '',
          type: '',
          cycle: '',
          park: '',
          remarks: '',
          status: 0,
          read: 0,
          notRead: 0
        },
        addRules: {
          name: [
            { required: true, message: '请输入任务名称', trigger: 'blur' }
          ],
          releaseDate: [
            { required: true, message: '请选择发布日期', trigger: 'changhe' }
          ],
          department: [
            { required: true, message: '请选择发布机构', trigger: 'changhe' }
          ],
          publisher: [
            { required: true, message: '请输入经办人', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择任务类型', trigger: 'changhe' }
          ],
          cycle: [
            { required: true, message: '请选择填报周期', trigger: 'changhe' }
          ],
          park: [
            { required: true, message: '请选择填报主体', trigger: 'changhe' }
          ]
        }
      }
    },
    mounted() {
      if (this.communication.name) {
        this.addForm.id = this.communication.id
        this.addForm.name = this.communication.name
        this.addForm.releaseDate = this.communication.releaseDate
        this.addForm.department = this.communication.department
        this.addForm.publisher = this.communication.publisher
        this.addForm.type = this.communication.type
        this.addForm.cycle = this.communication.cycle
        this.addForm.park = this.communication.park 
        this.addForm.remarks = this.communication.park 
        this.addForm.read = this.communication.read 
        this.addForm.notRead = this.communication.notRead 
      } else {
        this.createId()
      }
    },
    methods: {
      // 生成一段ID串
      createId() {
        let rnd = '';
        for (let i = 0; i < 12; i++) {
          rnd += Math.floor(Math.random()*10);
        }
        this.addForm.id = rnd
        this.addForm.read = Math.floor(Math.random()*5)
        this.addForm.notRead = Math.floor(Math.random()*10)
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      // 关闭新增
      closeLook() {
        this.$emit('on-close')
      }
    }
  }
</script>

<style lang="less">
  .add-task{
    .title{
      font-size: 16px;
      font-weight: normal;
      width: 100%;
      border-bottom: #eeeeee solid 1px;
      box-sizing: border-box;
      margin-bottom: 30px;
      padding: 0 0 20px 20px;
      color: #333333;
    }

    .add-form{
      width: 100%;
      overflow: hidden;

      .el-form-item{
        width: 50%;
        float: left;
        padding: 0 30px;
        box-sizing: border-box;
      }

      .el-form-item__content{
        width: calc(100% - 100px);

        .el-input, .el-select, .el-date-editor{
          width: 100%;
        }
        .el-input.is-disabled .el-input__inner, .el-range-editor.is-disabled input, .el-range-separator, .el-textarea.is-disabled .el-textarea__inner{
          color: #333333;
        }
      }

      .upload-demo{
        width: 500px;

        .el-upload--text{
          overflow: visible;
          text-align: left;
          border: none;
          height: auto;;
        }
      }
    }

    .info-span{
      color: #666666;
    }
  }
</style>