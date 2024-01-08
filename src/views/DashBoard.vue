<script setup lang="ts">
import { onMounted, ref } from 'vue'
import LineChart from './components/lineChart.vue'
import { getColor, formatNumberWithCommas } from '@/utils/utils.js'
import { banking_balance } from "@/utils/config";

const list = [
  { icon: new URL('/src/assets/images/transfer.svg', import.meta.url).href, name: 'FVNet Payment' },
  { icon: new URL('/src/assets/images/transfer.svg', import.meta.url).href, name: 'Transfer' }
]

let tableData = ref([])

async function getData() {
  let url = new URL('/src/assets/data/table.json', import.meta.url).href
  let res = await fetch(url)
  let data = await res.json()
  console.log('DashBoard', data)
  tableData.value = data.data.slice(0, 3)
  console.log(tableData.value)
}

onMounted(() => {
  getData()
})
</script>

<template>
  <div class="dashboard">
    <div class="card">
      <div class="title">Quike access</div>
      <div class="content">
        <div class="list">
          <div class="item" v-for="(item, index) in list" :key="index">
            <div class="picture"><img :src="item.icon" alt="" /></div>
            <span class="item-title">{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="title">Account status</div>
      <div class="content">
        <div class="balance">
          Balance <span :style="{ color: getColor(banking_balance), marginLeft: '15px' }">$ {{ formatNumberWithCommas('' + banking_balance) }}</span>
        </div>
        <LineChart style="width: 100%; height: 200px" />
        <div>
          <div class="title recent">Recent Transactions</div>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="Date" />
            <el-table-column prop="name" label="Name" />
            <el-table-column prop="withdrawal" label="Amount" align="right" width="180">
              <template #default="scope">
                <span :style="{ color: getColor(scope.row.Amount) }">$ {{ scope.row.Amount }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 30px;
  .card {
    min-height: 500px;
    background-color: #fff;
    box-shadow: var(--el-box-shadow-lighter);
    .title {
      padding: 20px;
      font-size: 18px;
      font-weight: 600;
      border-bottom: 1px solid #eee;
    }
    .content {
      padding: 20px;
      .balance {
        text-align: center;
        font-size: 18px;
        font-weight: 600;
      }
      .list {
        display: flex;
        flex-wrap: wrap;
        .item {
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          margin: 20px;
          &:hover {
            cursor: pointer;
          }
          .picture {
            width: 80px;
            height: 80px;
            background-color: #f5f7f6;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 15px;
            border-radius: 50%;
            img {
              width: 50px;
              height: 50px;
            }
            .item-title {
              font-weight: 600;
            }
          }
        }
      }
      :deep(.el-table__header-wrapper) {
        display: none;
      }
      .recent {
        padding: 20px 0;
      }
    }
  }
}
</style>
