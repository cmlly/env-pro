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
        <a-form-model-item ref="title" label="文章标题" prop="title">
          <a-input
            v-model="form.title"
            @blur="
              () => {
                $refs.title.onFieldBlur();
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item label="文章分类" prop="classify">
          <a-select v-model="form.classify" placeholder="请选择文章分类">
            <a-select-option v-for="(item, index) of classifyOptions" :key="index" :value="item.name">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item ref="description" label="文章摘要" prop="description">
          <a-input
            v-model="form.description"
            @blur="
              () => {
                $refs.description.onFieldBlur();
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item ref="createBy" label="发帖人" prop="createBy">
          <a-input
            v-model="form.createBy"
            @blur="
              () => {
                $refs.createBy.onFieldBlur();
              }
            "
          />
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
  import { fetchEditForum, fetchForumClassify, fetchForumDetail } from '@/api/forum'
  export default {
    name: 'EditArticle',
    components: { WangEditor, QuillEditor },
    data () {
      return {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
        classifyOptions: [],
        loading: false,
        form: {
          title: '',
          classify: '',
          description: '',
          content: '',
          createBy: ''
        },
        rules: {
          title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
          classify: [{ required: true, message: '请选择文章类型', trigger: 'change' }],
          description: [{ required: true, message: '请输入文章摘要', trigger: 'blur' }],
          content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }],
          createBy: [{ required: true, message: '请输入发帖人姓名', trigger: 'blur' }]
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
        const res = await fetchForumDetail({ id: this.$route.params.id })
        this.form = res.result
        this.form.createBy = res.result.create_by
      },
      getContent (val) {
        this.form.content = val
      },
      async getClassify () {
        const res = await fetchForumClassify()
        this.classifyOptions = res.result.classify
      },
       onSubmit () {
        this.$refs.ruleForm.validate(async valid => {
          if (valid) {
            await fetchEditForum(this.form)
            this.$message.success('编辑帖子成功')
            await this.$router.push('/forum/list')
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
