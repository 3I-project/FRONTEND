<template>
    <div class="page employees-page">
      <div class="employees-page__header">
        <h1>сотрудников организации</h1>
      </div>
      <div class="employees-page__main">
        <div class="employee-item" v-for="employee in employeesList.employees" :key="employee.id_employee">
          <div class="employee-item__avatar">
            <img :src="avatarUrl(employee)" alt="">
          </div>
          <div class="employee-item__info">
            <p>
              {{ employee.first_name }} {{ employee.last_name }}
              <img v-show="employee.isLeader" src="../../../src/assets/employeeView/crown.png" alt="">
            </p>
            <small>{{ employee.isLeader ? 'Руководитель' : 'Сотрудник' }}</small>
          </div>
          <div class="employee-item__controllers">
            <img src="../../../src/assets/employeeView/profile.svg" @click="goToProfile(employee)" alt="">
            <img src="../../../src/assets/employeeView/message.svg" alt="">
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import './employeesView.scss'

export default {
    name: 'EmployeesView',
    data () {
        return {
            employeesList: {},
        }
    },
    methods: {
        async getEmployeesList () {
            const { data } = await this.$api.get('/organization/employees')

            return data.payload
        },
      avatarUrl (employee) {
        const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:5500/apiV1': 'https://server-3i.herokuapp.com/apiV1'

        if (employee.avatarUrl) {
          return `${baseURL}/avatar/${ employee.avatarUrl }`
        }

        return require('../../assets/default-avatar.jpg')
      },
      goToProfile(employee) {
        this.$router.push(`/profile/${employee.id_employee}`)
      }
    },
    async mounted() {
        this.employeesList = await this.getEmployeesList ();
    }
}
</script>
