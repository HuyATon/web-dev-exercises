import Header from "./header.js"
import Side from "./side.js"
import Main from "./main.js"
import Footer from "./footer.js"

const app = Vue.createApp({

    data() {
        return {
            searchText: "",
            showDetail: false
        }
    },
    components: {
        Header,
        Side,
        Main,
        Footer
    },
    methods: {
        goHomeHandler() {
            this.showDetail = false
        },
        goDetailHandler() {
            this.showDetail = true
        }
    }
    ,
    template: `
    <div class="container">
        <Header v-model="searchText" @go-home="goHomeHandler"/>
        <div class="row gx-4">
            <Side />
            <Main :search-text="searchText" :show-detail="showDetail" @go-detail="goDetailHandler"/>
        </div>
        <Footer />
    </div>  
    `
})

app.mount("#app")