<template>
  <div>
    <h1>Editar Cita</h1>
    <form @submit.prevent="submitForm" v-if="form">

      <div class="form-group">
        <label for="doctor">medico:</label>
        <select id="doctor" v-model="form.doctorId" :class="{ 'is-invalid': errors.doctorId }">
          <option :value="doctor.id" v-for="(doctor, index) in doctorList" :key="`doctor-${index}`">{{ doctor.nombre }}
          </option>
        </select>
        <div v-if="errors.doctorId" class="invalid-feedback">{{ errors.doctorId }}</div>
      </div>

      <div class="form-group">
        <label for="patient">paciente:</label>
        <select id="patient" v-model="form.patientId" :class="{ 'is-invalid': errors.patientId }">
          <option :value="patient.id" v-for="(patient, index) in patientList" :key="`patient-${index}`">{{ patient.nombre }}
          </option>
        </select>
        <div v-if="errors.patientId" class="invalid-feedback">{{ errors.patientId }}</div>
      </div>

      <div class="form-group">
        <label for="motivo">Motivo:</label>
        <input type="text" id="motivo" v-model="form.motivo" :class="{ 'is-invalid': errors.motivo }"
          placeholder="Ingrese el motivo" />
        <div v-if="errors.fecha" class="invalid-feedback">{{ errors.motivo }}</div>
      </div>

      <div class="form-group">
        <label for="fecha">Fecha:</label>
        <input type="date" id="fecha" v-model="form.fecha" :class="{ 'is-invalid': errors.fecha }"
          placeholder="Ingrese la fecha" />
        <div v-if="errors.fecha" class="invalid-feedback">{{ errors.fecha }}</div>
      </div>

      <div class="form-group">
        <label for="hora">Hora:</label>
        <input type="time" id="fecha" v-model="form.hora" :class="{ 'is-invalid': errors.hora }"
          placeholder="Ingrese la hora" />
        <div v-if="errors.hora" class="invalid-feedback">{{ errors.hora }}</div>
      </div>
      
      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>
  </div>
</template>
  
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'CitaEdit',
  data() {
    return {
      doctorList: [],
      patientList: [],
      mascotaList: [],
      motivoList: null,
      errors: {}
    };
  },
  props:['item'],
  methods: {
    ...mapActions(['increment']),
    validateForm() {
      this.errors = {};

      if (!this.form.doctorId) {
        this.errors.doctorId = 'El medico es obligatorio.';
      }

      if (!this.form.patientId) {
        this.errors.patientId = 'El paciente es obligatoria.';
      }

      if (!this.form.motivo) {
        this.errors.motivo = 'El motivo es obligatorio.';
      }

      if (!this.form.fecha) {
        this.errors.fecha = 'La fecha es obligatorio.';
      }

      if (!this.form.hora) {
        this.errors.hora = 'La hora es obligatorio.';
      }
      return Object.keys(this.errors).length === 0;
    },

    submitForm() {
      if (this.validateForm()) {
        this.save();
        this.form = {
          patientId: null
        };
      }
    },
    save() {
      const vm = this;
      console.log(this.form);
      this.axios.patch(this.baseUrl + "/appointments/"+this.item.id, this.form)
        .then(function (response) {
          if (response.status == '200') {
            vm.$emit('on-update', response.data);
          }
          vm.itemList = response.data;
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
    getpatientList() {
      const vm = this;
      this.axios.get(this.baseUrl + "/patients")
        .then(function (response) {
          vm.patientList = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
  computed: {
    // propiedades computadas que dependen de otras propiedades reactivas
    ...mapState(['count']),
    ...mapGetters(['doubleCount', 'getBaseUrl']),
    baseUrl() {
      return this.getBaseUrl
    },
    form(){
      return Object.assign({},this.item);
    }
  },
  mounted() {
    this.getpatientList();
    this.getdoctorList();
  },
}
</script>
  
<style scoped></style>
  