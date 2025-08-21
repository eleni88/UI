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

                                    <!-- Button to Open the Modal for update Cloud Credentials -->
                                    <button type="button" class="btn btn-secondary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#CredentialsModal"
                                        @click="addCredsClick()">
                                        Add Cloud Credentials
                                    </button>

                                    <!-- Button to Open the Modal for update security questions -->
                                    <button type="button" class="btn btn-secondary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#QuestionsModal"
                                        @click="editQuestionsClick(user)">
                                        Update Security Questions
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

                                <!-- The Password Update Modal -->
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
                                                <input name="password" type="password" class="form-control" v-model="PassChangeForm.OldPassword" required>
                                                <div style="color: red;" v-if="fieldErrors.OldPassword">
                                                    {{ fieldErrors.OldPassword[0] }}
                                                </div>
                                            </div>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text">NewPassword:</span>
                                                <input name="password" type="password" class="form-control" v-model="PassChangeForm.NewPassword" required>
                                                <div style="color: red;" v-if="fieldErrors.NewPassword">
                                                    {{ fieldErrors.NewPassword[0] }} 
                                                </div>
                                            </div>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text">ConfirmPassword:</span>
                                                <input name="password" type="password" class="form-control" v-model="PassChangeForm.ConfirmPassword" required>
                                                <div style="color: red;" v-if="fieldErrors.ConfirmPassword">
                                                    {{ fieldErrors.ConfirmPassword[0] }} 
                                                </div>
                                            </div>                                    
                                            <button type="button" @click="updatePassword()" class="btn btn-secondary">
                                                Update
                                            </button>
                                        </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- The Cloud Credentials Update Modal -->
                                <div class="modal" id="CredentialsModal">
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
                                                <span class="input-group-text">Cloud Provider:</span>
                                                <input name="Cloudid" type="number" class="form-control" v-model="CredentialsForm.Cloudid" required>
                                                <div style="color: red;" v-if="fieldErrors.Cloudid">
                                                    {{ fieldErrors.Cloudid[0] }}
                                                </div>
                                            </div>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text">AccessKeyId:</span>
                                                <input name="Accesskeyid" type="password" class="form-control" v-model="CredentialsForm.Accesskeyid" required>
                                                <div style="color: red;" v-if="fieldErrors.Accesskeyid">
                                                    {{ fieldErrors.Accesskeyid[0] }} 
                                                </div>
                                            </div>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text">SecretAccessKey:</span>
                                                <input name="Secretaccesskey" type="password" class="form-control" v-model="CredentialsForm.Secretaccesskey" required>
                                                <div style="color: red;" v-if="fieldErrors.Secretaccesskey">
                                                    {{ fieldErrors.Secretaccesskey[0] }} 
                                                </div>
                                            </div>  
                                            <div class="input-group mb-3">
                                                <span class="input-group-text">ClientId:</span>
                                                <input name="Clientid" type="password" class="form-control" v-model="CredentialsForm.Clientid" required>
                                                <div style="color: red;" v-if="fieldErrors.Clientid">
                                                    {{ fieldErrors.Clientid[0] }} 
                                                </div>
                                            </div>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text">ClientSecret:</span>
                                                <input name="Clientsecret" type="password" class="form-control" v-model="CredentialsForm.Clientsecret" required>
                                                <div style="color: red;" v-if="fieldErrors.Clientsecret">
                                                    {{ fieldErrors.Clientsecret[0] }} 
                                                </div>
                                            </div>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text">TenantId:</span>
                                                <input name="Tenantid" type="password" class="form-control" v-model="CredentialsForm.Tenantid" required>
                                                <div style="color: red;" v-if="fieldErrors.Tenantid">
                                                    {{ fieldErrors.Tenantid[0] }} 
                                                </div>
                                            </div>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text">SubscriptionId:</span>
                                                <input name="Subscriptionid" type="password" class="form-control" v-model="CredentialsForm.Subscriptionid" required>
                                                <div style="color: red;" v-if="fieldErrors.Subscriptionid">
                                                    {{ fieldErrors.Subscriptionid[0] }} 
                                                </div>
                                            </div>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text">GcpServiceKeyJson:</span>
                                                <input name="Gcpservicekeyjson" type="string" class="form-control" v-model="CredentialsForm.Gcpservicekeyjson" required>
                                                <div style="color: red;" v-if="fieldErrors.Gcpservicekeyjson">
                                                    {{ fieldErrors.Gcpservicekeyjson[0] }} 
                                                </div>
                                            </div>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text">GcpProjectId:</span>
                                                <input name="Gcpservicekeyjson" type="password" class="form-control" v-model="CredentialsForm.Gcpprojectid" required>
                                                <div style="color: red;" v-if="fieldErrors.Gcpservicekeyjson">
                                                    {{ fieldErrors.Gcpservicekeyjson[0] }} 
                                                </div>
                                            </div>
                                            
                                            <button type="button" @click="updateCredentials()" v-if="mode==='edit'" class="btn btn-secondary">
                                                Update
                                            </button>
                                            <button type="button" @click="addCredentials()" v-if="mode==='create'" class="btn btn-secondary">
                                                Add
                                            </button>
                                        </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- The Cloud Credentials Modal -->


                                <!-- The Security Questions Modal -->
                                <div class="modal" id="QuestionsModal">
                                    <div class="modal-dialog modal-xl">
                                        <div class="modal-content">

                                        <!-- Modal Header -->
                                        <div class="modal-header">
                                            <h4 class="modal-title"> {{ modalTitle }} </h4>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                        </div>

                                        <!-- Modal body -->
                                        <div class="modal-body">
                                            <!---------------------------- Question 1 ----------------------------->
                                            <label class="form-label">Question 1:</label>
                                                <select v-model="QuestionsForm.securityQuestion" name="SecurityQuestion" class="form-select" required>
                                                <option value="" disabled>Select a question</option>
                                                <option v-for="question in securityQuestions" :key="'q-' + question" :value="question">
                                                    {{ question }}
                                                </option>
                                                </select>
                                                <div style="color: red;" v-if="fieldErrors.Securityquestion">
                                                    {{ fieldErrors.Securityquestion[0] }}
                                                </div>
                                                
                                            <br>
                                            <label class="form-label">Answer 1:</label>
                                            <input name="securityanswer" type="text" class="form-control" v-model="QuestionsForm.securityAnswer" required/>
                                            <div style="color: red;" v-if="fieldErrors.Securityanswer">
                                                {{ fieldErrors.Securityanswer[0] }}
                                            </div>
                                            <br>
                                            <!---------------------------- Question 2 ----------------------------->
                                            <label class="form-label">Question 2:</label>
                                                <select v-model="QuestionsForm.securityQuestion1" name="SecurityQuestion1" class="form-select" required>
                                                <option value="" disabled>Select a question</option>
                                                <option v-for="question in securityQuestions" :key="'q1-' + question" :value="question">
                                                    {{ question }}
                                                </option>
                                                </select>
                                                <div style="color: red;" v-if="fieldErrors.Securityquestion1">
                                                    {{ fieldErrors.Securityquestion1[0] }}
                                                </div>
                                                
                                            <br>
                                            <label class="form-label">Answer 2:</label>
                                            <input name="securityanswer1" type="text" class="form-control" v-model="QuestionsForm.securityAnswer1" required/>
                                            <div style="color: red;" v-if="fieldErrors.Securityanswer1">
                                                {{ fieldErrors.Securityanswer1[0] }}
                                            </div>
                                            <br>
                                            <!---------------------------- Question 3 ----------------------------->   
                                            <label class="form-label">Question 3:</label>
                                                <select v-model="QuestionsForm.securityQuestion2" name="SecurityQuestion2" class="form-select" required>
                                                <option value="" disabled>Select a question</option>
                                                <option v-for="question in securityQuestions" :key="'q2-' + question" :value="question">
                                                    {{ question }}
                                                </option>
                                                </select>
                                                <div style="color: red;" v-if="fieldErrors.Securityquestion2">
                                                    {{ fieldErrors.Securityquestion2[0] }}
                                                </div>
                                                
                                            <br>
                                            <label class="form-label">Answer 3:</label>
                                            <input name="securityanswer2" type="text" class="form-control" v-model="QuestionsForm.securityAnswer2" required/>
                                            <div style="color: red;" v-if="fieldErrors.Securityanswer2">
                                                {{ fieldErrors.Securityanswer2[0] }}
                                            </div>
                                            <br>

                                            <button type="button" @click="updateQuestions()" class="btn btn-secondary">
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
                                
                                    <table class="table" v-if="user && user.cloudcredentials">
                                        <thead>
                                            <tr>
                                                <th>Cloud Credentials</th>
                                            </tr> 
                                            <tr>
                                                <th>Provider</th>
                                            </tr>  
                                        </thead>
                                        <tbody>
                                            <tr v-for="cred in user.cloudcredentials" :key="user.cloudcredentials.credid">
                                                <td> {{ cred.cloudid }} </td>  
                                                
                                                <td>

                                                <button type="button"
                                                class="btn btn-secondary"
                                                data-bs-toggle="modal"
                                                data-bs-target="#CredentialsModal"
                                                @click="editCredsClick(cred)">
                                                    Edit   
                                                </button>
                                                </td>
                                            </tr>   
                                        </tbody>
                                    </table>  
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
            cloudcreds: null,
            cloudcredsid: 0,
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
            CredentialsForm:{
                Credid: 0,
                Cloudid: 0,
                Accesskeyid: '',
                Secretaccesskey: '',
                Clientid: '',
                clientsecret: '',
                Tenantid: '',
                Subscriptionid: '',
                Gcpservicekeyjson: '',
                Gcpprojectid: ''
            },
            QuestionsForm:{
                securityQuestion: '',
                securityAnswer: '',
                securityQuestion1: '',
                securityAnswer1: '',
                securityQuestion2: '',
                securityAnswer2: '',
            },
            securityQuestions: [
              "What city were you born in?",
              "What is your oldest sibling’s middle name?",
              "What was the first concert you attended?",
              "What was the make and model of your first car?",
              "In what city or town did your parents meet?"
            ],
            fieldErrors: {},
            actionMessage: ''
        };
    },
    methods:{  
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
    clearPassChangeForm(){
            this.PassChangeForm.OldPassword = ''; 
            this.PassChangeForm.NewPassword = '';
            this.PassChangeForm.ConfirmPassword = ''; 
        },
    ClearCredentialsForm(){
            this.CredentialsForm.Credid = 0;
            this.CredentialsForm.Cloudid = 0;
            this.CredentialsForm.Accesskeyid = '';
            this.CredentialsForm.Secretaccesskey = '';
            this.CredentialsForm.Clientid = '';
            this.CredentialsForm.clientsecret = '';
            this.CredentialsForm.Tenantid = '';
            this.CredentialsForm.Subscriptionid = '';
            this.CredentialsForm.Gcpservicekeyjson = '';
            this.CredentialsForm.Gcpprojectid = '';
        },
    clearQuestionsForm(){
            this.QuestionsForm.securityQuestion = '';
            this.QuestionsForm.securityAnswer = '';
            this.QuestionsForm.securityQuestion1 = '';
            this.QuestionsForm.securityAnswer1 = '';
            this.QuestionsForm.securityQuestion2 = '';
            this.QuestionsForm.securityAnswer2 = '';
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
            const response = await fetch(variables.API_URL + "Users/profile", {
                method: 'PUT',
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
                if (data && typeof data === 'object' && data.errors) {
                    this.fieldErrors = data.errors;
                throw new Error(data.errors.message || `HTTP error! status: ${response.status}`);    
              }
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
            this.clearPassChangeForm();
        },
        editCredsClick(cred){
            this.modalTitle="Edit Cloud Credentials";
            this.mode="edit";
            this.cloudcreds=cred;
            this.cloudcredsid=cred.credid;
            this.ClearCredentialsForm();
        },
        addCredsClick(){
            this.modalTitle="Add Cloud Credentials";
            this.mode="create";
            this.ClearCredentialsForm();
        },
    async updatePassword(){
        this.error = null;
        this.fieldErrors = {};

        try{
            if (!this.selectedUser){
                    throw new Error(`User not found`);
                }
            const response = await fetch(variables.API_URL + "passwordchange/update", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
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
                    if (data && typeof data === 'object' && data.errors) {
                        this.fieldErrors = data.errors;
                    throw new Error(data.errors.message || `HTTP error! status: ${response.status}`);    
              }
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
    async updateCredentials(){
        this.error = null;
        this.fieldErrors = {};

        try{
            if ((!this.cloudcreds) && (this.cloudcredsid==0)){
                    throw new Error(`Credentials not found`);
                }
                console.log("this.cloudcredsid",this.cloudcredsid)
                console.log("this.CredentialsForm",this.CredentialsForm)
                this.CredentialsForm.Credid=this.cloudcredsid;
                console.log("this.CredentialsForm.Credid",this.CredentialsForm)
            const response = await fetch(variables.API_URL + "cloudcredentials/update", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.CredentialsForm),
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
                    console.log("updateCredentials");
                    const refreshresponse = await window.refreshToken();
                    if (refreshresponse.ok){
                        await this.updateCredentials();
                    }
                    else{
                        this.$router.push('/login');
                    }
                    return;
                }
                if ((!response.ok) && (response.status != 401)){
                    if (data && typeof data === 'object' && data.errors) {
                        this.fieldErrors = data.errors;
                    throw new Error(data.errors.message || `HTTP error! status: ${response.status}`);    
              }
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
                } 
            this.actionMessage='Cloud credentials updated successfully.'   
            alert(this.actionMessage);     
        }
        catch(err){
            this.error = err.message;
        }
    },
    async addCredentials(){
        this.error = null;
        this.fieldErrors = {};
        console.log("this.CredentialsForm:", this.CredentialsForm);
        try{
            const response = await fetch(variables.API_URL + "cloudcredentials/new", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.CredentialsForm),
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
                    console.log("addCredentials");
                    const refreshresponse = await window.refreshToken();
                    if (refreshresponse.ok){
                        await this.addCredentials();
                    }
                    else{
                        this.$router.push('/login');
                    }
                    return;
                }
                if ((!response.ok) && (response.status != 401)){
                    if (data && typeof data === 'object' && data.errors) {
                        this.fieldErrors = data.errors;
                    throw new Error(data.errors.message || `HTTP error! status: ${response.status}`);    
              }
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
                } 
            this.actionMessage='Cloud credentials added successfully.'   
            alert(this.actionMessage);   
            this.getProfile();  
        }
        catch(err){
            this.error = err.message;
        }   
    },
    async deleteProfile(user){
        try{
            const response = await fetch(variables.API_URL + "Users/profile", {
                method: 'DELETE',
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
    },
    editQuestionsClick(user){
        this.modalTitle="Edit Security Questions";
        this.mode="edit";
        if (user) {
        this.selectedUser=user;  
        }
        this.clearQuestionsForm();
    },
    async updateQuestions(){
        this.error = null;
        this.fieldErrors = {};
        try{
            if (!this.selectedUser){
                    throw new Error(`User or user links not found`);
                } 
            const response = await fetch(variables.API_URL + "Users/updatequestions", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(this.QuestionsForm),
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
                        await this.updateQuestions();
                    }
                    else{
                        this.$router.push('/login');
                    }
                    return;
                }
            if ((!response.ok) && (response.status != 401)){
                    if (data && typeof data === 'object' && data.errors) {
                        this.fieldErrors = data.errors;
                    throw new Error(data.errors.message || `HTTP error! status: ${response.status}`);    
              }
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            } 
            this.actionMessage='Security questions updated successfully.'   
            alert(this.actionMessage); 
            this.getProfile();     
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