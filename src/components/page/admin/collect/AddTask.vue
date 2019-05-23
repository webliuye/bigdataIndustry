<template>
  <div class="add-task">
    <h2 class="title">任务管理</h2>
    <el-form :model="addForm" :rules="addRules" ref="addForm" label-width="100px" class="add-form">
      <el-form-item label="任务ID：" prop="id">
        <el-input disabled v-model="addForm.id"></el-input>
      </el-form-item>
      <el-form-item label="任务名称：" prop="name">
        <el-input v-model="addForm.name"></el-input>
      </el-form-item>
      <el-form-item label="发布日期：" prop="releaseDate">
        <el-date-picker
          v-model="addForm.releaseDate"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="发布机构：" prop="department">
        <el-select v-model="addForm.department">
          <el-option label="顺义区经信局" value="顺义区经信局"></el-option>
          <el-option label="大兴区经信局" value="大兴区经信局"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="经办人：" prop="publisher">
        <el-input v-model="addForm.publisher"></el-input>
      </el-form-item>
      <el-form-item label="任务类型：" prop="type">
        <el-select v-model="addForm.type">
          <el-option label="月报" value="月报"></el-option>
          <el-option label="季报" value="季报"></el-option>
          <el-option label="年报" value="年报"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="填报周期：" prop="cycle">
        <el-date-picker
          v-model="addForm.cycle"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="填报主体：" prop="park">
        <el-select v-model="addForm.park">
          <el-option label="园区" value="园区"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="附件上传：" prop="file">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传txt/sxl文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="填报说明：" prop="remarks">
        <el-input type="textarea" v-model="addForm.remarks"></el-input>
      </el-form-item>
    </el-form>
    <div style="padding: 30px 30px 0 0; box-sizing: border-box; width: 100%; text-align: right">
      <el-button type="primary" @click="saveAdd">保存</el-button>
      <el-button type="success" @click="release">发布</el-button>
      <el-button @click="closeAdd">取消</el-button>
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
          status: '0',
          read: 0,
          notRead: 0,
          streetReadStatus: '0',
          companyReadStatus: '0',
          streetChildShow: true,
          companyChildShow: true
        },
        addRules: {
          name: [
            { required: true, message: '请输入任务名称', trigger: 'blur' }
          ],
          releaseDate: [
            { required: true, message: '请选择发布日期', trigger: 'blur' }
          ],
          department: [
            { required: true, message: '请选择发布机构', trigger: 'change' }
          ],
          publisher: [
            { required: true, message: '请输入经办人', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择任务类型', trigger: 'change' }
          ],
          cycle: [
            { required: true, message: '请选择填报周期', trigger: 'change' }
          ],
          park: [
            { required: true, message: '请选择填报主体', trigger: 'change' }
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
        this.addForm.remarks = this.communication.remarks 
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
      // 保存新增
      saveAdd() {
        this.$refs['addForm'].validate((valid) => {
          if (valid) {
            const adapter = new LocalStorage('task')
            const task = low(adapter)
            let flag = false
            let _task = null
            if (task.has('taskList').value()) {
              task.get('taskList').value().forEach(thisTask => {
                if (thisTask.id === this.addForm.id) {
                  flag = true
                  _task = thisTask
                }
              })
              // 如果任务ID，只修改，不新增
              if (flag) {
                task.get('taskList').find(_task).assign(this.addForm).write()
              } else {
                task.get('taskList').push(this.addForm).write()
              }
            } else {
              task.defaults({ taskList: [this.addForm] }).write()
            }
            this.$message({
              type: 'success',
              message: '保存任务成功'
            })     
            this.closeAdd() 
          }
        })
      },
      // 发布任务
      release() {
        this.addForm.status = '1'
        this.$refs['addForm'].validate((valid) => {
          if (valid) {
            const adapter = new LocalStorage('task')
            const task = low(adapter)
            let flag = false
            let _task = null
            if (task.has('taskList').value()) {
              task.get('taskList').value().forEach(thisTask => {
                if (thisTask.id === this.addForm.id) {
                  flag = true
                  _task = thisTask
                }
              })
              // 如果任务ID，只修改，不新增
              if (flag) {
                task.get('taskList').find(_task).assign(this.addForm).write()
              } else {
                task.get('taskList').push(this.addForm).write()
              }
            } else {
              task.defaults({ taskList: [this.addForm] }).write()
            }
            this.$message({
              type: 'success',
              message: '发布任务成功'
            })     
            this.closeAdd()      
          }
        })
      },
      // 关闭新增
      closeAdd() {
        this.$emit('on-close')
      }
    }
  }
</script>

<style lang="less">
  .add-task{
    overflow-y: auto;

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
  }
</style>


