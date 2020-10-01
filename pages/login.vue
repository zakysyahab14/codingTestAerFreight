<template>
  <no-ssr>
    <section class="section bg-gray-200 h-screen">
      <div class="text-center flex flex-auto flex-row h-screen justify-center items-center">
            <form method="post" 
              class="bg-white p-6 rounded shadow text-left w-3/12"
              @submit.prevent="login">
              <div class="text-green-700 text-2xl font-medium mb-4 text-center">
                <h3>Hello Again, Admin! </h3>
              </div>
              <div class="mb-4">
                <input
                  v-model="username"
                  type="text"
                  class="input-style w-full p-1 rounded border border-gray-500 border-solid"
                  placeholder="Username"
                  name="username"
                  v-bind:class="[error.username ? 'border-red-700' : '']"
                >
                <span 
                  v-if="error.username && error.username !== ''"
                  class="text-red-700 text-sm"
                >
                  {{error.username}}
                </span>
              </div>
              <div class="">
                <input
                  v-model="password"
                  type="password"
                  class="input-style w-full p-1 rounded border-gray-500 border border-gray-500 border-solid" 
                  name="password"
                  placeholder="Password"
                  v-bind:class="[error.password ? 'border-red-700' : '']"
                >
                <span 
                  v-if="error.username && error.username !== ''"
                  class="text-red-700 text-sm"
                >
                  {{error.username}}
                </span>
              </div>
              <div class="mt-4 w-full text-white">
                <button class="rounded p-2 bg-green-400 hover:bg-green-500 w-full">
                  Log In
                </button>
              </div>
            </form>
          </div>
    </section>
  </no-ssr>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  layout: 'empty',
  components: {
  },

  data () {
    return {
      username: '',
      password: '',
      error: {}
    }
  },
  mounted () {
    // localStorage.removeItem('token')
  },
  watch: {
    username(val){
      if(val.length >= 1) this.error.username = ''
    },
    password(val){
      if(val.length >= 1) this.error.password = ''
    }
  },
  methods: {
    formValidation(){
      if(this.username && this.password) return true
      this.error = {}
      if(!this.username) this.error.username = "Please input username";
      if(!this.password) this.error.password = "Please input password";    
    },
    login(){
      if(this.formValidation()){
        console.log('process')
        this.getUser()
      }
    },
    getUser(){
      try{
        this.$store.dispatch('login', {
          username: this.username,
          password: this.password
        })
        .then(response => {
          if(response.length >= 1){
            Cookie.set('USER_INFO', JSON.stringify(response[0]))
            window.location.href = '/'
          }
        })

      }catch(err){

      }
    }
    // async login () {
    //   try {
    //     await this.$store.dispatch('login', {
    //       inputUserkey: this.username,
    //       inputPass: this.password,
    //       timelogin: Date.now()
    //     })
    //       .then((response) => {
    //         if (response === false) {
    //           this.$toast.error('Invalid Username / Password')
    //           // eslint-disable-next-line no-console
    //           console.error(response)
    //         } else if (response.data.statusMessage === 'success') {
    //           localStorage.setItem('USER_INFO', this.username)
    //           window.location.href = '/'
    //           this.$toast.success('success login')
    //         } else if (response.data.statusMessage === 'error') {
    //           this.$toast.error('Something bad happend')
    //         }
    //       })
    //   } catch (e) {
    //     this.$toast.error('Internal Server Error!')
    //   }
    // }
  }
}
</script>

<style>
</style>
