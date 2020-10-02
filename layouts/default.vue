<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item 
          v-if="isLoggedIn"
          v-on:click="handleClick">
          <v-list-item-action>
            <v-icon>mdi-apps</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      
      
      <v-toolbar-title v-if="isLoggedIn" class="mr-2">Hi Admin </v-toolbar-title>
      <v-icon v-if="isLoggedIn">mdi-account-circle-outline</v-icon>
    
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      isLoggedIn: false,
      firstname: '',
      items: [
        {
          icon: 'mdi-apps',
          title: 'Cargo List',
          to: '/'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Aer Freight Cargo Data'
    }
  },
  mounted() {
    const userInfo = this.$cookies.get('USER_INFO')
    if(!userInfo){
      this.isLoggedIn = false
      this.items.push(
        {
          icon: 'mdi-apps',
          title: 'Login',
          to: '/login'
        }
      )
    }else{
      this.isLoggedIn = true
      this.firstname = userInfo.firstname
    }
  },
  methods: {
    handleClick(){
      this.$cookies.remove('USER_INFO')
      window.location.reload()
    }
  },
}
</script>
