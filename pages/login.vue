<template>
  <no-ssr>
    <section class="section">
      <div class="container text-center">
        <div class="columns">
          <div class="column is-4 is-offset-4">
            <h2 class="title has-text-centered">
              Welcome back!
            </h2>
            <form method="post" @submit.prevent="login">
              <div class="field">
                <label class="label">Username</label>
                <div class="control">
                  <input
                    v-model="username"
                    type="text"
                    class="input-style"
                    name="username"
                  >
                </div>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <div class="control">
                  <input
                    v-model="password"
                    type="password"
                    class="input-style"
                    name="password"
                  >
                </div>
              </div>
              <div class="control pt-3">
                <button type="submit" class="button-submit p-2">
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </no-ssr>
</template>

<script>

export default {
  components: {
  },

  data () {
    return {
      username: '',
      password: '',
      error: null
    }
  },
  mounted () {
    localStorage.removeItem('token')
  },
  methods: {
    async login () {
      try {
        await this.$store.dispatch('login', {
          inputUserkey: this.username,
          inputPass: this.password,
          timelogin: Date.now()
        })
          .then((response) => {
            if (response === false) {
              this.$toast.error('Invalid Username / Password')
              // eslint-disable-next-line no-console
              console.error(response)
            } else if (response.data.statusMessage === 'success') {
              localStorage.setItem('USER_INFO', this.username)
              window.location.href = '/'
              this.$toast.success('success login')
            } else if (response.data.statusMessage === 'error') {
              this.$toast.error('Something bad happend')
            }
          })
      } catch (e) {
        this.$toast.error('Internal Server Error!')
      }
    }
  }
}
</script>

<style>
.input-style {
    border: 1px solid #023659;
    border-radius: 5px;
}

.button-submit {
    background-color: #023659;
    border: 1px solid #023659;
    color: #EDA11E;
    border-radius: 5px;
    transition: 0.5s;
}
.button-submit:hover {
    background-color: #EDA11E;
    border: 1px solid #EDA11E;
    color: #023659;
    border-radius: 5px;
}
</style>
