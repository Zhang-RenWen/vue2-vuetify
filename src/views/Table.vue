<template>
  <v-card>
    <h3>Table</h3>
    {{ selected }}
    <v-sheet outlined class="pa-4">
      <v-data-table
        class="data-table"
        dense
        :headers="data_empty.headers"
        :items="data_empty.empty"
      />
      <v-data-table
        dense
        class="data-table"
        :headers="data_normal.headers"
        :items="data_normal.items"
      />
      <v-data-table
        dense
        class="data-table"
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
        class="data-table"
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
        class="data-table"
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

      <!-- client-sort -->
      <v-data-table
        class="data-table"
        dense
        :headers="data_empty.headers"
        :items="data_empty.empty"
        :expanded="items"
        disable-pagination
        :sort-desc.sync="options.sortDesc"
        :sort-by.sync="options.sortBy"
        hide-default-footer
      />

      <!-- server-sort -->
      <TablePagination v-model="options" :total-count="totalCount" />
      <v-data-table
        v-sticky="65"
        v-fixed-table-column="3"
        class="data-table"
        dense
        :headers="data_empty.headers"
        :items="data_empty.empty"
        hide-default-footer
        :items-per-page="options.itemPerPage"
        :server-items-length="totalCount"
        :sort-desc.sync="options.sortDesc"
        :sort-by.sync="options.sortBy"
        :footer-props="{
          'items-per-page-option': [options.itemPerPage]
        }"
        @page-count="pageCount = $event"
      />
    </v-sheet>
  </v-card>
</template>

<script>
import { data_empty, data_normal, data_expanded, data_select, data_RER } from './table/tableData'
import { FixedTableColumn } from '@/directives/fixedTableColumn'
export default {
  components: {},
  directives: {
    FixedTableColumn
  },

  props: {},

  data() {
    return {
      singleSelect: null,
      selected: [],
      data_empty,
      data_normal,
      data_expanded,
      data_select,
      data_RER,
      items: [],
      options: {},
      totalCount: 0, // 值從 server 回傳做 server-sort, 且避免 client-sort 被觸發
      pageCount: null
    }
  },

  computed: {},

  async mounted() {},

  destroyed() {},

  methods: {
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
    }
  }
}
</script>

<style lang="scss">
/* stylelint-disable */
.data-table {
  margin-bottom: 30px;
  .v-data-table__wrapper > table th,
  .v-data-table__wrapper > table td {
    border: 1px solid black;
  }
}
</style>
