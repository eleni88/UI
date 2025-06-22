const Profile = { template: `<div class="container p-5">
                                <h4>My profile</h4>
                                <div v-if="user">
                                <h5> {{ user.firstname }} {{ user.lastname }}</h5>
                                </div>
                                <div v-if="user">
                                <!-- Button to Open the Modal for update profile -->
                                <button type="button" class="btn btn-secondary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#ProfileModal"
                                    @click="editClick(user)">
                                    Update Profile
                                </button>

                                 <!-- Button to Open the Modal for update password -->
                                <button type="button" class="btn btn-secondary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#PasswordModal"
                                    @click="editPassClick(user)">
                                    Update Password
                                </button>
                                

                                <button type="button" @click="deleteProfile(user)" v-if="!user.admin"
                                    class="btn btn-secondary">
                                        Delete    
                                </button>
                                </div>


                                <!-- The Profile Modal -->
                                <div class="modal" id="ProfileModal">
                                    <div class="modal-dialog modal-xl">
                                        <div class="modal-content">

                                        <!-- Modal Header -->
                                        <div class="modal-header">
                                            <h4 class="modal-title"> {{ modalTitle }} </h4>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                        </div>

                                        <!-- Modal body -->
                                        <div class="modal-body">
                                            <div hidden class="input-group mb-3">
                                                <span class="input-group-text">Userid:</span>
                                                <input name="userid" type="number" class="form-control" v-model="form.userid">
                                            </div>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text">First Name:</span>
                                                <input name="firstname" type="text" class="form-control" v-model="form.firstname">
                                            </div>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text">Last Name:</span>
                                                <input name="lastname" type="text" class="form-control" v-model="form.lastname">
                                            </div>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text">Username:</span>
                                                <input name="username" type="text" class="form-control" v-model="form.username" autocomplete="username">
                                            </div>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text">Email:</span>
                                                <input name="email" type="text" class="form-control" v-model="form.email" autocomplete="email">
                                            </div>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text">Age:</span>
                                                <input name="age" type="number" class="form-control" v-model="form.age">
                                            </div>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text">Organization:</span>
                                                <input name="organization" type="text" class="form-control" v-model="form.organization" autocomplete="organization">
                                            </div>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text">Job title:</span>
                                                <input name="jobtitle" type="text" class="form-control" v-model="form.jobtitle">
                                            </div>
                                        
                                            <button type="button" @click="updateProfile()" class="btn btn-secondary">
                                                Update
                                            </button>
                                        </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- The Password Modal -->
                                <div class="modal" id="PasswordModal">
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
                                                <span class="input-group-text">OldPassword:</span>
                                                <input name="password" type="text" class="form-control" v-model="PassChangeForm.OldPassword" required>
                                            </div>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text">NewPassword:</span>
                                                <input name="password" type="text" class="form-control" v-model="PassChangeForm.NewPassword" required>
                                            </div>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text">ConfirmPassword:</span>
                                                <input name="password" type="text" class="form-control" v-model="PassChangeForm.ConfirmPassword" required>
                                            </div>                                    
                                            <button type="button" @click="updatePassword()" class="btn btn-secondary">
                                                Update
                                            </button>
                                        </div>
                                        </div>
                                    </div>
                                </div>


                                <div v-if="user">
                                        Active:
                                        <input type="checkbox" name="active" v-model="user.active" disabled>
                                        <br>
                                        Admin:
                                        <input type="checkbox" name="admin" v-model="user.admin" disabled>
                                </div>
                                <table class="table" v-if="user">
                                    <thead>
                                        <tr>
                                            <th>Personal Info</th>
                                        </tr>   
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>First Name:</th>
                                            <td> {{ user.firstname }} </td>
                                        </tr>
                                        <tr>
                                            <th>Last Name:</th>
                                            <td> {{ user.lastname }} </td>
                                        </tr>
                                         <tr>
                                            <th>UserName:</th>
                                            <td> {{ user.username }} </td>
                                        </tr>
                                        <tr>
                                            <th>Email:</th>
                                            <td> {{ user.email }} </td>
                                        </tr>
                                        <tr>
                                            <th>Age:</th>
                                            <td> {{ user.age }} </td>
                                        </tr>
                                        <tr>
                                            <th>Organization:</th>
                                            <td> {{ user.organization }} </td>
                                        </tr>
                                        <tr>
                                            <th>Job title:</th>
                                            <td> {{ user.jobtitle }} </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p v-else>Loading...</p>
                                <div v-if="error">
                                  <h3>Error: {{ error }}</h3>
                                </div>    
                            </div
    
    ` ,

    data(){
        return{
            user: null,
            error: null,
            mode: '',
            selectedUser: null,
            modalTitle: '',
            buttonTitle: '',
            form: {
                userid: 0,
                firstname: '',
                lastname: '',
                username: '',
                email: '',
                password: '',
                age: 18,
                jobtitle: '',
                organization: ''
            },
            PassChangeForm:{ 
                OldPassword: '', 
                NewPassword: '',
                ConfirmPassword: '' 
            },
            fieldErrors: {},
            actionMessage: ''
        };
    },
    methods:{
        getScrfToken(){
        const csrf = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrf_token='))
        ?.split('=')[1];
        return csrf;
     },    
     async getProfile(){
        try{
        const response = await fetch(variables.API_URL + "Users/profile", {
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
                const refreshresponse = await window.refreshToken();
                if (refreshresponse.ok){
                    await this.getProfile();
                }
                else{
                    this.$router.push('/login');
                }
                return;
            }   
            
            if ((!response.ok) && (response.status != 401)){
              throw new Error(data.message || `HTTP error! status: ${response.status}`);
            } 
            this.user=data;

        }
        catch(err){
            this.error = err.message;
          }         
    },
    editClick(user){
            this.modalTitle="Edit User";
            this.mode="edit";
            if (user) {
            this.selectedUser=user;
            this.form.userid=user.userid;
            this.form.firstname=user.firstname;
            this.form.lastname=user.lastname;
            this.form.username=user.username;
            this.form.email=user.email;
            this.form.age=user.age;
            this.form.jobtitle=user.jobtitle;
            this.form.organization=user.organization;
            };
        },
    async updateProfile(){
        this.error = null;
        this.fieldErrors = {};
        try{
            if (!this.selectedUser){
                    throw new Error(`User or user links not found`);
                }
            const csrf = getScrfToken();    
            const response = await fetch(variables.API_URL + "Users/profile", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf 
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
                    console.log("updateProfile");
                    const refreshresponse = await window.refreshToken();
                    if (refreshresponse.ok){
                        await this.updateProfile();
                    }
                    else{
                        this.$router.push('/login');
                    }
                    return;
                }
            if ((!response.ok) && (response.status != 401)){
              throw new Error(data.message || `HTTP error! status: ${response.status}`);
            } 
            this.actionMessage='Profile updated successfully.'   
            alert(this.actionMessage); 
            this.getProfile();     
        }
        catch(err){
            this.error = err.message;
        }
    },
     editPassClick(user){
            this.modalTitle="Edit Password";
            this.mode="edit";
            if (user) {
            this.selectedUser=user;
            };
        },
    async updatePassword(){
        this.error = null;
        this.fieldErrors = {};

        try{
            if (!this.selectedUser){
                    throw new Error(`User not found`);
                }
            const csrf = getScrfToken();
            const response = await fetch(variables.API_URL + "passwordchange/update", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf 
                },
                body: JSON.stringify(this.PassChangeForm),
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
                    console.log("updatePassword");
                    const refreshresponse = await window.refreshToken();
                    if (refreshresponse.ok){
                        await this.updatePassword();
                    }
                    else{
                        this.$router.push('/login');
                    }
                    return;
                }
                if ((!response.ok) && (response.status != 401)){
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
                } 
            this.actionMessage='Password updated successfully.'   
            alert(this.actionMessage); 
            this.getProfile();     
        }
        catch(err){
            this.error = err.message;
        }

    },
    async deleteProfile(user){
        try{
            const csrf = getScrfToken();
            const response = await fetch(variables.API_URL + "Users/profile", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf 
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
                    console.log("deleteProfile");
                    const refreshresponse = await window.refreshToken();
                    if (refreshresponse.ok){
                        await this.deleteProfile(user);
                    }
                    else{
                        this.$router.push('/login');
                    }
                    return;
                }
                if ((!response.ok) && (response.status != 401)){
              throw new Error(data.message || `HTTP error! status: ${response.status}`);
            } 
            this.actionMessage='Profile deleted successfully.'
            alert(this.actionMessage);
            window.dispatchEvent(new Event('refresh-navigation')); // refresh buttons
            this.$router.push('/');
        }
        catch(err){
            this.error = err.message;    
        }
    }
},
    mounted(){
        this.getProfile();
    }

};