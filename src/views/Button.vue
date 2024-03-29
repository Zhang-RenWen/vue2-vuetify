<template>
  <v-container>
    <v-card class="mb-10">
      <v-card-title>
        <h2>
          AnchorPointButton
          <span id="AnchorPointButton" />
        </h2>
      </v-card-title>
      <v-divider />
      <v-card-text class="pa-2">
        <AnchorPointButton
          v-sticky="{ top: dialBtnOffsetTop }"
          :item-list="anchorPointButtonList"
          @onDial="onDial"
        />

        <v-card-text id="sticky-wrap" sticky-container>
          <v-card id="scroll-card" class="panel-wrapper">
            <div class="sticky-wrapper">
              <AnchorPointButton :item-list="anchorPointButtonList" @onDial="onDial" />
            </div>
          </v-card>
        </v-card-text>
      </v-card-text>
    </v-card>
    <v-card class="mb-10">
      <v-card-title>
        <h2>
          Ripple
          <span id="Ripple" />
        </h2>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row class="py-12" justify="space-around">
          <v-btn color="primary">With ripple (default)</v-btn>
          <v-btn :ripple="false" color="primary">Without ripple</v-btn>
          <v-btn :ripple="{ center: true }" color="primary">With centered ripple</v-btn>
          <v-btn :ripple="{ class: 'red--text' }" text>
            With red ripple
            <v-icon class="ml-3">fas fa-search</v-icon>
          </v-btn>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card ref="Block" class="mb-10">
      <v-card-title><h2>Block</h2></v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-col>
            <div class="mb-2">Without block (default)</div>

            <v-btn class="mr-2"><v-icon>fas fa-search</v-icon></v-btn>
            <v-btn><v-icon>fas fa-search</v-icon></v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="mb-2">With block (default)</div>
            <v-btn block class="mb-2"><v-icon>fas fa-search</v-icon></v-btn>
            <v-btn block><v-icon>fas fa-search</v-icon></v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="mb-10">
      <v-card-title><h2>Colors</h2></v-card-title>
      <v-divider />
      <v-card-text class="d-flex align-content-start flex-wrap">
        <div class="mb-1">Light</div>
        <v-btn
          v-for="(color, key) of themes.light"
          :key="`Light${key}`"
          :color="key"
          block
          class="mb-1"
        >
          {{ key }}
        </v-btn>
      </v-card-text>

      <v-card-text class="d-flex align-content-start flex-wrap">
        <div class="mb-1">Dark</div>
        <v-btn
          v-for="(color, key) of themes.dark"
          :key="`Dark${key}`"
          :color="key"
          block
          class="mb-1"
        >
          {{ key }}
        </v-btn>
      </v-card-text>
    </v-card>

    <v-card class="mb-10">
      <v-card-title><h2>Size</h2></v-card-title>
      <v-divider />
      <v-card-text>
        <v-row justify="space-around" class="my-2">
          <v-btn x-small>x-small</v-btn>
          <v-btn small>small</v-btn>
          <v-btn>default</v-btn>
          <v-btn x-large>x-large</v-btn>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="mb-10">
      <v-card-title><h2>Outlined</h2></v-card-title>
      <v-divider />
      <v-card-text>
        <v-row justify="space-around" class="my-2">
          <v-btn x-small outlined>x-small</v-btn>
          <v-btn small outlined>small</v-btn>
          <v-btn outlined>default</v-btn>
          <v-btn x-large outlined>x-large</v-btn>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="mb-10">
      <v-card-title><h2>Disabled</h2></v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-col>
            disabled
            <v-btn disabled><v-icon>fas fa-search</v-icon></v-btn>
          </v-col>
          <v-col>
            disabled outlined
            <v-btn disabled outlined><v-icon>fas fa-search</v-icon></v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="mb-10">
      <v-card-title><h2>WYSIWYG</h2></v-card-title>
      <v-row class="pb-2 ma-0" justify="space-around">
        <v-btn-toggle v-model="formatting" multiple>
          <v-btn>
            <v-icon>mdi-format-italic</v-icon>
          </v-btn>

          <v-btn>
            <v-icon>mdi-format-bold</v-icon>
          </v-btn>

          <v-btn>
            <v-icon>mdi-format-underline</v-icon>
          </v-btn>

          <v-btn>
            <v-row align="center" class="flex-column" justify="center">
              <v-icon class="cols 12">mdi-format-color-text</v-icon>

              <v-sheet tile style="margin-top: -4px" height="4" width="26" color="purple" />
            </v-row>
          </v-btn>
        </v-btn-toggle>
        <v-btn-toggle v-model="alignment">
          <v-btn>
            <v-icon>mdi-format-align-center</v-icon>
          </v-btn>

          <v-btn>
            <v-icon>mdi-format-align-left</v-icon>
          </v-btn>

          <v-btn>
            <v-icon>mdi-format-align-right</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-row>

      <v-sheet class="py-4 text-center" tile>
        <v-row class="mb-2" dense>
          <v-col
            v-for="n of numbers"
            :key="n"
            class="text-caption grey--text text--darken-1"
            v-text="n"
          />
        </v-row>

        <v-row dense>
          <v-col
            v-for="l of letters"
            :key="l"
            class="text-h6 grey--text font-weight-regular text--darken-2"
            v-text="l"
          />
        </v-row>
      </v-sheet>
    </v-card>

    <v-card class="mb-10">
      <v-card-title><h2>Badge Button</h2></v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-col>
            <v-checkbox v-model="badge_value" label="Show Badge Content" />

            <v-text-field v-model="badge_content" label="Badge Content" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-badge bordered color="error" overlap :content="badge_content" :value="badge_value">
              <v-btn>
                全部刪除
                <v-icon>fas fa-trashcan</v-icon>
              </v-btn>
            </v-badge>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="mb-10">
      <v-card-title>
        <h2>
          GoTopButtons
          <span id="GoTopButtons" />
        </h2>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <div class="mb-3">Current GoTop Type is :{{ currentGoTopTypeIs }}</div>
        <v-row>
          <v-col>
            <v-btn class="mr-3" @click="switchGoTopButtons('GoTop')">GoTop</v-btn>
            <v-btn class="mr-3" @click="switchGoTopButtons('GoTopByWindow')">GoTopByWindow</v-btn>
            <v-btn class="mr-3" @click="switchGoTopButtons('')"><v-icon>mdi-close</v-icon></v-btn>
          </v-col>

          <GoTopButton v-if="currentGoTopTypeIs === 'GoTop'" />
          <GoTopByWindow v-if="currentGoTopTypeIs === 'GoTopByWindow'" />

          <v-col />
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      themes: {},
      // WYSIWYG
      alignment: 1,
      formatting: [],
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      letters: 'a b c d e f g h i j k l m n'.split(' '),
      // badge
      badge_value: true,
      badge_content: 1,
      // GoTop
      currentGoTopTypeIs: '',
      anchorPointButtonList: [
        { title: 'AnchorPointButton' },
        { title: 'Ripple' },
        { title: 'GoTopButtons' }
      ]
    }
  },

  computed: {
    dialBtnOffsetTop() {
      return this.$vuetify.application.top + 60 + 12
    }
  },

  async mounted() {
    this.themes = this.$vuetify.theme.themes
  },

  beforeDestroy() {
    this.switchGoTopButtons('')
  },

  methods: {
    switchGoTopButtons(currentGoTopTypeIs) {
      this.currentGoTopTypeIs = currentGoTopTypeIs
      const app = document.querySelector('#app')

      if (currentGoTopTypeIs === 'GoTopByWindow' || '') {
        app.style.height = 'calc(100vh + 1000px)'
        this.$nextTick(() => {
          window.scrollTo({
            top: 100,
            left: 0,
            behavior: 'smooth'
          })
        })
      } else {
        app.style.height = null
        this.$nextTick(() => {
          const applicationScroll = document.querySelector('#application-scroll')
          applicationScroll.scrollTo({
            top: applicationScroll.scrollTop - 1,
            left: 0,
            behavior: 'smooth'
          })
        })
      }
    },

    onDial(val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped>
#sticky-wrap {
  overflow-y: scroll;
  padding: 30px 150px 300px;
  height: 300px;

  > #scroll-card {
    padding: 30px;
    width: 300px;
    height: 1000px;
    background-color: #e5e5e5;
  }
}

.panel-wrapper {
  position: relative;
  height: 100%;
}

.sticky-wrapper {
  position: sticky;
  top: calc(100vh / 2 - 40rem / 2);
  float: left;
  width: 100%;
}
</style>
