<template>
<v-card>
  <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
  </v-card-title>
  <v-data-table
    :headers="headers"
    :items="cargoList"
    :search="search"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >New Item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.cargoName" label="Cargo Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.capacity" label="Capacity"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.origin" label="Origin"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.destination" label="Destination"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.airline" label="Airline Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.flightNumber" label="Flight Number"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <!-- <v-icon
        small
        class="mr-2"
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
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon> -->
      <img
            src="~/assets/icon/delete.svg"
            class="mr-2"
            style="z-index: 0; cursor: pointer;"
            width="15px"
            @click="deleteItem(item)"
          >
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</v-card>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      search: '',
      headers: [
        {
          text: 'Cargo Number/Name',
          align: 'start',
          sortable: false,
          value: 'cargoName',
        },
        { text: 'Capacity', value: 'capacity' },
        { text: 'Airline', value: 'airline' },
        { text: 'Flight Number', value: 'flightNumber' },
        { text: 'Origin', value: 'origin' },
        { text: 'Destination', value: 'destination' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      cargoList: [],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        cargoName: '',
        capacity: 0,
        origin: '',
        destination: '',
        airline: '',
        flightNumber: ''
      },
      defaultItem: {
        cargoName: '',
        capacity: 0,
        origin: '',
        destination: '',
        airline: '',
        flightNumber: ''
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },
    mounted () {
      this.$store.dispatch('getCargoList')
        .then(res => {
          if(res){
            this.cargoList = res
          }
        })
    // this.$store.dispatch('getCode').then(
    //   (response) => {
    //     if (response.status === 200) {
    //       console.log(response.data)
          
    //     } else {
    //       this.loadings = false
    //       localStorage.removeItem('token')
    //       window.location.href = '/'
    //       this.$toast.error('You need to login!')
    //     }
    //   }
    // )

    
  },
    methods: {
      initialize () {
      },

      editItem (item) {
        this.editedIndex = this.cargoList.indexOf(item)
        this.editedItem = item
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.cargoList.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.confirmDeleteItem(item.id, index)
      },

      confirmDeleteItem(itemId, index){
        this.$store.dispatch('deleteCargoItem', {id: itemId})
        this.cargoList.splice(index, 1)
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          let editedItem = this.editedItem
          this.$store.dispatch('updateCargoItem', {
            body: this.editedItem
          })
        } else {
          this.$store.dispatch('addCargoItem', {
            body: this.editedItem
          })
        }
        this.close()
      },
    },
  }
</script>