<template>
    <div>
        <Modal v-model:modelValue="showModalNuevo">
            <CitaNewView @on-register="onRegister()" />
        </Modal>
        <Modal v-model:modelValue="showModalEdit">
            <CitaEditView @on-update="onUpdate()" :item="itemToEdit" />
        </Modal>
        <h1>Lista de Citas</h1>
        <button @click="showModalNuevo = true" class="btn btn-primary">Nuevo</button>
        <button @click="buscar()" class="btn btn-lith" style="float:right">Buscar</button>
        <input type="search" style="float:right" v-model="textToSearch" @search="buscar()">
        <div style="margin: 20px 0;">
            <h3>Filtros:</h3>
            <form @submit.prevent="filtrar()">

                <label for="fecha"> Fecha: </label>
                <input type="date" id="fecha" v-model="filter.fecha" placeholder="Ingrese la fecha" />

                <label for="doctor"> doctor: </label>
                <!-- <select id="doctor" v-model="filter.doctorId" :class="{ 'is-invalid': errors.doctorId }">
                    <option value="">Todos</option>
                    <option :value="doctor.id" v-for="(doctor, index) in doctorList" :key="`doctor-${index}`">{{ doctor.nombre }}
                    </option> 
                </select> -->
                <select id="doctor" v-model="filter.doctorId">
                    <option value="">Todos</option>
                    <option :value="doctor.id" v-for="(doctor, index) in doctorList" :key="`doctor-${index}`">{{ doctor.nombre }}
                    </option>
                  </select>
                <button type="submit" class="btn btn-lith">Fitrar</button>
            </form>
        </div>
        <table>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>paciente</th>
                    <th>doctor</th>
                    <th>Motivo</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in itemList" :key="index">
                    <td>{{ 1 + index }}</td>
                    <td>{{ item.fecha }}</td>
                    <td>{{ item.hora }}</td>
                    <td>{{ item.patient.nombre }}</td>
                    <td>{{ item.doctor.nombre }}</td>
                    <td>{{ item.motivo }}</td>
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
import CitaNewView from './CitaNewView.vue'
import CitaEditView from './CitaEditView.vue'


export default {
    name: 'Cita',
    data() {
        return {
            currentPage: 1,
            totalPages: 100, // Este valor debe ser calculado según tus datos
            showModalNuevo: false,
            showModalEdit: false,
            itemToEdit: null,
            textToSearch: '',
            textToFilter: '',
            itemList: [],
            doctorList: [],
            filter: {
                fecha: null,
                doctorId:''
            }
        }
    },
    components: {
        // Registro de componentes que se utilizaran.
        Modal,
        CitaNewView,
        CitaEditView
    },
    methods: {
        // métodos que se pueden llamar desde la plantilla o desde otras partes del componente.
        ...mapActions(['increment']),
        getList() {
            const vm = this;
            this.axios.get(this.baseUrl + "/appointments?_sort=fecha,hora&_order=desc,asc&_expand=patient&_expand=doctor" + this.textToFilter + "&q=" + this.textToSearch)
                .then(function (response) {
                    vm.itemList = response.data;
                    console.log(vm.itemList);
                })
                .catch(function (error) {
                    console.error(error);
                });
        },
        getdoctorList() {
        const vm = this;
        this.axios.get(this.baseUrl + "/doctors")
            .then(function (response) {
            vm.doctorList = response.data;
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
                this.axios.delete(this.baseUrl + "/appointments/" + id)
                    .then(function (response) {
                        vm.getList();
                        vm.$toast.show("Registro eliminado.", "danger");
                    })
                    .catch(function (error) {
                        console.error(error);
                    });
            }

        },
        buscar() {
            this.getList();
        },
        filtrar() {
            this.textToFilter = '';
            if (this.filter.fecha != null && this.filter.fecha != '') {
                this.textToFilter += "&fecha=" + this.filter.fecha;
            }
            if (this.filter.doctorId != null && this.filter.doctorId != '') {
                this.textToFilter += "&doctorId=" + this.filter.doctorId;
            }
            this.getList();
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
        this.getdoctorList();
    },
    emits: [] // los eventos personalizados que el componente puede emitir.
}
</script>
  
<style></style>