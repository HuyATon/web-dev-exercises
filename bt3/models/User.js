class User {

    constructor(id, email, firstName, lastName, avatar) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.avatar = avatar;
    }

    static createFromJson(json) {
        const { id, email, first_name, last_name, avatar } = json;
        return new User(id, email, first_name, last_name, avatar);
    }

    setEmail(email) {
        this.email = email;
    }
    setFirstName(firstName) {
        this.firstName = firstName;
    }
    setLastName(lastName) {
        this.lastName = lastName;
    }
}

export default User