<template>
  <div>
    <a-card :bordered="false">
      <a-button type="dashed" @click="$router.go(-1)"><a-icon type="left" />返回上一页</a-button>
      <h2 style="margin-bottom: 30px;text-align: center">{{ detail.title }}</h2>
      <div class="flex justify-between" style="margin-bottom: 30px">
        <div class="text-primary">{{ detail.create_by }}</div>
        <div>{{ moment(detail.time).format('YYYY-MM-DD hh:mm:ss') }}</div>
      </div>
      <div v-html="detail.content"></div>
    </a-card>
  </div>
</template>

<script>
  import { fetchForumDetail } from '@/api/forum'
  import moment from 'moment'

  export default {
    name: 'NewsDetail',
    data () {
      return {
        detail: {},
        moment
      }
    },
    created () {
      this.getDetail()
    },
    methods: {
      async getDetail () {
        const res = await fetchForumDetail({ id: this.$route.params.id })
        this.detail = res.result
      }
    }

  }
</script>

<style scoped>

</style>
