<template>
  <v-card class="pa-2">
    <h3>Table</h3>
    <v-sheet outlined class="pa-4">
      <!-- server-sort -->
      <v-data-table
        ref="tableForm"
        :key="anIncreasingNumber"
        v-fixed-table-column="3"
        v-columns-resizable="{ onEnd: endResize }"
        v-sortable-table="{ onEnd: sortTheHeadersAndUpdateTheKey }"
        fixed-header
        :height="300"
        class="custom-table light-table mb-3"
        dense
        :headers="tempHeaders"
        :items="actionItems"
        hide-default-footer
        :items-per-page="options.itemPerPage"
        :server-items-length="totalCount"
        :sort-desc.sync="options.sortDesc"
        :sort-by.sync="options.sortBy"
        :footer-props="{
          'items-per-page-option': [options.itemPerPage]
        }"
        :custom-filter="customSearch"
        :search="condition"
        @page-count="pageCount = $event"
      >
        <template #[`header.action`]>
          <v-btn
            class="pa-0 v-btn--is-elevated v-btn--has-bg v-btn--round theme--light"
            icon
            x-small
            color="success"
          >
            <!-- <i class="fas fa-university" /> -->
            <i class="fas fa-plus" />
          </v-btn>
        </template>
        <template #[`item.index`]="{ index }">
          {{ index + 1 }}
        </template>
        <template #[`item.action`]="{ item }">
          <v-btn
            class="pa-0 v-btn--is-elevated v-btn--has-bg v-btn--round theme--light"
            icon
            x-small
            color="success"
            @click="
              (e) => {
                addItem(item, e)
              }
            "
          >
            <!-- <i class="fas fa-university" /> -->
            <i class="fas fa-trash-alt" />
          </v-btn>
        </template>
      </v-data-table>
      <TablePagination v-model="options" :total-count="totalCount" />

      <v-data-table
        dense
        class="custom-table light-table mb-3"
        :headers="data_expanded.headers"
        :items="data_expanded.items"
        item-key="h1ValueKey"
        show-expand
      >
        <template #expanded-item="{ headers, item }">
          <td class="pa-4 py-6" :colspan="headers.length">
            <span>{{ item }}</span>
          </td>
        </template>
      </v-data-table>
      <v-data-table
        v-model="selected"
        class="custom-table light-table mb-3"
        dense
        :headers="data_select.headers"
        :items="data_select.items"
        show-select
        item-key="h1ValueKey"
        :single-select="singleSelect"
      >
        <template #top>
          <v-switch v-model="singleSelect" label="Single select" class="pa-3" />
        </template>
        <template #[`item.h1ValueKey`]="{ item }">
          {{ '1234566' + item.h1ValueKey }}
        </template>
      </v-data-table>

      <v-data-table
        class="custom-table light-table mb-3"
        :headers="getHeaders(data_RER.headers)"
        :items="data_RER.items"
        hide-default-header
        hide-default-footer
      >
        <!-- 客製化 header 無法使用 Vuetify 提供的選項功能 -->
        <template #header>
          <thead>
            <tr v-for="(header, index) of data_RER.headers" :key="index">
              <th
                v-for="(headerCol, colIndex) of header"
                :key="colIndex"
                :rowspan="headerCol.rowspan"
                :colspan="headerCol.colspan"
              >
                {{ headerCol.text }}
              </th>
            </tr>
          </thead>
        </template>
        <template #item="{ item }">
          <tr>
            <td v-for="o of getItemsKeys(data_RER.headers)" :key="o.value">
              <div v-if="typeof item[o.value] === 'string'">{{ item[o.value] }}</div>
              <v-btn
                v-else-if="typeof item[o.value] === 'object' && item[o.value].type === 'button'"
              >
                {{ item[o.value].text }}
              </v-btn>
              <router-link
                v-else-if="typeof item[o.value] === 'object' && item[o.value].type === 'link'"
                to="#"
              >
                <Icon :w="20" :h="20" name="icon_overview" />
                aaa
              </router-link>
              <label
                v-else-if="typeof item[o.value] === 'object' && item[o.value].type === 'checkbox'"
              >
                <input v-model="selected" type="checkbox" :value="item" />
                aaa
              </label>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-sheet>
  </v-card>
</template>

<script>
import { data_expanded, data_select, data_RER } from './table/tableData'
import { FixedTableColumn } from '@/directives/fixedTableColumn'
import Sortable from 'sortablejs'
export default {
  components: {},

  directives: {
    FixedTableColumn,
    'sortable-table': {
      inserted(el, binding) {
        el.querySelectorAll('th').forEach((draggableEl) => {
          const span = draggableEl.querySelector('span')
          if (span) {
            span.classList.add('sortHandle')
          }
        })
        Sortable.create(
          el.querySelector('tr'),
          binding.value ? { ...binding.value, handle: '.sortable' } : {}
        )
      }
    }
  },

  props: {},

  data() {
    return {
      singleSelect: null,
      selected: [],
      data_expanded,
      data_select,
      data_RER,
      options: {
        sortBy: 'amount',
        sortDesc: [false],
        itemPerPage: 10
      },

      totalCount: 10, // 值從 server 回傳做 server-sort, 且避免 client-sort 被觸發
      pageCount: null,
      tempHeaders: [
        { text: '序號', align: 'center', width: '80px', sortable: false, value: 'index' },
        { text: '操作', align: 'center', width: '80px', sortable: false, value: 'action' },
        { text: '代碼', align: 'center', width: '100px', sortable: true, value: 'code' },
        { text: '描述', align: 'center', width: '100px', sortable: true, value: 'text' },
        { text: '數值', align: 'center', width: '100px', sortable: true, value: 'amount' },
        { text: '名字', align: 'center', width: '100px', sortable: true, value: 'name' },
        { text: '備註', align: 'center', width: '500px', sortable: true, value: 'notes' }
      ],

      actionItems: [
        {
          action: '',
          code: 'C',
          text: '項目C',
          amount: 10000,
          name: '',
          notes: ''
        },
        {
          action: '',
          code: 'A',
          text: '項目A',
          amount: 10000,
          name: '',
          notes: ''
        },
        { action: '', code: 'C', text: '項目C2', amount: 10000, name: '', notes: '' },
        { action: '', code: 'C', text: '項目C2', amount: 10000, name: '', notes: '' },
        { action: '', code: 'C', text: '項目C2', amount: 10000, name: '', notes: '' },
        { action: '', code: 'C', text: '項目C2', amount: 11, name: '', notes: '' },
        { action: '', code: 'C', text: '項目C2', amount: 50, name: '', notes: '' },
        { action: '', code: 'C', text: '項目C2', amount: 10000, name: '', notes: '' },
        { action: '', code: 'C', text: '項目C2', amount: 10000, name: '', notes: '' },
        { action: '', code: 'C', text: '項目C2', amount: 10000, name: '', notes: '' },
        { action: '', code: 'C', text: '項目C2', amount: 10000, name: '', notes: '' },
        { action: '', code: 'C', text: '項目C2', amount: 10000, name: '', notes: '' },
        { action: '', code: 'C', text: '項目C2', amount: 10000, name: '', notes: '' }
      ],

      anIncreasingNumber: 1
    }
  },

  computed: {
    condition() {
      return 'A'
    }
  },

  async mounted() {},

  destroyed() {},

  methods: {
    customSearch(value, query, item) {
      return ['C'].includes(item.code) && query === this.condition
    },

    getHeaders(headers) {
      const newHeaders = headers.reduce((r, header) => {
        const newHeader = header
          .map((o) => {
            const { text, value } = o
            return { text, value }
          })
          .filter((o) => {
            return o.value !== ''
          })

        return r.concat(newHeader)
      }, [])
      return newHeaders
    },

    getItemsKeys(arr) {
      const newArr = arr.reduce((r, headers) => {
        const values = headers
          .filter((o) => {
            return o.value !== ''
          })
          .map((o) => {
            return o
          })
        return r.concat(values)
      }, [])
      return newArr
    },

    addItem(item) {
      console.log(item)
    },

    endResize() {
      this.$refs['tableForm'].$el.querySelectorAll('th').forEach((draggableEl, index) => {
        const width = draggableEl.getBoundingClientRect().width
        if (width) {
          this.tempHeaders[index].width = width
        }
      })
    },

    sortTheHeadersAndUpdateTheKey(evt) {
      const tempHeaders = this.tempHeaders
      const oldIndex = evt.oldIndex
      const newIndex = evt.newIndex
      if (newIndex >= tempHeaders.length) {
        let k = newIndex - tempHeaders.length + 1
        while (k == k - 1) {
          tempHeaders.push(undefined)
        }
      }
      tempHeaders.splice(newIndex, 0, tempHeaders.splice(oldIndex, 1)[0])
      this.tempHeaders = tempHeaders
      this.anIncreasingNumber = this.anIncreasingNumber + 1
    }
  }
}
</script>

<style lang="scss"></style>
