export default {
    props: {
        modelValue: {
            type: String,
            default: ''
        }
    },
    computed: {
        searchText: {
            get() {
                return this.modelValue
            },
            set(value) {
                this.$emit('update:modelValue', value)
            }
        }
    },
    emits: ['goHome', 'update:modelValue'],
    template: `
       <div class="row">
            <div class="col">
                <div class="border rounded text-center bg-custom p-3">
                    <h2 class="text-color-custom">VueJs</h2>
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col">
                <nav class="navbar bg-body-tertiary">
                    <div class="container-fluid">
                      <h3> <a class="navbar-brand" @click="$emit('goHome')"  id="home-button" >Home</a> </h3>
                      <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="searchText">
                        <button class="btn btn-outline-success" type="submit">Search</button>
                      </form>
                    </div>
                  </nav>
            </div>
        </div>
    `
}