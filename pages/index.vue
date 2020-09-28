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
    :items="desserts"
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
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.cargoName" label="Cargo Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.capacity" label="Capacity"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
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
        { text: 'Flight Schedule Date', value: 'flight' },
        { text: 'Origin', value: 'origin' },
        { text: 'Destination', value: 'destination' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        cargoName: '',
        capacity: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        cargoName: '',
        capacity: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
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
  //   mounted () {
  //   this.$store.dispatch('getCode').then(
  //     (response) => {
  //       if (response.status === 200) {
  //         console.log(response.data)
          
  //       } else {
  //         // this.loadings = false
  //         // localStorage.removeItem('token')
  //         // window.location.href = '/'
  //         // this.$toast.error('You need to login!')
  //       }
  //     }
  //   )

    
  // },
    methods: {
      initialize () {
        this.desserts = [
          {
            cargoName: '1CGK45',
            capacity: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
          },
          {
            cargoName: '2BDO32',
            capacity: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
          },
          {
            cargoName: '3GGL20',
            capacity: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
          },
          {
            cargoName: '4GKL22',
            capacity: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
          },
          {
            cargoName: '5TGR73',
            capacity: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
          },
          {
            cargoName: '6CGK20',
            capacity: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
          },
          {
            cargoName: '7BDO99',
            capacity: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
          },
          {
            cargoName: '8KSR18',
            capacity: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
          },
          {
            cargoName: '9MKS01',
            capacity: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
          },
          {
            cargoName: '10GGK40',
            capacity: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
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
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>