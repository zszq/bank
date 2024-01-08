<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getColor, formatNumberWithCommas } from '@/utils/utils.js'
import { dashboard_balance } from "@/utils/config";

const tableData = ref([])

onMounted(() => {
  getData()
})

async function getData() {
  let url = new URL('/src/assets/data/table.json', import.meta.url).href
  let res = await fetch(url)
  let data = await res.json()
  console.log('Banking', data)
  tableData.value = data.data
}

function downloadFile() {
  const a = document.createElement('a')
  a.style.display = 'none'
  // a.download = 'download.pdf'
  a.href = new URL('/src/assets/data/download.pdf', import.meta.url).href
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
</script>

<template>
  <div class="banking">
    <aside class="left">
      <div class="bank">
        <div class="banking"><img src="@/assets/images/deposit.svg" alt="" /></div>
        <span class="title">Banking</span>
      </div>
      <div class="list">
        <div class="list-item active">
          <img src="@/assets/images/deposit.svg" alt="" />
          <span>Account (USD)</span>
        </div>
        <div class="list-item">
          <img src="@/assets/images/transfer.svg" alt="" style="width: 35px; height: 35px; margin-left: -3px" />
          <span>FVNet Payment</span>
        </div>
        <div class="list-item">
          <img src="@/assets/images/transfer.svg" alt="" style="width: 35px; height: 35px; margin-left: -3px" />
          <span>Transfer</span>
        </div>
        <div class="list-item">
          <img src="@/assets/images/Payment.svg" alt="" />
          <span>Payment authorizations</span>
        </div>
      </div>
    </aside>
    <div class="right">
      <div class="base">
        <div class="operation">
          <div>Account (USD)</div>
          <div class="filter-down">
            <div class="filter"><img src="@/assets/images/filter.png" alt="" />Show filters</div>
            <div class="download" @click="downloadFile"><img src="@/assets/images/download.png" alt="" /> Download</div>
          </div>
        </div>
        <div class="print">
          <div class="printer"><img src="@/assets/images/printer.svg" alt="" /> Print transactions</div>
          <div class="deposit"><img src="@/assets/images/deposit.svg" alt="" />USDC Deposit Assress</div>
        </div>
        <div class="balance">
          Balance <span :style="{ color: getColor(dashboard_balance), marginLeft: '50px' }">$ {{ formatNumberWithCommas('' + dashboard_balance) }}</span>
        </div>
      </div>
      <div class="table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column width="40">
            <img src="@/assets/images/briefcase.svg" alt="" style="width: 30px; height: 30px; padding: 13px 0 10px" />
          </el-table-column>
          <el-table-column prop="date" label="Posted Date" width="150" />
          <el-table-column prop="flow" label="From/To" width="190" />
          <el-table-column prop="description" label="Description">
            <template #default="scope">
              <div style="white-space: break-spaces">{{ scope.row.description }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="deposit" label="Amount" align="right" width="180">
            <template #default="scope">
              <span :style="{ color: getColor(scope.row.Amount) }">$ {{ scope.row.Amount }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.banking {
  display: grid;
  grid-template-columns: 300px 1fr;
  column-gap: 30px;
  .left {
    height: 400px;
    background-color: #fff;
    box-shadow: var(--el-box-shadow-lighter);
    .bank {
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      padding: 20px;
      border-bottom: 1px solid #eee;
      .banking {
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
        .title {
          font-weight: 600;
        }
      }
    }
    .list {
      .list-item {
        padding: 10px 20px;
        display: flex;
        align-items: center;
        word-break: break-all;
        img {
          width: 30px;
          height: 30px;
          margin-right: 10px;
        }
        &:hover {
          cursor: pointer;
          color: #0278ae;
        }
        &.active {
          color: #0278ae;
        }
      }
    }
  }
  .right {
    .base {
      background-color: #fff;
      margin-bottom: 30px;
      box-shadow: var(--el-box-shadow-lighter);
      .operation {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        border-bottom: 1px solid #eee;
        .filter-down {
          display: flex;
          align-items: center;
          .filter {
            display: flex;
            align-items: center;
            &:hover {
              cursor: pointer;
              color: #0278ae;
            }
            img {
              width: 20px;
              height: 20px;
              margin-right: 5px;
            }
          }
          .download {
            margin-left: 20px;
            @extend .filter;
          }
        }
      }
      .print {
        display: flex;
        align-items: center;
        padding: 16px;
        border-bottom: 1px solid #eee;
        .printer {
          display: flex;
          align-items: center;
          margin-right: 50px;
          img {
            width: 30px;
            height: 30px;
            margin-right: 5px;
          }
        }
        .deposit {
          @extend .printer;
        }
      }
      .balance {
        font-size: 16px;
        font-weight: 600;
        padding: 16px;
        border-bottom: 1px solid #eee;
      }
    }
    .table {
      background-color: #fff;
      box-shadow: var(--el-box-shadow-lighter);
    }
  }
}
</style>
