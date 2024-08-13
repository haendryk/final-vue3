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
        <label for="cie10">Diagnostico:</label>
        <select id="cie10" v-model="form.cie10Id" :class="{ 'is-invalid': errors.cie10Id }">
          <option :value="cie10.id" v-for="(cie10, index) in cie10List" :key="`cie10-${index}`">{{ cie10.nombre }}
          </option>
        </select>
        <div v-if="errors.cie10Id" class="invalid-feedback">{{ errors.cie10Id }}</div>
      </div>

      <div class="form-group">
        <label for="name">Medicamento:</label>
        <input type="text" id="name" v-model="form.medicamento" :class="{ 'is-invalid': errors.medicamento }"
          placeholder="Ingrese el nombre" />
        <div v-if="errors.medicamento" class="invalid-feedback">{{ errors.medicamento }}</div>
      </div>

      <div class="form-group">
        <label for="name">Dosis:</label>
        <input type="text" id="name" v-model="form.dosis" :class="{ 'is-invalid': errors.dosis }"
          placeholder="Ingrese el nombre" />
        <div v-if="errors.dosis" class="invalid-feedback">{{ errors.dosis }}</div>
      </div>

      <div class="form-group">
        <label for="name">Duracion:</label>
        <input type="text" id="name" v-model="form.duracion" :class="{ 'is-invalid': errors.duracion }"
          placeholder="Ingrese el nombre" />
        <div v-if="errors.duracion" class="invalid-feedback">{{ errors.duracion }}</div>
      </div>

      <div class="form-group">
        <label for="observacion">Observacion:</label>
        <textarea id="observacion" rows="3" v-model="form.observacion" :class="{ 'is-invalid': errors.observacion }" placeholder="Ingrese el observacion"></textarea>
        <div v-if="errors.dosis" class="invalid-feedback">{{ errors.observacion }}</div>
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
  props: ['item'],
  methods: {
    ...mapActions(['increment']),
    validateForm() {
      this.errors = {};
   
      if (!this.form.patientId) {
        this.errors.patientId = 'Selecione un paciente.';
      }

      if (!this.form.cie10Id) {
        this.errors.cie10Id = 'selecione diagnostico.';
      }

      if (!this.form.observacion) {
        this.errors.observacion = 'Ingrese Observacion.';
      }
      if (!this.form.medicamento) {
        this.errors.medicamento = 'Ingrese Observacion.';
      }
      if (!this.form.dosis) {
        this.errors.dosis = 'Ingrese Observacion.';
      }
      if (!this.form.duracion) {
        this.errors.duracion = 'Ingrese Observacion.';
      }

      return Object.keys(this.errors).length === 0;
    },

    submitForm() {
      if (this.validateForm()) {
        // Enviar los datos al servidor
        this.save();
        // Reiniciar el formulario
        this.form = {
          patientId: null,
          cie10Id: null,
          observacion: '',
          medicamento: '',
          dosis: '',
          duracion: '',
        };
      };
    },
    save() {
      const vm = this;
      this.axios.patch(this.baseUrl + "/diagnoses/" + this.item.id, this.form)
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
    getCie10List() {
      const vm = this;
      this.axios.get(this.baseUrl + "/cie10s")
        .then(function (response) {
          vm.cie10List = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    }
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
    this.getCie10List();
  }
}
</script>
  
<style scoped></style>
  