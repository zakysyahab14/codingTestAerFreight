<template>
  <no-ssr>
    <div>
      <!-- <div v-if="this.dialog === false">  -->
      <v-data-table
        v-model="table"
        :headers="headers"
        :items="items"
        :search="search"
        loading
        loading-text="Loading... Please wait"
      >
        <template v-slot:[`item.category_id`]="{item}">
          <div v-if="item.category_id === '2'">
            Bitniz News
          </div>
          <div v-else-if="item.category_id === '3'">
            Corporate Culture
          </div>
          <div v-else-if="item.category_id === '4'">
            BTN Community
          </div>
          <div v-else-if="item.category_id === '5'">
            Insiprasi Kita
          </div>
          <div v-else-if="item.category_id === '6'">
            Karya Kita
          </div>
          <div v-else-if="item.category_id === '7'">
            SIIPS COMM
          </div>
          <div v-else>
            CEO Message
          </div>
        <!-- <div v-html="item.content" /> -->
        </template>
        <!-- <template v-slot:item.content="{item}" style="max-width:50px">
        <div class="" v-html="item.content.slice(0, 400)" />
      </template> -->
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title style="color: #023659">
              BITNIZ
            </v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            />
            <v-spacer />
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Title Search"
              single-line
              hide-details
            />
          </v-toolbar>
        </template>
        <!-- <template v-slot:item.image slot-scope="props">
        <td><img :src="props.items.image" style="width: 50px; height: 50px"></td>
      </template> -->
        <template v-slot:[`item.is_published`]="{ item }">
          <div v-if="item.is_published === '1'">
            <!-- <v-icon
              small
              class="mr-2"
              style="z-index: 0"
            >
              mdi-check-circle
            </v-icon> -->
            <img
              src="~/assets/icon/correct.svg"
              class="mr-2"
              style="z-index: 0"
              width="15px"
            >
          </div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <!-- <v-icon
            small
            style="z-index: 0"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon> -->
          <img
            src="~/assets/icon/edit.svg"
            class="mr-2"
            style="z-index: 0; cursor: pointer;"
            width="15px"
            @click="editItem(item)"
          >
          <!-- <v-icon
            small
            style="z-index: 0"
            @click="modalask7(item)"
          >
            mdi-delete
          </v-icon> -->
          <img
            src="~/assets/icon/delete.svg"
            class="mr-2"
            style="z-index: 0; cursor: pointer;"
            width="15px"
            @click="modalask7(item)"
          >
        </template>
        <!-- <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template> -->
      </v-data-table>
      <!-- </div> -->
      <b-modal id="modal-ask6" ref="modal-ask6" centered hide-footer hide-header>
        <button
          type="button"
          aria-label="Close"
          class="close"
          @click="modalask6close"
        >
          ×
        </button>
        <div class="my-4">
          <div class="mt-3" style="text-align: center;">
            <p style="font-size: 18px; font-weight: bold; color: #000000;">
              Are you sure want update this article?
            </p>
            <div class="pt-5" style="display: flex; justify-content: space-evenly;">
              <button class="btn btn-outline-danger" @click.prevent="modalask6close">
                CANCEL
              </button>
              <button class="btn btn-outline-success" @click="editContent">
                UPDATE
              </button>
            </div>
          </div>
        </div>
      </b-modal>
      <b-modal id="modal-ask7" ref="modal-ask7" centered hide-footer hide-header>
        <button
          type="button"
          aria-label="Close"
          class="close"
          @click="modalask7close"
        >
          ×
        </button>
        <div class="my-4">
          <div class="mt-3" style="text-align: center;">
            <p style="font-size: 18px; font-weight: bold; color: #000000;">
              Are you sure want to delete this article?
            </p>
            <div class="pt-5" style="display: flex; justify-content: space-evenly;">
              <button class="btn btn-outline-danger" @click.prevent="modalask7close">
                CANCEL
              </button>
              <button class="btn btn-outline-success" @click="deleteContent">
                DELETE
              </button>
            </div>
          </div>
        </div>
      </b-modal>
      <v-dialog v-model="dialog" max-width="1000px" :retain-focus="false" class="modalEdit" style="z-index: 2">
        <!-- <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
          </template> -->
        <v-card class="modalEdit">
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text class="modalEdit">
            <v-container class="modalEdit" style="display: block">
              <v-row class="modalEdit">
                <b-container fluid>
                  <b-row class="my-1">
                    <b-col sm="2">
                      <label>Category:</label>
                    </b-col>
                    <b-col sm="10">
                      <b-form-select v-model="editedItem.category_id" :options="options" />
                    </b-col>
                  </b-row>
                </b-container>
                <b-container fluid>
                  <b-row class="my-3">
                    <b-col sm="2">
                      <label>Title:</label>
                    </b-col>
                    <b-col sm="10">
                      <b-form-input v-model="editedItem.title" placeholder="Title" />
                    </b-col>
                  </b-row>
                </b-container>
                <b-container fluid>
                  <b-row class="my-3">
                    <b-col sm="2">
                      <label>Title Head:</label>
                    </b-col>
                    <b-col sm="10">
                      <b-form-input v-model="editedItem.title_head" placeholder="Title Head" />
                    </b-col>
                  </b-row>
                </b-container>
                <b-container fluid>
                  <b-row class="my-3">
                    <b-col sm="2">
                      <label>Summary:</label>
                    </b-col>
                    <b-col sm="10">
                      <b-form-input v-model="editedItem.summary" placeholder="Summary" />
                    </b-col>
                  </b-row>
                </b-container>
                <b-container fluid>
                  <b-row class="my-3">
                    <b-col sm="2">
                      <label>Author:</label>
                    </b-col>
                    <b-col sm="10">
                      <b-form-input v-model="editedItem.author" placeholder="Summary" />
                    </b-col>
                  </b-row>
                </b-container>
                <b-container fluid>
                  <b-row class="my-3">
                    <b-col sm="2">
                      <label>Publish:</label>
                    </b-col>
                    <b-col sm="10">
                      <b-form-checkbox
                        id="checkbox-1"
                        v-model="editedItem.is_published"
                        name="checkbox-1"
                        value="1"
                        unchecked-value="0"
                      >
                        I want to publish this article
                      </b-form-checkbox>
                    </b-col>
                  </b-row>
                </b-container>
                <b-container fluid>
                  <b-row class="my-3">
                    <b-col sm="2">
                      <label for="textarea-auto-height">Content:</label>
                    </b-col>
                    <b-col sm="10">
                      <vue-editor v-model="editedItem.content" @imageAdded="handleImageAdded" />
                    <!-- <b-textarea
            id="content"
            v-model="content"
            name="content"
            cols="30"
            rows="10"
            placeholder="Content"
          /> -->
                    <!-- <textarea id="summernote" v-model="value" style="color: black" /> -->
                    </b-col>
                  </b-row>
                </b-container>
                <b-container fluid>
                  <b-row>
                    <b-col sm="2">
                      <label />
                    </b-col>
                    <b-col sm="5">
                      <b-button v-b-modal.modal-ask6 :retain-focus="false" variant="primary" style="width:100%; text-align:center">
                        UPDATE
                      </b-button>
                    </b-col>
                    <b-col sm="5">
                      <b-button variant="danger" style="width:100%; text-align:center" @click="close">
                        CANCEL
                      </b-button>
                    </b-col>
                  </b-row>
                </b-container>
              </v-row>
            </v-container>
          </v-card-text>

        <!-- <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="close">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="save">
            Save
          </v-btn>
        </v-card-actions> -->
        </v-card>
      </v-dialog>
    </div>
  </no-ssr>
</template>
<script>
export default {
  // middleware: 'auth',
  data: () => ({
    dialog: false,
    search: '',
    headers: [
      {
        text: 'Category',
        align: 'start',
        value: 'category_id'
      },
      { text: 'Title', value: 'title' },
      { text: 'Author', value: 'author' },
      // { text: 'Content', value: 'content' },
      // { text: 'Image', value: 'image' },
      { text: 'Publish', value: 'is_published', sortable: false },
      // { text: 'Protein (g)', value: 'protein' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    items: [],
    table: [],
    editedIndex: -1,
    editedItem: {
      category_id: '',
      title: '',
      content: '',
      title_head: '',
      author: '',
      summary: '',
      is_published: '',
      id: '',
      attachment_id: '',
      attachment_type: ''
      // protein: 0,
    },
    defaultItem: {
      category_id: '',
      title: '',
      content: '',
      title_head: '',
      author: '',
      summary: '',
      is_published: '',
      id: '',
      attachment_id: '',
      attachment_type: ''
      // protein: 0,
    },
    uploadMethod: '',
    title: '',
    imgauthor: '',
    videoauthor: '',
    image: null,
    id: '',
    attachment_id: '',
    attachment_type: '',
    video: '',
    titlehead: '',
    is_published: '',
    summary: '',
    content: '',
    category_id: '',
    category: 1,
    att_id: '',
    temp: null,
    options: [
      { value: null, text: 'Please select the category' },
      { value: '1', text: 'CEO MESSAGE' },
      { value: '2', text: 'BITNIZ NEWS' },
      { value: '3', text: 'CORPORATE CULTURE' },
      { value: '4', text: 'BTN COMMUNITY' },
      { value: '5', text: 'INSPIRASI KITA' },
      { value: '6', text: 'KARYA KITA' },
      { value: '7', text: 'SIIPS COMM' }
      // { value: 'VIDEO', text: 'VIDEO' },
      // { value: 'PODCAST', text: 'PODCAST' },
      // { value: 'PENGUMUMAN', text: 'PENGUMUMAN' }
    ]
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  // created () {
  //   this.initialize()
  // },
  mounted () {
    this.$store.dispatch('getContent').then(
      (response) => {
        if (response.statusMessage === 'success') {
          // console.log(response.data)
          // eslint-disable-next-line no-return-assign
          response.data.map((item, i) => response.data[i].content = decodeURIComponent(escape(atob(item.content))))
          // eslint-disable-next-line no-return-assign
          response.data.map((item, i) => response.data[i].is_published = item.is_published)
          // eslint-disable-next-line no-return-assign
          response.data.map((item, i) => response.data[i].category_id = item.category_id)
          // console.log(response)
          this.items = response.data
          // response.data.content = atob(response.data.content)
          // this.searchItems = this.items
          // this.filterItems = this.items
        } else {
          this.loadings = false
          localStorage.removeItem('token')
          window.location.href = '/'
          this.$toast.error('You need to login!')
        }
      }
    )

    // try {
    //   this.$store.dispatch('getContent').then((response) => {
    //     this.items = response
    //   })
    // } catch (e) {
    //   this.formError = e.message
    // }
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.items.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
      } else {
        this.items.push(this.editedItem)
      }
      this.close()
    },
    handleImageAdded (file) {
      const formData = new FormData()
      formData.append('image', file)
    },
    modalask6 () {
      this.$refs['modal-ask6'].show()
    },
    modalask7 (item) {
      this.$refs['modal-ask7'].show()
      this.temp = item
    },
    modalask6close () {
      this.$refs['modal-ask6'].hide()
    },
    modalask7close () {
      this.$refs['modal-ask7'].hide()
    },
    editContent () {
      if (this.editedItem.title === '') {
        this.$toast.error('Title Cant be empty')
        this.$refs['modal-ask6'].hide()
      } else {
        try {
          this.$store.dispatch('editContent', {
            id: this.editedItem.id,
            category_id: this.editedItem.category_id,
            title_head: this.editedItem.title_head,
            title: this.editedItem.title,
            summary: this.editedItem.summary,
            author: this.editedItem.author,
            content: btoa(unescape(encodeURIComponent(this.editedItem.content))),
            is_published: this.editedItem.is_published,
            attachment_id: this.editedItem.attachment_id,
            attachment_type: this.editedItem.attachment_type
          })
            .then((response) => {
              if (response.statusMessage === 'success') {
                this.$toast.success(response.data)
                // console.log(response)
                // this.$router.push('/')
                this.$refs['modal-ask6'].hide()
                this.dialog = false
                location.reload()
                // this.att_id = response.data.id
              } else if (response.statusMessage === 'error') {
                // this.$toast.error(response.errorMessage)
              }
            // eslint-disable-next-line no-console
            }).catch(() => { console.log('') })
        } catch (e) {
          this.$toast.error('Something Wrong!')
        }
      }
    },
    deleteContent () {
      // console.log(this.temp)
      try {
        this.$store.dispatch('deleteContent', this.temp.id
        )
          .then((response) => {
            if (response.statusMessage === 'success') {
              this.$toast.success(response.data)
              const index = this.items.indexOf(this.temp)
              this.items.splice(index, 1)
              // console.log(response)
              this.$refs['modal-ask7'].hide()
              // this.att_id = response.data.id
            } else if (response.statusMessage === 'error') {
              this.$toast.error(response.errorMessage)
            } else {
              localStorage.removeItem('token')
              window.location.href = '/'
              this.$toast.error('You need to login!')
            }
          // eslint-disable-next-line no-console
          }).catch(() => { console.log('') })
      } catch (e) {
        this.$toast.error('Something Wrong!')
        // eslint-disable-next-line no-console
        console.log(e)
      }
    }
  }
}
</script>
<style>
    .v-dialog__container {
        /* display: block;  */
        z-index: 0;
    }
    .modalEdit {
        /* max-height: 600px!important; */
        display: block!important;
        z-index: 1;
    }
    .v-dialog:active {
        max-height: 700px!important;
    }
    .v-dialog {
        max-height: 700px!important;
    }
    .v-dialog__content{
        max-height: 700px!important;
        /* display: block; */
        z-index: 2;

    }
    .v-dialog__content:active {
        max-height: 700px!important;
        /* display: block; */
        z-index: 2;
    }
</style>
