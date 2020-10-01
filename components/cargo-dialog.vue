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
                                <v-text-field 
                                    v-model="editedItem.capacity" 
                                    label="Capacity"
                                    :rules="rules.capacity"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-autocomplete
                                    :items="flightCode"
                                    item-text="city"
                                    item-value="code"
                                    cache-items
                                    v-model="editedItem.origin"
                                    label="Origin"
                                    :rules="rules.origin"
                                >
                                    <template v-slot:item="data">
                                        {{data.item.city}} - {{data.item.code}}
                                    </template>
                                    <template v-slot:selection="data">
                                        {{data.item.code}}
                                    </template>
                                </v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-autocomplete
                                    :items="flightCode"
                                    item-value="code"
                                    item-text="city"
                                    cache-items
                                    v-model="editedItem.destination"
                                    label="Destination"
                                    :rules="rules.destination"
                                >
                                    <template v-slot:item="data">
                                        {{data.item.city}} - {{data.item.code}}
                                    </template>
                                    <template v-slot:selection="data">
                                        {{data.item.code}}
                                    </template>
                                </v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field 
                                    v-model="editedItem.airline" 
                                    label="Airline Name"
                                    :rules="rules.airline"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field 
                                    v-model="editedItem.flightNumber" 
                                    label="Flight Number"
                                    :rules="rules.flightNumber"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-checkbox
                                    v-model="editedItem.status"
                                    label="Status"
                                ></v-checkbox>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="validate">Save</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script>
const isNumber = /^\d*$/
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
        'flightCode',
    ],
    data(){
        return{
            valid: true,
            openDialog: this.dialog,
            rules: {
                cargoName: [
                    value => !!value || 'Required',
                    value => (value && value.length >= 3 || 'Min 3 Character') 
                ],
                capacity: [
                    value => !!value || 'Requred',
                    value => isNumber.test(value) || 'Should be a number'
                ],
                origin: [
                    value => !!value || 'Requred',
                ],
                destination: [
                    value => !!value || 'Requred',
                ],
                airline: [
                    value => !!value || 'Requred',
                ],
                flightNumber: [
                    value => !!value || 'Requred',
                ]
            }
        }
    },
    methods: {
        validate(){
            if(this.$refs.form.validate()){
                this.save()
                this.openDialog = false
            }
        },
        closeDialog(){
            this.openDialog = false
            this.close()
        },
        
    },
    watch: {
        dialog (val) {
            this.openDialog = val || false
        }
    },
}
</script>