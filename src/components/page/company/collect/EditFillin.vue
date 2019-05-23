<template>
  <div class="edit-fillin">
    <div class="title">
      <div class="cycle">
        采集周期：
        <el-select v-model="addForm.cycle">
          <el-option label="年度" value="年度"></el-option>
          <el-option label="季度" value="季度"></el-option>
          <el-option label="月度" value="月度"></el-option>
        </el-select>
      </div>
      <h2>企业信息年报表</h2>
    </div>
    <el-form :model="addForm" :rules="addRules" ref="addForm" label-width="220px" class="add-form">
      <h3 class="form-title">企业基本情况</h3>
      <el-form-item label="企业名称：" prop="name">
        <el-input v-model="addForm.name"></el-input>
      </el-form-item>
      <el-form-item label="注册资金：（万元）" prop="registeredCapital">
        <el-input v-model="addForm.registeredCapital"></el-input>
      </el-form-item>
      <el-form-item label="所属地区：" prop="area">
        <el-select v-model="addForm.area">
          <el-option label="顺义区" value="顺义区"></el-option>
          <el-option label="大兴区" value="大兴区"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工业园区：" prop="park">
        <el-select v-model="addForm.park">
          <el-option label="中关村科技园区顺义园" value="中关村科技园区顺义园"></el-option>
          <el-option label="顺义区北石槽镇中北工业区" value="顺义区北石槽镇中北工业区"></el-option>
          <el-option label="天竺空港工业区" value="天竺空港工业区"></el-option>
          <el-option label="顺义马坡聚源工业区" value="顺义马坡聚源工业区"></el-option>
          <el-option label="顺义区牛栏山工业区" value="顺义区牛栏山工业区"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属行业：" prop="industry">
        <el-select v-model="addForm.industry">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="智能新能源汽车产业" value="智能新能源汽车产业"></el-option>
          <el-option label="航空航天产业" value="航空航天产业"></el-option>
          <el-option label="生物医药大健康产业" value="生物医药大健康产业"></el-option>
          <el-option label="智能装备" value="智能装备"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工业行业分类：" prop="industryType">
        <el-input v-model="addForm.industryType"></el-input>
      </el-form-item>
      <el-form-item label="行业代码：" prop="industryCode">
        <el-input v-model="addForm.industryCode"></el-input>
      </el-form-item>
      <el-form-item label="组织机构代码：" prop="creditCode">
        <el-input v-model="addForm.creditCode"></el-input>
      </el-form-item>
      <el-form-item label="登记注册类型代码：" prop="zhuceCode">
        <el-input v-model="addForm.zhuceCode"></el-input>
      </el-form-item>
      <el-form-item label="控股情况：" prop="konggu">
        <el-input v-model="addForm.konggu"></el-input>
      </el-form-item>
      <el-form-item label="企业规模标准：" prop="guimo">
        <el-select v-model="addForm.guimo">
          <el-option label="是" value="是"></el-option>
          <el-option label="否" value="否"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否资质等级的建筑业：" prop="zizidengji">
        <el-select v-model="addForm.zizidengji">
          <el-option label="是" value="是"></el-option>
          <el-option label="否" value="否"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否个体工商户：" prop="geti">
        <el-select v-model="addForm.geti">
          <el-option label="是" value="是"></el-option>
          <el-option label="否" value="否"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开业（成立）时间：" prop="openDate">
        <el-date-picker
          v-model="addForm.openDate"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="是否军民结合企业：" prop="junming">
        <el-select v-model="addForm.junming">
          <el-option label="是" value="是"></el-option>
          <el-option label="否" value="否"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="注册地址：" prop="zhucedizhi">
        <el-input v-model="addForm.zhucedizhi"></el-input>
      </el-form-item>
      <el-form-item label="邮政编码：" prop="youbian">
        <el-input v-model="addForm.youbian"></el-input>
      </el-form-item>
      <el-form-item label="经营地址：" prop="jingying">
        <el-input v-model="addForm.jingying"></el-input>
      </el-form-item>
      <el-form-item label="法人代表：" prop="faren">
        <el-input v-model="addForm.faren"></el-input>
      </el-form-item>
      <el-form-item label="注册企业：" prop="zhuceqiye">
        <el-input v-model="addForm.zhuceqiye"></el-input>
      </el-form-item>
      <el-form-item label="日常联系人：" prop="lianxiren">
        <el-input v-model="addForm.lianxiren"></el-input>
      </el-form-item>
      <el-form-item label="联系电话：" prop="dianhua">
        <el-input v-model="addForm.dianhua"></el-input>
      </el-form-item>
      <el-form-item label="统计负责人：" prop="fuzeren">
        <el-input v-model="addForm.fuzeren"></el-input>
      </el-form-item>
      <el-form-item label="电子邮件：" prop="email">
        <el-input v-model="addForm.email"></el-input>
      </el-form-item>
      <el-form-item label="主要产品：" prop="chanping">
        <el-input v-model="addForm.chanping"></el-input>
      </el-form-item>
      <h3 class="form-title" style="border-top: #dddddd solid 1px; padding: 30px 0 30px 30px; overflow: hidden">生产经营信息</h3>
      <el-form-item label="上缴税金（万元）：" prop="payTaxes">
        <el-input v-model="addForm.payTaxes"></el-input>
      </el-form-item>
      <el-form-item label="R&D经费占主营业务收入比（%）：" prop="scale">
        <el-input v-model="addForm.scale"></el-input>
      </el-form-item>
      <el-form-item label="工业总产值（万元）：" prop="output">
        <el-input v-model="addForm.output"></el-input>
      </el-form-item>
      <el-form-item label="工业增加值（万元）：" prop="zengjiazhi">
        <el-input v-model="addForm.zengjiazhi"></el-input>
      </el-form-item>
      <el-form-item label="综合能耗（吨标煤）：" prop="energyConsumption">
        <el-input v-model="addForm.energyConsumption"></el-input>
      </el-form-item>
      <el-form-item label="从业人员人数（人）：" prop="congyrenshu">
        <el-input v-model="addForm.congyrenshu"></el-input>
      </el-form-item>
      <el-form-item label="利润总额（万元）：" prop="perCapita">
        <el-input v-model="addForm.perCapita"></el-input>
      </el-form-item>
      <el-form-item label="营业收入（万元）：" prop="yinshou">
        <el-input v-model="addForm.yinshou"></el-input>
      </el-form-item>
      <el-form-item label="劳动者报酬总额（万元）：" prop="baochou">
        <el-input v-model="addForm.baochou"></el-input>
      </el-form-item>
      <el-form-item label="工业销售产值（万元）：" prop="chanzhi">
        <el-input v-model="addForm.chanzhi"></el-input>
      </el-form-item>
      <el-form-item label="建筑面积（亩）：" prop="landArea">
        <el-input v-model="addForm.landArea"></el-input>
      </el-form-item>
      <el-form-item label="营业成本（万元）：" prop="chengben">
        <el-input v-model="addForm.chengben"></el-input>
      </el-form-item>
      <el-form-item label="本科以上学历人数（人）：" prop="xuelirenshu">
        <el-input v-model="addForm.xuelirenshu"></el-input>
      </el-form-item>
      <el-form-item label="发明专利授权数（个）：" prop="zhuanli">
        <el-input v-model="addForm.zhuanli"></el-input>
      </el-form-item>
      <el-form-item label="国家级/市级研发中心数（个）：" prop="yanfazhongxin">
        <el-input v-model="addForm.yanfazhongxin"></el-input>
      </el-form-item>
      <el-form-item label="研发人员人数（人）：" prop="yanfarenshu">
        <el-input v-model="addForm.yanfarenshu"></el-input>
      </el-form-item>
    </el-form>
    <div style="width: 100%; text-align: right; padding: 20px 27px 15px; box-sizing: border-box;">
      <el-button type="primary" @click="saveAdd">保存</el-button>
      <el-button type="success" @click="release">上报</el-button>
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
        addForm: {
          status: '0',
          cycle: '年度',
          name: '北京星箭长空测控技术股份有限公司',
          registeredCapital: '3500',
          area: '顺义区',
          park: '顺义马坡聚源工业区',
          industry: '智能装备',
          industryType: '工业',
          industryCode: '102677',
          creditCode: '91110113752642938G',
          zhuceCode: '26587555',
          konggu: '员工持股',
          guimo: '是',
          zizidengji: '是',
          geti: '是',
          openDate: '2012-06-18',
          junming: '是',
          zhucedizhi: '北京市顺义马坡聚源工业区3栋',
          youbian: '100000',
          jingying: '北京市顺义马坡聚源工业区3栋',
          faren: '李海峰',
          zhuceqiye: '北京星箭长空测控技术股份有限公司',
          lianxiren: '李海峰',
          dianhua: '010-8595622',
          fuzeren: '唐翠',
          email: 'xingjian@163.com',
          chanping: 'VR、智能穿戴',
          payTaxes: '3136',
          scale: '4.5',
          output: '120000',
          zengjiazhi: '5600',
          energyConsumption: '0.14',
          congyrenshu: '1200',
          perCapita: '8000',
          yinshou: '26000',
          baochou: '2000',
          chanzhi: '18000',
          landArea: '32',
          chengben: '2000',
          xuelirenshu: '860',
          zhuanli: '1560',
          yanfazhongxin: '26',
          yanfarenshu: '1000'          
        },
        addRules: {
          name: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          registeredCapital: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          area: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          park: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          industry: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          industryType: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          industryCode: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
           creditCode: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          zhuceCode: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          konggu: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          guimo: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          zizidengji: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          geti: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          openDate: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          junming: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          zhucedizhi: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          youbian: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          jingying: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          faren: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          zhuceqiye: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          lianxiren: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          openDate: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          junming: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          zhucedizhi: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          youbian: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          jingying: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          faren: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          zhuceqiye: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          dianhua: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          fuzeren: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          chanping: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          payTaxes: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          scale: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          output: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          zengjiazhi: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          energyConsumption: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          congyrenshu: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          perCapita: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          yinshou: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          baochou: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          chanzhi: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          landArea: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          chengben: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          xuelirenshu: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          zhuanli: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          yanfazhongxin: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ],
          yanfarenshu: [
            { required: true, message: '输入框不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {
      // id作为唯一检索
      this.addForm.id = this.communication.id
      this.getFillin()
    },
    methods: {
      // 拉取保存的数据
      getFillin() {
        const adapter = new LocalStorage('fillin')
        const fillin = low(adapter)
        if (fillin.has('fillinList').value()) {
          const _fillinData = fillin.get('fillinList').value()
          for (let i in _fillinData) {
            if (_fillinData.hasOwnProperty(i)) {
              this.addForm[i] = _fillinData[i]
            }
          }
        }
      },
      // 保存
      saveAdd() {
        this.$refs['addForm'].validate((valid) => {
          if (valid) {
            const adapter = new LocalStorage('fillin')
            const fillin = low(adapter)
            fillin.set('fillinList', this.addForm).write()
            this.$message({
              type: 'success',
              message: '保存成功'
            })     
            this.closeAdd() 
          }
        })
      },
      // 上报
      release() {
        this.addForm.status = '2' // 已报
        this.$refs['addForm'].validate((valid) => {
          if (valid) {
            // 把数据存进上报数据里
            const adapter = new LocalStorage('fillin')
            const fillin = low(adapter)
            fillin.set('fillinList', this.addForm).write()
            // 把需要上报到上级审核的数据提交过去
            const auditData = {
              id: this.addForm.id,
              industry: this.addForm.industry,
              date: this.addForm.openDate,
              guimo: this.addForm.guimo,
              inside: '园区内',
              area: this.addForm.area,
              creditCode: this.addForm.creditCode,
              energyConsumption: this.addForm.energyConsumption,
              isReport: true,
              landArea: this.addForm.landArea,
              name: this.addForm.name,
              output: this.addForm.output,
              park: this.addForm.park,
              payTaxes: this.addForm.payTaxes,
              perCapita: this.addForm.perCapita,
              registeredCapital: this.addForm.registeredCapital,
              scale: this.addForm.scale,
              status: this.addForm.status
            }
            const annualAdapter = new LocalStorage('annual')
            const annual = low(annualAdapter)
            if (annual.has('streetAnnualReportList').value()) {
              const _streetReportList = annual.get('streetAnnualReportList').value()
              let flag = true
              let _needReport = null
              for (const thisReport of _streetReportList) {
                if (+thisReport.id === +auditData.id) {
                  flag = false
                  _needReport = thisReport
                }
              }
              if (!flag) {
                annual.get('streetAnnualReportList').find(_needReport).assign(auditData).write()
              } else {
                annual.get('streetAnnualReportList').push(auditData).write()
              }
            } else {
              annual.set('streetAnnualReportList', [auditData]).write()
            }
            this.$message({
              type: 'success',
              message: '上报成功'
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
  .edit-fillin{    
    padding: 0 0 20px 0;

    .title{
      width: 100%;
      border-bottom: #eeeeee solid 1px;
      box-sizing: border-box;
      margin-bottom: 30px;
      padding: 0 0 20px 40px;
      color: #333333;
      overflow: hidden;
      position: relative;

      .cycle{
        float: left;
      }

      h2{        
        line-height: 40px;
        font-size: 16px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .add-form{
      width: 100%;
      overflow: hidden;
      padding-bottom: 20px;

      .form-title{
        width: 100%;
        color: #333333;
        padding: 0 0 30px 30px;
        float: left;
      }

      .el-form-item{
        width: 33.33%;
        float: left;
        padding: 0 30px;
        box-sizing: border-box;

        .el-form-item__label{
          width: 100% !important;
          text-align: left;
        }

        .el-form-item__content{
          width: 100%;
          margin-left: 0 !important;

          .el-input, .el-select{
            width: 100%;
          }
        }
      }
    }
  }
</style>


