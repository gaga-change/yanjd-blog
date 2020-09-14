<template>
  <div>
    <ul>
      <button :disabled="currentPage === 1" @click="changeCurrent(currentPage - 1)">
        prev
      </button>
      <li v-for="item in btns" :key="item.num">
        <button @click="changeCurrent(item.num)">
          {{ item.num }} {{ item.current }}
        </button>
      </li>
      <button :disabled="currentPage === pages" @click="changeCurrent(currentPage + 1)">
        next
      </button>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      currentPage: 1,
      total: 100,
      limit: 10
    }
  },
  computed: {
    pages () {
      return Math.ceil(this.total / this.limit) || 1
    },
    btns () {
      const currentPage = this.currentPage
      const pages = this.pages
      const btns = []
      if (pages <= 5) {
        for (let i = 0; i < pages; i++) {
          btns.push({ num: i + 1, current: (i + 1) === currentPage })
        }
      } else {
        btns.push({ num: currentPage, current: true })
        let rigthBtnNum, leftBtnNum
        if (currentPage - 1 < 2) {
          leftBtnNum = currentPage - 1
          rigthBtnNum = 4 - leftBtnNum
        } else if (pages - currentPage < 2) {
          rigthBtnNum = pages - currentPage
          leftBtnNum = 4 - rigthBtnNum
        } else {
          rigthBtnNum = 2
          leftBtnNum = 2
        }
        for (let i = 0; i < leftBtnNum; i++) {
          btns.unshift({ num: currentPage - i - 1 })
        }
        for (let i = 0; i < rigthBtnNum; i++) {
          btns.push({ num: currentPage + i + 1 })
        }
      }
      return btns
    }
  },
  methods: {
    changeCurrent (current) {
      this.currentPage = current
    }
  }
}
</script>
