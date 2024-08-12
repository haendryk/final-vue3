<template>
  <div>
    <h1>Editar tratamiento</h1>
    <form @submit.prevent="submitForm" v-if="form">
      <div class="form-group">
        <label for="patient">Paciente:</label>
        <select id="patient" v-model="form.patientId" :class="{ 'is-invalid': errors.patientId }">
          <option :value="patient.id" v-for="(patient, index) in patientList" :key="`patient-${index}`">{{ patient.nombre }}
          </option>
        </select>
        <div v-if="errors.patientId" class="invalid-feedback">{{ errors.patientId }}</div>
      </div>

      <div class="form-group">
        <label for="name">Nombre Tratamoento:</label>
        <input type="text" id="name" v-model="form.nombre" :class="{ 'is-invalid': errors.nombre }"
          placeholder="Ingrese el nombre" />
        <div v-if="errors.nombre" class="invalid-feedback">{{ errors.nombre }}</div>
      </div>

      <div class="form-group">
        <label for="especie">Especie:</label>
        <select id="especie" v-model="form.especie" :class="{ 'is-invalid': errors.especie }">
          <option :value="especie" v-for="(especie, index) in especieList" :key="`especie-${index}`">{{ especie }}</option>
        </select>
        <div v-if="errors.especie" class="invalid-feedback">{{ errors.especie }}</div>
      </div>

      <div class="form-group">
        <label for="raza">Raza:</label>
        <input type="text" id="raza" v-model="form.raza" :class="{ 'is-invalid': errors.raza }"
          placeholder="Ingrese la raza" />
        <div v-if="errors.raza" class="invalid-feedback">{{ errors.raza }}</div>
      </div>

      <div class="form-group">
        <label for="edad">Edad (Anios):</label>
        <input type="number" id="edad" v-model="form.edad" :class="{ 'is-invalid': errors.edad }"
          placeholder="Ingrese la edad" />
        <div v-if="errors.edad" class="invalid-feedback">{{ errors.edad }}</div>
      </div>
      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>
  </div>
</template>
  
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'DiagnosticoEdit',
  data() {
    return {
      patientList: [],
      cie10List: [],
      treatmentList: [],
      observacio: '',
      errors: {}
    };
  },
  methods: {
    ...mapActions(['increment']),
    validateForm() {
      this.errors = {};

      if (!this.form.nombre) {
        this.errors.nombre = 'El nombre es obligatorio.';
      }

      if (!this.form.especie) {
        this.errors.especie = 'La especie es obligatoria.';
      }

      if (!this.form.raza) {
        this.errors.raza = 'La raza es obligatoria.';
      }

      if (!this.form.edad) {
        this.errors.edad = 'La edad es obligatoria.';
      }

      if (!this.form.patientId) {
        this.errors.patientId = 'El paciente es obligatoria.';
      }

      return Object.keys(this.errors).length === 0;
    },

    submitForm() {
      if (this.validateForm()) {
        // Enviar los datos al servidor
        this.save();
        // Reiniciar el formulario
        this.form = {
          paciente: '',
          diagnostico: '',
          raza: '',
          edad: '',
          patientId: null
        };
      }
    },
    save() {
      const vm = this;
      this.axios.patch(this.baseUrl + "/diagnostico/" + this.item.id, this.form)
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
    form() {
      return Object.assign({},this.item);
    }
  },
  mounted() {
    this.getpatientList();
  },
  props: ['item']
}
</script>
  
<style scoped></style>
  