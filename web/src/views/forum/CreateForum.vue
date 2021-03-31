<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item ref="title" label="帖子标题" prop="title">
          <a-input
            v-model="form.title"
            @blur="
              () => {
                $refs.title.onFieldBlur();
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item label="帖子分类" prop="classify">
          <a-select v-model="form.classify" placeholder="请选择帖子分类">
            <a-select-option v-for="(item, index) of classifyOptions" :key="index" :value="item.name">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item ref="description" label="帖子摘要" prop="description">
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
        <a-form-model-item label="帖子内容" prop="content">
          <wang-editor :value="form.content" @change="getContent"></wang-editor>
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
  import { fetchCreateForum, fetchForumClassify } from '@/api/forum'
  export default {
    name: 'CreateArticle',
    components: { WangEditor },
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
          title: [{ required: true, message: '请输入帖子标题', trigger: 'blur' }],
          classify: [{ required: true, message: '请选择帖子类型', trigger: 'change' }],
          description: [{ required: true, message: '请输入帖子摘要', trigger: 'blur' }],
          content: [{ required: true, message: '请输入帖子内容', trigger: 'blur' }],
          createBy: [{ required: true, message: '请输入发帖人姓名', trigger: 'blur' }]
        }
      }
    },
    created () {
      this.getClassify()
    },
    methods: {
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
            await fetchCreateForum(this.form)
            this.$message.success('新增成功')
            await this.$router.push('/forum/list')
            this.form = {}
          } else {
            this.$message.error('新增失败')
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
