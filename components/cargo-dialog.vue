<template>
    <v-dialog v-model="openDialog" persistent max-width="500px">
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
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="8">
                        <v-text-field 
                            v-model="editedItem.cargoName" 
                            :rules="rules.cargoName"
                            label="Cargo Name"
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.capacity" label="Capacity"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-autocomplete
                                :items="flightCode"
                                item-text="code"
                                item-value="origin"
                                v-model="editedItem.origin"
                                label="Origin"
                            >
                                <template v-slot:item="data">
                                    {{data.item.city}} - {{data.item.code}}
                                </template>
                            </v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-autocomplete
                                :items="flightCode"
                                item-text="code"
                                item-value="destination"
                                v-model="editedItem.destination"
                                label="Destination"
                            >
                                <template v-slot:item="data">
                                    {{data.item.city}} - {{data.item.code}}
                                </template>
                            </v-autocomplete>
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
                    <v-btn color="blue darken-1" text @click="validate">Save</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'cargoDialog',
    props: [
        'cargoList',
        'cargoItem',
        'dialog',
        'editedItem',
        'save',
        'close',
        'formTitle',
        'flightCode'
    ],
    data(){
        return{
            valid: true,
            openDialog: this.dialog,
            rules: {
                cargoName: [
                    value => !!value || 'Required',
                    value => (value && value.length >= 3 || 'Min 3 Character') 
                ]
            }
        }
    },
    methods: {
        validate(){
            if(this.$refs.form.validate()){
                this.save()
            }
        }
    },
    watch: {
        dialog (val) {
            this.openDialog = val || false
        },
    },
}
</script>