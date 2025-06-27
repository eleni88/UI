const login = { template: `<div class="container p-5">
                            <h4>Login</h4>
                                <form @submit.prevent="submitLogin" id="loginform">
                                    <label class="form-label">UserName:</label><br>
                                    <input v-model="username" name="username" type="text" class="form-control" form="loginform" required />
                                    <div style="color: red;" v-if="fieldErrors.Username">
                                        {{ fieldErrors.Username[0] }}
                                    </div>
                                    <br>
                                    <label class="form-label">Password:</label><br>
                                    <input v-model="password" name="password" type="password" class="form-control" form="loginform" required />
                                    <div style="color: red;" v-if="fieldErrors.Password">
                                        {{ fieldErrors.Password[0] }}
                                    </div>
                                    <br>
                                    <button type="submit" class="btn btn-secondary" form="loginform">Login</button>
                                </form>
                                <div>

                                <!-- Button to Open the Modal for reset password -->
                                <button type="button" class="btn btn-secondary"
                                    @click="editPassClick()">
                                    Forgot Password
                                </button>
                                </div>

                                <!-- Security Questions Modal -->
                                <div class="modal fade" id="SecurityQuestionModal" tabindex="-1">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title">Confirm Action</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                            </div>
                                            <div class="modal-body">
                                                <security-questions ref="securityQuestionComponent" />
                                            </div>
                                            <div class="modal-footer">
                                                <button class="btn btn-secondary" @click="GenerateTmpCode()">Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- The Password Reset Modal -->
                                <div class="modal" id="PasswordModal">
                                    <div class="modal-dialog modal-xl">
                                        <div class="modal-content">

                                        <!-- Modal Header -->
                                        <div class="modal-header">
                                            <h4 class="modal-title"> Password reset </h4>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                        </div>

                                        <!-- Modal body -->
                                        <div class="modal-body">
                                            <div class="input-group mb-3">
                                                <span class="input-group-text">Username:</span>
                                                <input name="UserName" type="text" class="form-control" v-model="PassChangeForm.UserName" required>
                                            </div>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text">OldPassword:</span>
                                                <input name="password" type="text" class="form-control" v-model="PassChangeForm.TempPassword" required>
                                            </div>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text">NewPassword:</span>
                                                <input name="password" type="text" class="form-control" v-model="PassChangeForm.NewPassword" required>
                                            </div>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text">ConfirmPassword:</span>
                                                <input name="password" type="text" class="form-control" v-model="PassChangeForm.ConfirmPassword" required>
                                            </div>                                    
                                            <button type="button" @click="ResetPassword()" class="btn btn-secondary">
                                                Update
                                            </button>
                                        </div>
                                        </div>
                                    </div>
                                </div>


                                <div v-if="error">
                                    <h3>Error: {{ error }}</h3>
                                </div>
                            </div>` ,

data(){
    return{
        username: '',
        password: '',
        error: null,
        submitmessage: '',
        fieldErrors: {},
        PassChangeForm:{ 
                UserName: '',
                TempPassword: '', 
                NewPassword: '',
                ConfirmPassword: '' 
            },
        fieldErrors: {},
        emailSent: false    
    };
   },
   methods: {
    async submitLogin(){
        try{
          const response = await fetch(variables.API_URL + "Ath/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.username,
                password: this.password
            })
        });
        let data;
        try{
            data = await response.json();
        }
        catch{
            data={};
        }
        if (!response.ok){
            if (data && typeof data === 'object' && data.errors) {
                this.fieldErrors = data.errors;
            }
            throw new Error(this.fieldErrors || `HTTP error! status: ${response.status}`);
        }
            this.submitmessage = `Login successfully`;
            alert(this.submitmessage);
            await new Promise(resolve => setTimeout(resolve, 200));
            const testresponse = await fetch(variables.API_URL + "Ath/test-All", {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json'
                },
                credentials: 'include'
              });
            if (testresponse.ok){
                window.dispatchEvent(new Event('refresh-navigation')); // refresh buttons
              }
            this.$router.push('/');
        }
        catch (err){
            this.error = err.message;
        }
    },
    async SendEmail(usrname){
        const response = await fetch(variables.API_URL + "Gmail/send", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: usrname}),
        });
        let data;
                try{
                data = await response.json();
                }
                catch{
                data={};
                } 
                if (!response.ok){
                        throw new Error(data.message || `HTTP error! status: ${response.status}`);
                        } 
                this.submitmessage=data.message;
                this.emailSent=true;   
                alert(this.submitmessage);         

    },
    editPassClick(){
        new bootstrap.Modal(document.getElementById("SecurityQuestionModal")).show();
    },
    async GenerateTmpCode(){
       try{
            const component = this.$refs.securityQuestionComponent;
            component.submitQuestions( async () => {
            var usrname = component.username;
            console.log("username", usrname);
            const response = await fetch(variables.API_URL + "PasswordChange/generate", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: usrname

              })
        });
            if (!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
                } 
            this.SendEmail(usrname);     
            bootstrap.Modal.getInstance(document.getElementById("SecurityQuestionModal")).hide();  
            if (this.emailSent){
                this.OpenResetPassModal();
                this.emailSent=false;
                } 
        })
       }
       catch(err){
        this.error = err.message; 
       } 
    },
    OpenResetPassModal(){
        new bootstrap.Modal(document.getElementById("PasswordModal")).show();    
    },
    async ResetPassword(){
        try{
            const response = await fetch(variables.API_URL + "PasswordChange/reset", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                UserName: this.PassChangeForm.username,
                TempPassword: this.PassChangeForm.TempPassword,
                NewPassword: this.PassChangeForm.NewPassword,
                ConfirmPassword: this.PassChangeForm.ConfirmPassword
              })
        });
        let data;
                try{
                data = await response.json();
                }
                catch{
                data={};
                } 
                 if (!response.ok){
                    if (data && typeof data === 'object' && data.errors) {
                this.fieldErrors = data.errors;
                var jsonstring = JSON.stringify(this.fieldErrors);
              }
                throw new Error(jsonstring || `HTTP error! status: ${response.status}`);
                }
                this.submitmessage = data.message || `Password updated successfully.`
                alert(this.submitmessage);
                bootstrap.Modal.getInstance(document.getElementById("PasswordModal")).hide(); 
        }   
        catch(err){
            this.error = err.message; 
        } 
    }
   }
};