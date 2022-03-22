<template>
    <div class="page employees-page">
        <h1>Список сотрудников</h1>
    </div>
</template>

<script>
import './employeesView.scss'

export default {
    name: 'EmployeesView',
    data () {
        return { 
            employeesList: null,
        }
    },
    methods: {
        async getEmployeesList () {
            const { data } = await this.$api.get('/organization/employees')

            return data.payload
        }
    },
    async mounted() {
        this.employeesList = await this.getEmployeesList ();
    }
}
</script>
