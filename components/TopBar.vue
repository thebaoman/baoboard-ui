<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      disable-resize-watcher
    >
      <v-list>
<!--        <v-list-item-->
<!--          v-for="(item, i) in items"-->
<!--          :key="i"-->
<!--          :to="item.to"-->
<!--          router-->
<!--          exact-->
<!--        >-->
<!--          &lt;!&ndash;          <v-list-item-action>&ndash;&gt;-->
<!--          &lt;!&ndash;            <v-icon>{{ item.icon }}</v-icon>&ndash;&gt;-->
<!--          &lt;!&ndash;          </v-list-item-action>&ndash;&gt;-->
<!--          <v-list-item-content>-->
<!--            <v-list-item-title v-text="item.title" />-->
<!--          </v-list-item-content>-->
<!--        </v-list-item>-->
        <v-list-item
          href="https://twitter.com/zashtonEth"
          target="_blank"
        >
          <v-list-item-action>
            <v-icon>mdi-twitter</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> built by @zashtoneth </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      fixed
      height="90"
      app
      class="gradient-bg"
    >
      <v-app-bar-nav-icon v-show="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" @click.stop="drawer = !drawer" />
      <v-toolbar-title class="d-flex align-center logo-title">
        <img class="mr-5" style="max-width: 70px" src="/bao-logo.png" />
        <span v-show="!($vuetify.breakpoint.xs || $vuetify.breakpoint.sm)">{{ title }}</span>
      </v-toolbar-title>
      <v-btn v-show="!($vuetify.breakpoint.xs || $vuetify.breakpoint.sm)" class="ml-5 nav-btn" text target="_blank" href="https://bao.finance">
        Bao.finance
      </v-btn>
      <v-btn v-show="!($vuetify.breakpoint.xs || $vuetify.breakpoint.sm)" class="nav-btn" text target="_blank" href="https://docs.bao.finance/">
        Docs
      </v-btn>
      <v-spacer />
      <v-btn
        class="nav-btn"
        text
        target="_blank"
        href="https://twitter.com/zashtonEth">
        <span class="text-lowercase"> built by &nbsp;</span>
        <span class="text-lowercase" style="font-size:1.2rem">
          @zashtoneth
          <v-icon right size="20" color="blue">mdi-twitter</v-icon>
        </span>
      </v-btn>
<!--      <v-btn v-if="address" large outlined class="dark-bevel-border">-->
<!--        <div style="max-width: 150px;" class="text-truncate">-->
<!--          {{ ens? ens:addressTruncate(address) }}-->
<!--        </div>-->
<!--      </v-btn>-->
<!--      <v-btn-->
<!--        v-else-->
<!--        large-->
<!--        outlined-->
<!--        class="dark-bevel-border yellow-btn"-->
<!--        @click="onConnect"-->
<!--      >-->
<!--        CONNECT-->
<!--      </v-btn>-->
    </v-app-bar>
  </div>
</template>

<script>

export default {
  name: 'TopBar',
  data () {
    return {
      drawer: false,
      fixed: false,
      address: '',
      // items: [
      //   {
      //     icon: 'mdi-apps',
      //     title: 'Indexers',
      //     to: '/'
      //   },
      //   {
      //     icon: 'mdi-chart-bubble',
      //     title: 'Delegators',
      //     to: '/delegators'
      //   },
      //   {
      //     icon: 'mdi-chart-bubble',
      //     title: 'My Portfolio',
      //     to: '/portfolio'
      //   }
      // ],
      title: 'BaoBOARD'
    }
  }
}
</script>

<style scoped>
</style>
