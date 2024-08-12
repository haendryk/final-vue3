<template>
    <div class="navbar">
        <div class="logo">MiLogo</div>
        <!-- <div style="font-size: 14px; font-weight: 100;" v-if="isLoged">
            {{ getUser['role'] }} \ {{ getUser['name'] }} <button @click="salir()">Salir</button>
        </div>    
        <div style="font-size: 14px; font-weight: 100;" v-if="!isLoged">
            <button @click="login()">Inisiar sesion</button>
        </div>     -->
        <div class="menu">
            <router-link to="/">Bienvenido</router-link>
            <router-link to="/login" v-if="!isLoged">Inicio de Sección</router-link>
            <router-link to="{{ getUser['role'] }} \ {{ getUser['name'] }}" v-if="isLoged">Cerrar Seción</router-link>
            <router-link to="/pacientes" v-if="canSee(['admin','secretaria','medico'])">Pacientes</router-link>
            <router-link to="/diagnostico" v-if="canSee(['admin','medico'])">Diagnostico</router-link>
            <router-link to="/cita" v-if="canSee(['admin','secretaria'])">Citas</router-link> 
             <!-- <slot></slot> -->
        </div>
    </div>
</template>
  
<script>
import {mapGetters } from 'vuex'
export default {
    name: 'Menu',
    computed: {
        ...mapGetters(['getBaseUrl','loged', 'user']),
        getUser(){
            return this.user;
        },
        isLoged(){
            return this.loged
        },
        ...mapGetters(['rol'])
    },
    methods: {
        salir(){
            localStorage.removeItem('user');
            location.reload();
        },
        login(){
            this.$router.push('/login');
        },
        canSee(roles) {
        console.log('canSee', this.rol);
        return roles.includes(this.rol);
    }
    }
}
</script>
  
<style >
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333;
    padding: 10px 20px;
    color: white;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
}

.navbar a {
    color: white;
    text-decoration: none;
    padding: 14px 20px;
    display: block;
}

.navbar a:hover {
    background-color: #575757;
    border-radius: 4px;
}

.navbar .logo {
    font-size: 1.5em;
    font-weight: bold;
}

.navbar .menu {
    display: flex;
    padding-right: 20px;
}

.navbar .menu-item {
    margin-left: 10px;
}

</style>
  