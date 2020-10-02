<template>
  <no-ssr>
    <section class="section bg-gray-200 h-screen">
      <div class="text-center flex flex-auto flex-col h-screen justify-center items-center">
        <div class="bg-white p-6 rounded shadow text-left w-full sm:w-full md:w-full lg:w-4/12 divide-x-2"> 
        <form method="post" 
          @submit.prevent="login">
          <div class="text-green-700 text-2xl font-medium mb-4 text-center">
            <h3>Hello Again, Admin! </h3>
          </div>
          <div class="mb-4">
            <input
              v-model="username"
              type="text"
              class="input-style w-full p-1 rounded border border-gray-500 border-solid"
              placeholder="Username (admin)"
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
              placeholder="Password (12345)"
              v-bind:class="[error.password ? 'border-red-700' : '']"
            >
            <span 
              v-if="error.password && error.password !== ''"
              class="text-red-700 text-sm"
            >
              {{error.password}}
            </span>
          </div>
          <div class="mt-4 w-full text-white hover:text-green-600">
            <button class="rounded font-medium p-1 border-solid border-4 border-green-500 bg-green-500 hover:bg-white w-full">
              Log In
            </button>
          </div>
        </form>
        </div>
        <div class="text-green-700 text-2xl font-medium mb-4 text-center"> or </div>
        <div 
          class="bg-white p-6 rounded shadow text-left w-full sm:w-full md:w-full lg:w-4/12 ">
          <div class="text-orange-600 text-2xl font-medium mb-4 text-center">
            <h3>You are a Guest?</h3>
          </div>

          <div class="mt-4 w-full text-white hover:text-orange-600">
            <button @click="guest" class="rounded font-medium p-1 border-solid border-4 border-orange-500 bg-orange-500 hover:bg-white w-full">
              Guest Log In
            </button>
          </div>
        </div>
      </div>
    </section>
  </no-ssr>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  layout: 'empty',
  middleware: 'authenticated',
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
        this.getUser()
      }
    },
    guest(){
      window.location.href = '/'
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
