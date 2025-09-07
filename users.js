const users = {
    template: ` <div class="container p-5">
                    <h4>Users</h4>
                    <!-- Button to Open the Modal -->
                    <button type="button" class="btn btn-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#UsersModal"
                        @click="addClick()">
                        Add User
                    </button>

                    <!-- The UsersModal -->
                    <div class="modal" id="UsersModal">
                        <div class="modal-dialog modal-xl">
                            <div class="modal-content">

                            <!-- Modal Header -->
                            <div class="modal-header">
                                <h4 class="modal-title"> {{ modalTitle }} </h4>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>

                            <!-- Modal body -->
                            <div class="modal-body">
                                <div class="input-group mb-3">
                                    <span>Admin:</span>
                                    <div class="input-group-text">
                                        <input name="admin" type="checkbox" v-model="form.admin">
                                    </div>
                                    <div style="color: red;" v-if="fieldErrors.Admin">
                                        {{ fieldErrors.Admin }}
                                    </div>
                                </div>
                                 <div class="input-group mb-3">
                                    <span>Active:</span>
                                    <div class="input-group-text">
                                        <input name="active" type="checkbox" v-model="form.active">
                                    </div>
                                    <div style="color: red;" v-if="fieldErrors.Active">
                                        {{ fieldErrors.Active }}
                                    </div>
                                </div>
                                <div hidden class="input-group mb-3">
                                    <span class="input-group-text">Userid:</span>
                                    <input name="userid" type="number" class="form-control" v-model="form.userid">
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">First Name:</span>
                                    <input name="firstname" type="text" class="form-control" v-model="form.firstname">
                                    <div style="color: red;" v-if="fieldErrors.Firstname">
                                        {{ fieldErrors.Firstname }}
                                    </div>
                                </div>
                                 <div class="input-group mb-3">
                                    <span class="input-group-text">Last Name:</span>
                                    <input name="lastname" type="text" class="form-control" v-model="form.lastname">
                                    <div style="color: red;" v-if="fieldErrors.Lastname">
                                        {{ fieldErrors.Lastname }}
                                    </div>
                                </div>
                                 <div class="input-group mb-3">
                                    <span class="input-group-text">Username:</span>
                                    <input name="username" type="text" class="form-control" v-model="form.username" autocomplete="username">
                                    <div style="color: red;" v-if="fieldErrors.Username">
                                        {{ fieldErrors.Username }}
                                    </div>
                                </div>
                                 <div class="input-group mb-3" v-if="mode==='create'">
                                    <span class="input-group-text">Password:</span>
                                    <input name="password" type="password" class="form-control" v-model="form.password" autocomplete="new-password">
                                    <div style="color: red;" v-if="fieldErrors.Password">
                                        {{ fieldErrors.Password }}
                                    </div>
                                </div>
                                 <div class="input-group mb-3">
                                    <span class="input-group-text">Email:</span>
                                    <input name="email" type="text" class="form-control" v-model="form.email" autocomplete="email">
                                    <div style="color: red;" v-if="fieldErrors.Email">
                                        {{ fieldErrors.Email }}
                                    </div>
                                </div>
                                 <div class="input-group mb-3">
                                    <span class="input-group-text">Age:</span>
                                    <input name="age" type="number" class="form-control" v-model="form.age">
                                    <div style="color: red;" v-if="fieldErrors.Age">
                                        {{ fieldErrors.Age }}
                                    </div>
                                </div>
                                 <div class="input-group mb-3">
                                    <span class="input-group-text">Organization:</span>
                                    <input name="organization" type="text" class="form-control" v-model="form.organization" autocomplete="organization">
                                    <div style="color: red;" v-if="fieldErrors.Organization">
                                        {{ fieldErrors.Organization }}
                                    </div>
                                </div>
                                 <div class="input-group mb-3">
                                    <span class="input-group-text">Job title:</span>
                                    <input name="jobtitle" type="text" class="form-control" v-model="form.jobtitle">
                                    <div style="color: red;" v-if="fieldErrors.Jobtitle">
                                        {{ fieldErrors.Jobtitle[0] }}
                                    </div>
                                </div>
                                <button type="button" @click="CreateUser()"
                                    v-if="mode==='create'" class="btn btn-secondary">
                                    Create
                                </button>
                                <button type="button" @click="UpdateUser()"
                                    v-if="mode==='edit'" class="btn btn-secondary">
                                    Update
                                </button>
                                <div v-if="error">
                                    <h3>Error: {{ error }}</h3>
                                </div> 
                            </div>
                            </div>
                        </div>
                    </div>

                    <!-- The ViewUsersModal -->
                    <div class="modal" id="ViewUsersModal">
                        <div class="modal-dialog modal-xl">
                            <div class="modal-content">

                                <!-- Modal Header -->
                                <div class="modal-header">
                                    <h4 class="modal-title"> {{ modalTitle }} </h4>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                </div>

                                <!-- Modal body -->
                                <div class="modal-body">
                                    <div>
                                        Active:
                                        <input type="checkbox" name="active" v-model="form.active" disabled>
                                        <br>
                                        Admin:
                                        <input type="checkbox" name="admin" v-model="form.admin" disabled>
                                    </div>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>{{ form.firstname }} {{ form.lastname }} Info</th>
                                            </tr>   
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>First Name:</th>
                                                <td> {{ form.firstname }} </td>
                                            </tr>
                                            <tr>
                                                <th>Last Name:</th>
                                                <td> {{ form.lastname }} </td>
                                            </tr>
                                            <tr>
                                                <th>UserName:</th>
                                                <td> {{ form.username }} </td>
                                            </tr>
                                            <tr>
                                                <th>Email:</th>
                                                <td> {{ form.email }} </td>
                                            </tr>
                                            <tr>
                                                <th>Age:</th>
                                                <td> {{ form.age }} </td>
                                            </tr>
                                            <tr>
                                                <th>Organization:</th>
                                                <td> {{ form.organization }} </td>
                                            </tr>
                                            <tr>
                                                <th>Job title:</th>
                                                <td> {{ form.jobtitle }} </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>


                    <table class="table table-striped">
                        <thead>
                            <tr>
                            <th>
                                <div class="d-flex flex-column">
                                    <h6>Filters</h6>

                                    <div class="input-group mb-3 input-group-sm">
                                        <span class="input-group-text">First name:</span>
                                        <input class="form-control form-control-sm" placeholder="First name" v-model="FirstNameFilter" @keyup="FilterFn()">
                                    </div>
                                    <div class="input-group mb-3 input-group-sm">
                                        <span class="input-group-text">Last name:</span>
                                        <input class="form-control form-control-sm" placeholder="Last name" v-model="LastNameFilter" @keyup="FilterFn()">
                                    </div>
                                    <div class="input-group mb-3 input-group-sm">
                                        <span class="input-group-text">Username:</span>
                                        <input class="form-control form-control-sm" placeholder="User name" v-model="UserNameFilter" @keyup="FilterFn()">
                                    </div>                                 
                                </div>
                                </th>
                            </tr>
                            <tr>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Age</th>
                                <th>Organization</th>
                                <th>Job title</th>
                                <th>Admin</th>
                                <th>Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users" :key="user.usersCollection.userid">
                                <td> {{ user.usersCollection.firstname }} </td>
                                <td> {{ user.usersCollection.lastname }} </td>
                                <td> {{ user.usersCollection.username }} </td>
                                <td> {{ user.usersCollection.email }} </td>
                                <td> {{ user.usersCollection.age }} </td>
                                <td> {{ user.usersCollection.organization }} </td>
                                <td> {{ user.usersCollection.jobtitle }} </td>
                                <td> <input type="checkbox" name="admin" v-model="user.usersCollection.admin" disabled> </td>
                                <td> <input type="checkbox" name="active" v-model="user.usersCollection.active" disabled> </td>
                                <td>

                                    <button type="button"
                                    class="btn btn-secondary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#ViewUsersModal"
                                    @click="ViewClick(user)" v-if="hasLink(user._links, 'self')">
                                        View   
                                    </button>

                                    <button type="button"
                                    class="btn btn-secondary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#UsersModal"
                                    @click="editClick(user)" v-if="hasLink(user._links, 'update_user')">
                                        Edit   
                                    </button>

                                    <button type="button" @click="DeleteUser(user)" v-if="hasLink(user._links, 'delete_user')"
                                    class="btn btn-secondary">
                                        Delete    
                                    </button>
                                </td>
                            </tr>    
                
                        </tbody>
                    </table>

                    <div v-if="error">
                        <h3>Error: {{ error }}</h3>
                    </div> 
                </div>                                  
`,


data(){
    return{
        users: [],
        mode: '',
        selectedUser: null,
        error: null,
        modalTitle: '',
        buttonTitle: '',
        FirstNameFilter: '',
        LastNameFilter: '',
        UserNameFilter: '',
        usersWithoutFilters: [],
        form: {
            userid: 0,
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            password: '',
            age: 18,
            jobtitle: '',
            organization: '',
            admin: false,
            active: true
          },  
        fieldErrors: {},
        actionMessage: ''
    }
    },
    methods:{
         async refreshUsers(){
            this.error = null;
            try{
                const response = await fetch(variables.API_URL + "Users", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
                });
                let data;
                try{
                data = await response.json();
                }
                catch{
                data={};
                } 

                if (response.status === 401){
                    console.log("refreshUsers");
                    const refreshresponse = await window.refreshToken();
                    if (refreshresponse.ok){
                        await this.refreshUsers();
                    }
                    else{
                        this.$router.push('/login');
                    }
                    return;
                }  

                if ((!response.ok) && (response.status != 401)){
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
                } 
                this.users=data; 
                this.usersWithoutFilters=this.users;
            }
            catch(err){
                this.error = err.message;
            }
        },
        confirmValue(){
            let returnValue = false;
            let keepRunning = true;
            while (keepRunning) {
            // Returns a random integer from 1 to 10:
            let randomNumber = Math.floor(Math.random() * 10) + 1;
            let givenNumber = prompt("Please enter the number you see.   "+randomNumber);
            if ((givenNumber != null) && (givenNumber == randomNumber)) {
                alert(`Correct!`);
                keepRunning = false;
                returnValue = true;
                }
            else
            if ((givenNumber == null) || (givenNumber == "")){
                keepRunning = false; 
                returnValue = false;   
            }    
            }
            return returnValue;
        },
        clearForm(){
            this.form.userid=0;
            this.form.firstname='';
            this.form.lastname='';
            this.form.username='';
            this.form.email='';
            this.form.password='';
            this.form.age='';
            this.form.jobtitle='';
            this.form.organization='';
            this.form.admin=false;
            this.form.active=true;
            this.error=null;
        },
        fillForm(user){
            if ((user) && (user.usersCollection)){
                this.form.userid=user.usersCollection.userid;
                this.form.firstname=user.usersCollection.firstname;
                this.form.lastname=user.usersCollection.lastname;
                this.form.username=user.usersCollection.username;
                this.form.email=user.usersCollection.email;
                this.form.age=user.usersCollection.age;
                this.form.jobtitle=user.usersCollection.jobtitle;
                this.form.organization=user.usersCollection.organization;
                this.form.admin=user.usersCollection.admin;
                this.form.active=user.usersCollection.active;    
            }   
        },
        hasLink(links, rel) {
          return links.some(link => link.rel === rel);
        },
        FilterFn(){
            const filterFirstName = this.FirstNameFilter.toLowerCase().trim();
            const filterLastName = this.LastNameFilter.toLowerCase().trim();
            const filterUserName = this.UserNameFilter.toLowerCase().trim();

            this.users = this.usersWithoutFilters.filter(function (el) {
                const fname = el.usersCollection?.firstname?.toLowerCase() || "";
                const lname = el.usersCollection?.lastname?.toLowerCase() || "";
                const uname = el.usersCollection?.username?.toLowerCase() || "";

                return fname.startsWith(filterFirstName) &&
                    lname.startsWith(filterLastName) &&
                    uname.startsWith(filterUserName);
            });
        },
        async ViewClick(user){
            this.modalTitle="View User";
            this.mode="view";  
            
            this.error = null;
            try{
                 console.log('userid:', user.usersCollection.userid);
                const userlink = user._links.find(link => link.rel === 'self');
                if (userlink != null){
              const response = await fetch(userlink.href, {
              method: userlink.method,
              headers: {
                'Content-Type': 'application/json'
              },
              credentials: 'include'
            });
         
            let data;
                try{
                data = await response.json();
                }
                catch{
                data={};
                }    
            
                if (response.status === 401){
                    console.log("ViewClick");
                    const refreshresponse = await window.refreshToken();
                    if (refreshresponse.ok){
                        await this.ViewClick();
                    }
                    else{
                        this.$router.push('/login');
                    }
                    return;
                } 
            if ((!response.ok) && (response.status != 401)){
              throw new Error(data.message || `HTTP error! status: ${response.status}`);
            } 
            let dbUser=data;
            if (dbUser){
                this.fillForm(dbUser)
            }
            else{
                this.clearForm();
            }
        }
    }
        catch(err){
            this.error = err.message;
          }         
        },
        addClick(){
            this.modalTitle="Add User";
            this.mode="create";
            this.selectedUser=null;
            this.clearForm();
        },
        editClick(user){
            this.modalTitle="Edit User";
            this.mode="edit";
            if (user) {
                this.selectedUser=user;
                this.fillForm(user);
            }
            else
                this.clearForm();
        },
        async CreateUser(){
            this.error = null;
            this.fieldErrors = {};
            try{
                const response = await fetch(variables.API_URL + "Users/create", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.form),
                credentials: 'include'
                });
                let data;
                try{
                data = await response.json();
                }
                catch{
                data={};
                }   
                if (response.status === 401){
                    console.log("CreateUser");
                    const refreshresponse = await window.refreshToken();
                    if (refreshresponse.ok){
                        await this.CreateUser();
                    }
                    else{
                        this.$router.push('/login');
                    }
                    return;
                } 
                if ((!response.ok) && (response.status != 401)){
                    if (data && typeof data === 'object') {
                        if (data.errors){
                            this.fieldErrors = data.errors;
                            var jsonstring = JSON.stringify(this.fieldErrors);
                        }
                        else
                        if (data.message){
                            var jsonstring = data.message;    
                        }
              }
                throw new Error(jsonstring || `HTTP error! status: ${response.status}`);
                }
              this.actionMessage='User added successfully.'   
              alert(this.actionMessage);
              this.refreshUsers();
                
            }
            catch(err){
                this.error = err.message;
            }
        },
        async UpdateUser(){
            this.error = null;
            this.fieldErrors = {};
            try{
                if (!this.selectedUser || !this.selectedUser._links){
                    throw new Error(`User or user links not found`);
                }
                const userlink = this.selectedUser._links.find(link => link.rel === 'update_user'); 
                if (userlink != null) {      
                const response = await fetch(userlink.href, {
                method: userlink.method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: bodyStr = JSON.stringify(this.form),
                credentials: 'include'
                });
                let data;
                try{
                data = await response.json();
                }
                catch{
                data={};
                } 

                if (response.status === 401){
                    console.log("UpdateUser");
                    const refreshresponse = await window.refreshToken();
                    if (refreshresponse.ok){
                        await this.UpdateUser();
                    }
                    else{
                        this.$router.push('/login');
                    }
                    return;
                } 

                if ((!response.ok) && (response.status != 401)){
                    if (data && typeof data === 'object') {
                        if (data.errors){
                            this.fieldErrors = data.errors;
                            var jsonstring = JSON.stringify(this.fieldErrors);
                        }
                        else
                        if (data.message){
                            var jsonstring=data.message;    
                        }
                }
                throw new Error(jsonstring || `HTTP error! status: ${response.status}`);
              }
              console.log("data.message", data);
              this.actionMessage='User updated successfully.';
              alert(this.actionMessage);
              this.refreshUsers();
            }
                
            }
            catch(err){
                this.error = err.message;   
            }        
        },
        async DeleteUser(user){
            try{
                if (!this.confirmValue()){
                    alert(`Canceled.`);
                    return;
                }

                if (!user || !user._links){
                    throw new Error(`User or user links not found`);
                }
                const link = user._links.find(link => link.rel === 'delete_user');
                const response = await fetch(link.href, {
                    method: link.method, 
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    credentials: 'include'   
                });
                let data;
                try{
                data = await response.json();
                }
                catch{
                data={};
                } 
                if (response.status === 401){
                    console.log("DeleteUser");
                    const refreshresponse = await window.refreshToken();
                    if (refreshresponse.ok){
                        await this.DeleteUser(user);
                    }
                    else{
                        this.$router.push('/login');
                    }
                    return;
                } 
                if ((!response.ok) && (response.status != 401)){
                    if (data && typeof data === 'object' && data.message) {
                        var jsonstring = data.message;
                }
                throw new Error(jsonstring || `HTTP error! status: ${response.status}`);
              }
              this.actionMessage='User deleted successfully.'   
              alert(this.actionMessage);
              this.refreshUsers();
            }
            catch(err){
                this.error = err.message;    
            }
        }
    },
    mounted(){
    this.refreshUsers();
    this.clearForm();
    this.fillForm();
    }
}