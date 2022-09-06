<template>
  <v-card>
    <h3>
      Table
    </h3>
    {{ selected }}
    <v-sheet outlined class="pa-4">
      <v-data-table dense :headers="[]" :items="[]" />
      <v-data-table
        dense
        :headers="[
          { text: 'col1', value: 'h1ValueKey' },
          { text: 'col2', value: 'h2ValueKey' },
          { text: 'col3', value: 'h3ValueKey' }
        ]"
        :items="[]"
      />
      <v-data-table
        dense
        :headers="[
          { text: 'col1', value: 'h1ValueKey' },
          { text: 'col2', value: 'h2ValueKey' },
          { text: 'col3', value: 'h3ValueKey' },
          { text: 'col4', value: 'h4ValueKey' }
        ]"
        :items="[
          { h1ValueKey: '1', h2ValueKey: 'col1-2', h3ValueKey: 'col1-3', h4ValueKey: 'col1-4' },
          { h1ValueKey: '2', h2ValueKey: 'col2-2', h3ValueKey: 'col2-3', h4ValueKey: 'col2-4' },
          { h1ValueKey: '3', h2ValueKey: 'col3-2', h3ValueKey: 'col3-3', h4ValueKey: 'col3-4' }
        ]"
        item-key="h1ValueKey"
        show-expand
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td class="pa-4 py-6" :colspan="headers.length">
            <span>{{ item }}</span>
          </td>
        </template>
      </v-data-table>
      <v-data-table
        dense
        :headers="[
          { text: 'col1', value: 'h1ValueKey' },
          { text: 'col2', value: 'h2ValueKey' },
          { text: 'col3', value: 'h3ValueKey' },
          { text: 'col4', value: 'h4ValueKey' }
        ]"
        :items="[
          { h1ValueKey: '1', h2ValueKey: 'col1-2', h3ValueKey: 'col1-3', h4ValueKey: 'col1-4' },
          { h1ValueKey: '2', h2ValueKey: 'col2-2', h3ValueKey: 'col2-3', h4ValueKey: 'col2-4' },
          { h1ValueKey: '3', h2ValueKey: 'col3-2', h3ValueKey: 'col3-3', h4ValueKey: 'col3-4' }
        ]"
        show-select
        item-key="h1ValueKey"
        :single-select="singleSelect"
        v-model="selected"
      >
        <template v-slot:top>
          <v-switch v-model="singleSelect" label="Single select" class="pa-3" />
        </template>
        <template v-slot:[`item.h1ValueKey`]="{ item }">
          {{ '1234566' + item.h1ValueKey }}
        </template>
      </v-data-table>

      <div v-for="table of data.content.tables" :key="table.tablesColName">
        <v-data-table
          :headers="getHeaders(table.headers)"
          :items="table.items"
          hide-default-header
          hide-default-footer
        >
          <!-- 客製化 header 無法使用 Vuetify 提供的選項功能 -->
          <template #header>
            <thead>
              <tr v-for="(header, index) of table.headers" :key="index">
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
              <td v-for="o of getItemsKeys(table.headers)" :key="o.value">
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
                  <icon :w="20" :h="20" name="icon_overview" />
                  aaa
                </router-link>
                <label
                  v-else-if="typeof item[o.value] === 'object' && item[o.value].type === 'checkbox'"
                >
                  <input type="checkbox" v-model="selected" :value="item" />
                  aaa
                </label>
              </td>
            </tr>
          </template>
        </v-data-table>
      </div>
    </v-sheet>
  </v-card>
</template>

<script>
export default {
  components: {},
  props: {},

  data() {
    return {
      singleSelect: null,
      selected: [],
      data: {
        status: '200',
        content: {
          title: '管領性報表',
          tablesColNames: ['REB', 'RER'],
          breadcrumb: ['管工', '管表'],
          tables: [
            {
              tablesColName: 'REB',
              headers: [
                [
                  {
                    colspan: 1,
                    headerGroup: '1',
                    seqno: 1,
                    tableSeqno: 1,
                    prName: 'REB',
                    rowspan: 2,
                    text: '業務來源',
                    value: 'aaa',
                    uuid: '1'
                  },
                  {
                    colspan: 2,
                    headerGroup: '1',
                    seqno: 2,
                    tableSeqno: 1,
                    prName: 'REB',
                    rowspan: 1,
                    text: '核保',
                    value: '',
                    uuid: '2'
                  },
                  {
                    colspan: 1,
                    headerGroup: '1',
                    seqno: 3,
                    tableSeqno: 1,
                    prName: 'REB',
                    rowspan: 2,
                    text: '會辦',
                    value: 'ccc',
                    uuid: '4ˋ'
                  }
                ],
                [
                  {
                    colspan: 1,
                    headerGroup: '2',
                    seqno: 1,
                    tableSeqno: 1,
                    prName: 'REB',
                    rowspan: 1,
                    text: '已處理',
                    value: 'ddd',
                    uuid: '5'
                  },
                  {
                    colspan: 1,
                    headerGroup: '2',
                    seqno: 2,
                    tableSeqno: 1,
                    prName: 'REB',
                    rowspan: 1,
                    text: '待處理回覆2',
                    value: 'eee',
                    uuid: '6'
                  }
                ]
              ],

              items: [
                {
                  aaa: { type: 'button', text: 'aaa' },
                  bbb: 'bbb',
                  ccc: 'ccc',
                  ddd: 'ddd',
                  eee: 'eee'
                },
                {
                  aaa: { type: 'link', text: '###' },
                  bbb: 'bbb',
                  ccc: 'ccc',
                  ddd: 'ddd',
                  eee: 'eee'
                },
                {
                  aaa: { type: 'checkbox', text: 'aaa' },
                  bbb: 'bbb',
                  ccc: 'ccc',
                  ddd: 'ddd',
                  eee: 'eee'
                },
                {
                  aaa: 'aaa',
                  bbb: 'bbb',
                  ccc: 'ccc',
                  ddd: 'ddd',
                  eee: { type: 'checkbox', text: '123' }
                }
              ]
            },
            {
              tablesColName: 'RER',
              headers: [
                [
                  {
                    colspan: 1,
                    headerGroup: '1',
                    seqno: 1,
                    tableSeqno: 1,
                    prName: 'REB',
                    rowspan: 2,
                    text: '業務來源',
                    value: 'busS',
                    uuid: '1'
                  },
                  {
                    colspan: 2,
                    headerGroup: '1',
                    seqno: 2,
                    tableSeqno: 1,
                    prName: 'REB',
                    rowspan: 1,
                    text: '核保',
                    value: '',
                    uuid: '2'
                  },
                  {
                    colspan: 1,
                    headerGroup: '1',
                    seqno: 3,
                    tableSeqno: 1,
                    prName: 'REB',
                    rowspan: 2,
                    text: '會辦',
                    value: '',
                    uuid: '4ˋ'
                  }
                ],
                [
                  {
                    colspan: 1,
                    headerGroup: '2',
                    seqno: 1,
                    tableSeqno: 1,
                    prName: 'REB',
                    rowspan: 1,
                    text: '已處理',
                    value: 'underWriting',
                    uuid: '5'
                  },
                  {
                    colspan: 1,
                    headerGroup: '2',
                    seqno: 2,
                    tableSeqno: 1,
                    prName: 'REB',
                    rowspan: 1,
                    text: '待處理回覆2',
                    value: 'underWriting',
                    uuid: '6'
                  }
                ]
              ],

              items: []
            }
          ]
        }
      }
    }
  },

  async mounted() {},

  destroyed() {},

  methods: {
    getHeaders(headers) {
      const newHeaders = headers.reduce((r, header) => {
        const newHeader = header
          .map(o => {
            const { text, value } = o
            return { text, value }
          })
          .filter(o => {
            return o.value !== ''
          })

        return r.concat(newHeader)
      }, [])
      return newHeaders
    },

    getItemsKeys(arr) {
      const newArr = arr.reduce((r, headers) => {
        const values = headers
          .filter(o => {
            return o.value !== ''
          })
          .map(o => {
            return o
          })
        return r.concat(values)
      }, [])
      return newArr
    }
  },

  computed: {}
}
</script>

<style lang="scss" scoped>
.border {
  th {
    border: 1px solid black;
    border-bottom: 1px solid black;
  }
}
</style>
