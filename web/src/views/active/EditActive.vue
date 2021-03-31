<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <a-button @click="$router.go(-1)" type="dashed"><a-icon type="left" />返回</a-button>
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item ref="theme" label="活动主题" prop="theme">
          <a-input v-model="form.theme" />
        </a-form-model-item>
        <a-form-model-item label="活动分类" prop="classify">
          <a-select v-model="form.classify" placeholder="请选择活动分类">
            <a-select-option v-for="(item, index) of classifyOptions" :key="index" :value="item.name">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item ref="purpose" label="活动目的" prop="purpose">
          <a-input v-model="form.purpose" />
        </a-form-model-item>
        <a-form-model-item ref="people" label="活动对象" prop="people">
          <a-input v-model="form.people" />
        </a-form-model-item>
        <a-form-model-item ref="location" label="活动地点" prop="location">
          <a-input v-model="form.location" />
        </a-form-model-item>
        <a-form-model-item ref="time" label="活动时间" prop="time">
          <a-date-picker style="width: 100%" v-model="form.time" :format="dateFormat" />
        </a-form-model-item>
        <a-form-model-item label="文章内容" prop="content">
          <!--          <wang-editor :value="form.content" @change="getContent"></wang-editor>-->
          <quill-editor :value="form.content" @change="getContent"></quill-editor>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">
            提交
          </a-button>
          <a-button style="margin-left: 10px;" @click="resetForm">
            重置
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import WangEditor from '@/components/Editor/WangEditor'
  import QuillEditor from '@/components/Editor/QuillEditor'
  import { fetchActiveClassify, fetchActiveDetail, fetchEditActive } from '@/api/active'
  import moment from 'moment'
  export default {
    name: 'EditArticle',
    components: { WangEditor, QuillEditor },
    data () {
      return {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
        classifyOptions: [],
        loading: false,
        form: {},
        moment,
        dateFormat: 'YYYY-MM-DD',
        rules: {
          theme: [{ required: true, message: '请输入活动主题', trigger: 'blur' }],
          classify: [{ required: true, message: '请选择活动类型', trigger: 'change' }],
          purpose: [{ required: true, message: '请输入活动目的', trigger: 'blur' }],
          content: [{ required: true, message: '请输入活动内容', trigger: 'blur' }],
          people: [{ required: true, message: '请输入活动对象', trigger: 'blur' }],
          location: [{ required: true, message: '请输入活动目的地', trigger: 'blur' }],
          time: [{ required: true, message: '请输入活动时间', trigger: 'blur' }]
        }
      }
    },
    created () {
      this.getClassify()
      this.getArticleDetail()
    },
    methods: {
      // 获取表单信息回显数据
      async getArticleDetail () {
        const res = await fetchActiveDetail({ id: this.$route.params.id })
        this.form = res.result
      },
      getContent (val) {
        this.form.content = val
      },
      async getClassify () {
        const res = await fetchActiveClassify()
        this.classifyOptions = res.result.classify
      },
       onSubmit () {
        this.$refs.ruleForm.validate(async valid => {
          if (valid) {
            this.form.time = moment(this.form.time).format('YYYY-MM-DD')
            await fetchEditActive(this.form)
            this.$message.success('编辑活动成功')
            await this.$router.push('/active/list')
            this.form = {}
          } else {
            this.$message.error('编辑帖子失败')
            return false
          }
        })
      },
      resetForm () {
        this.$refs.ruleForm.resetFields()
      }
    }
  }
</script>

<style scoped>
  .avatar-uploader >>> .ant-upload {
    width: 341px;
    height: 170px;
  }
  .ant-upload.ant-upload-select-picture-card {
    width: 341px;
    height: 170px;
  }
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
