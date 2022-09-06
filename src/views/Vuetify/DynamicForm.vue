<template>
  <div id="root">
    <div id="query">
      <v-card outlined>
        <v-card-text>
          <v-row>
            <v-col cols="8" sm="4" md="3" lg="2" xl="2">
              <input type="text" />
            </v-col>
            <v-col cols="4" sm="1">
              <v-btn>
                查詢
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
    <v-card outlined class="mt-3">
      <v-card-text>
        <v-data-table :headers="headers" :items="tableData" :items-per-page="10" dense>
          <template slot="no-data">
            查無資料
          </template>
          <template v-slot:[`header.action`]="{ header }">
            <v-btn @click="openDialogAdd">{{ header.text }}</v-btn>
          </template>
          <template v-slot:item="{ item }">
            <v-btn @click="openDialogEdit(item)">修改</v-btn>
            <v-btn @click="deleteItem(item)">刪除</v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <Dialog
      :dialogIsOpened.sync="dialogIsOpened"
      :isValid="isValid"
      @modify="modify"
      @closeDialog="dialogData = {}"
    >
      <template v-slot:form>
        <FormGroup v-model="dialogData" :isValid="isValid" />
      </template>
    </Dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      headers: [
        { text: '新增', value: 'action', width: '77px' },
        { text: 'aaa', value: 'aaa', width: '77px' }
      ],

      tableData: [{ action: '' }],
      dialogIsOpened: false,
      dialogData: { w: 123, h: 456 },

      isValid: false
    }
  },

  mounted() {},
  methods: {
    showDialog() {
      this.dialogIsOpened = true
    },

    openDialogEdit(item) {
      console.log(item)
      this.showDialog()
    },

    openDialogAdd(item) {
      console.log(item)
      this.showDialog()
    },

    async deleteItem(item) {
      const result = await this.question('請確認是否刪除？', {
        showCancelButton: true
      })
      if (result.value) {
        console.log(item)
      }
    },

    modify() {}
  }
}
</script>
