<template>
    <div style=" padding-top: 50px;">
        <Modal v-model:modelValue="showModalNuevo">
            <treatmentNew @on-register="onRegister($event)"/>
        </Modal>
        <Modal v-model:modelValue="showModalEdit">
            <treatmentEdit @on-update="onUpdate($event)" :item="itemToEdit"/>
        </Modal>
        <h1>Lista de Diagnosticos</h1>
        <button @click="showModalNuevo = true" class="btn btn-primary">Nuevo</button>
        <table>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Nombre</th>
                    <th>Diagnostico</th>
                    <th>Medicacion</th>
                    <th>Observacion</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in itemList" :key="index">
                    <td>{{ 1 + index }}</td>
                    <td>{{ item.patient.nombre }}</td>
                    <td>{{ item.cie10.nombre }}</td>
                    <td>
                        <ul>
                            <li>{{item.medicamento}}</li>
                            <li>{{item.duracion}}</li>
                            <li>{{item.dosis}}</li>
                        </ul>
                    </td>
                    <td>{{ item.observacion }}</td>
                    <td>
                        <button @click="edit(item)" class="btn btn-dark" style="margin-right: 15px;">Editar</button>
                        <button @click="Eliminar(item.id)" class="btn btn-danger">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Modal from '../../components/Modal.vue'
import treatmentNew from './treatmentNewView.vue'
import treatmentEdit from './treatmentEditView.vue'


export default {
    name: 'diagnostico',
    data() {
        return {
            currentPage: 1,
            totalPages: 100, // Este valor debe ser calculado según tus datos
            showModalNuevo: false,
            showModalEdit: false,
            itemToEdit: null,
            textToSearch: '',
            itemList: []
        }
    },
    components: {
        // Registro de componentes que se utilizaran.
        Modal,
        treatmentNew,
        treatmentEdit
    },
    methods: {
        // métodos que se pueden llamar desde la plantilla o desde otras partes del componente.
        ...mapActions(['increment']),
        getList() {
            const vm = this;
           
            this.axios.get(this.baseUrl + "/diagnoses?_expand=patient&_expand=treatment&_expand=cie10")
                .then(function (response) {
                    vm.itemList = response.data;
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.error(error);
                });
        },
        edit(item) {
            this.itemToEdit = Object.assign({}, item);
            this.showModalEdit = true;
        },
        Eliminar(id) {
            if (confirm("¿Esta Seguro de eliminar el registro?")) {
                const vm = this;
                this.axios.delete(this.baseUrl + "/diagnoses/" + id)
                    .then(function (response) {
                        vm.getList();
                        vm.$toast.show("Registro eliminado.", "danger");
                    })
                    .catch(function (error) {
                        console.error(error);
                    });
            }

        },
       
        onRegister(event) {
            this.getList();
            this.showModalNuevo = false;
            this.$toast.show('Registro exitoso', 'success');
        },
        onUpdate(event) {
            this.getList();
            this.showModalEdit = false;
            this.itemToEdit = null;
            this.$toast.show('Edicion exitosa', 'info');
        },
        showToast(message, type) {
            this.$toast.show(message, type);
        }
    },
    computed: {
        // propiedades computadas que dependen de otras propiedades reactivas
        ...mapState(['count']),
        ...mapGetters(['doubleCount', 'getBaseUrl']),
        baseUrl() {
            return this.getBaseUrl
        }
    },
    props: {
        // propiedades que el componente puede recibir.
    },
    mounted() {
        this.getList();
    },
    emits: [] // los eventos personalizados que el componente puede emitir.
}
</script>
  
<style></style>