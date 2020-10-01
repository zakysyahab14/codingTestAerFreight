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
        <CargoDialog 
          v-bind:dialog="dialog"
          v-bind:editedItem="editedItem"
          v-bind:close="close"
          v-bind:save="save"
          v-bind:formTitle="formTitle"
          v-bind:flightCode="flightCode"
        />
        
      </v-toolbar>
    </template>
    <template v-slot:item.status="{ item }">
        {{ item.status ? 'ACTIVE' : 'INACTIVE' }}
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <!--<img
            src="~/assets/icon/edit.svg"
            class="mr-2"
            style="z-index: 0; cursor: pointer;color:#FFFFFF"
            width="15px"
            @click="editItem(item)"
          > -->
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
      <!-- <img
            src="~/assets/icon/delete.svg"
            class="mr-2"
            style="z-index: 0; cursor: pointer;;color:#FFFFFF"
            width="15px"
            @click="deleteItem(item)"
          > -->
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</v-card>
</template>

<script>
  import CargoDialog from '@/components/cargo-dialog.vue'
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
        { text: 'Status', value: 'status'},
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      cargoList: [],
      editedIndex: -1,
      editedItem: {
        cargoName: '',
        capacity: 0,
        origin: '',
        destination: '',
        airline: '',
        flightNumber: '',
        status: false
      },
      defaultItem: {
        cargoName: '',
        capacity: 0,
        origin: '',
        destination: '',
        airline: '',
        flightNumber: '',
        status: false
      },
      flightCode: []
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
      this.$store.dispatch('getFlight')
        .then(res => {
          if(res){
            this.flightCode = res
          }
        })

      this.$store.dispatch('getCargoList')
        .then(res => {
          if(res){
            this.cargoList = res
          }
        })
  },
    methods: {
      initialize () {
      },

      editItem (item) {
        this.editedIndex = this.cargoList.indexOf(item)
        this.defaultItem = item
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
        this.editedItem = this.defaultItem
        this.$nextTick(() => {
          this.editedItem = this.defaultItem
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