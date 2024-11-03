import Detail from './detail.js'
export default {
    props: ['searchText', 'showDetail'],
    data() {
        return {
            users: [],
            totalPages: 0,
            perPage: 2,
            currentPage: 1,
            baseUrl: "https://reqres.in/api",
            user: null
        }
    },
    computed: {
        filteredUsers() {
           return this.users.filter(user => {
                return (user.first_name.toLowerCase() + " " + user.last_name.toLowerCase()).includes(this.searchText.toLowerCase())
            })
        }
    },
    components: {
        Detail
    },
    template: `
        <div class="col-9">
                <div class="border rounded">
                    <h5 class="bg-light text-color-custom p-2 border rounded">Main</h5>
                    <div class="p-3">
                        <div v-if="showDetail">
                            <Detail :user="user"/>
                        </div>
                        <div v-else>
                            <table class="table table-hover">
                                <thead>
                                    <tr class="table table-primary" >
                                        <th scope="col" class="custom-border-table" >#</th>
                                        <th scope="col" class="custom-border-table" >First name</th>
                                        <th scope="col" class="custom-border-table" >Last name</th>
                                        <th scope="col" class="custom-border-table" >Email</th>
                                        <th scope="col" class="custom-border-table" >Avatar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="user in filteredUsers" :key="user.id" @click="handleGoDetail(user)">
                                        <th scope="row">{{ user.id }}</th>
                                        <td>{{ user.first_name }}</td>
                                        <td>{{ user.last_name }}</td>
                                        <td>{{ user.email }}</td>
                                        <td>
                                            <img :src="user.avatar" alt="avatar"  height="150" width="150" class="rounded">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <nav aria-label="Page navigation example">
                                <ul class="pagination" id="pagination">
                                    <li class="page-item" v-for="page in totalPages" :class="{ active: (currentPage === page) }" @click="reloadForNewPage(page)" ><a class="page-link" href="#"> {{ page }} </a></li>
                                </ul>
                            </nav>  
                        </div>
                    </div>           
                </div>
            </div>
    `,
    methods: {
        async getUsers(page) {
            const res = await fetch(`${this.baseUrl}/users?page=${page}&per_page=${this.perPage}`)
            if (res.ok) {
                const data = await res.json()
                this.totalPages = data.total_pages
                this.users = data.data
            }
        },
        reloadForNewPage(page) {
            this.currentPage = page
            this.getUsers(page)
        },
        handleGoDetail(detailUser) {
            const parsedUser = JSON.parse(JSON.stringify(detailUser))
            this.user = parsedUser
            this.$emit('goDetail')
        }
    },
    mounted() {
        this.getUsers(this.currentPage)
    }
}