<template>
  <div>
    <h1>Registrar Cita</h1>
    <form @submit.prevent="submitForm">

      <div class="form-group">
        <label for="medico">medico:</label>
        <select id="medico" v-model="form.medicoId" :class="{ 'is-invalid': errors.medicoId }">
          <option :value="medico.id" v-for="(medico, index) in medicoList" :key="`medico-${index}`">{{ medico.nombre }}
          </option>
        </select>
        <div v-if="errors.medicoId" class="invalid-feedback">{{ errors.medicoId }}</div>
      </div>

      <div class="form-group">
        <label for="paciente">paciente:</label>
        <select id="paciente" v-model="form.pacienteId" :class="{ 'is-invalid': errors.pacienteId }">
          <option :value="paciente.id" v-for="(paciente, index) in pacienteList" :key="`paciente-${index}`">{{ paciente.nombre }}
          </option>
        </select>
        <div v-if="errors.pacienteId" class="invalid-feedback">{{ errors.pacienteId }}</div>
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
  name: 'CitaNew',
  data() {
    return {
      medicoList: [],
      pacienteList: [],
      form: {
        medicoId: null,
        pacienteId: null,
        motivo:null,
        fecha:null,
        hora:null,
      },
      errors: {}
    };
  },
  methods: {
    ...mapActions(['increment']),
    validateForm() {
      this.errors = {};

      if (!this.form.pacienteId) {
        this.errors.pacienteId = 'El paciente es obligatorio.';
      }

      if (!this.form.medicoId) {
        this.errors.medicoId = 'El paciente es obligatoria.';
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
          medicoId: null
        };
      }
    },
    save() {
      const vm = this;
      this.axios.post(this.baseUrl + "/citas", this.form)
        .then(function (response) {
          if (response.status == '201') {
            vm.$emit('on-register', response.data);
          }
          vm.itemList = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    getMedicoList() {
      const vm = this;
      this.axios.get(this.baseUrl + "/medicos")
        .then(function (response) {
          vm.medicoList = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    getPacienteList() {
      const vm = this;
      this.axios.get(this.baseUrl + "/pacientes")
        .then(function (response) {
          vm.pacienteList = response.data;
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
    }
  },
  mounted() {
    this.getMedicoList();
    this.getPacienteList();
  },
}
</script>
  
<style scoped></style>
  