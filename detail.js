export default {
    props: {
        user: {
            type: Object
        }
    },
    template: `
       <div class="d-flex flex-column align-items-center">
            <h3> {{user.first_name}} {{user.last_name}} </h3>
            <img :src="user.avatar" alt="avatar" height="200" class="rounded">
            <p>{{user.email}}</p>
       </div>
    `
}