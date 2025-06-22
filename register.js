const register = { template: `<div class="container p-5">
                                <h4>Register</h4>
                                <form @submit.prevent="submitRegister" class="was-validated" id="submitform">
                                  <label class="form-label">First Name:</label><br>
                                  <input v-model="form.firstname" name="firstname" type="text" class="form-control" form="submitform" required minlength="5" maxlength="100"/>
                                  <div style="color: red;" v-if="fieldErrors.Firstname">
                                    {{ fieldErrors.Firstname[0] }}
                                  </div>
                                  <div class="invalid-feedback">Please fill out this field.</div>
                                  <br>
                                  <label class="form-label">Last Name:</label><br>
                                  <input v-model="form.lastname" name="lastname" type="text" class="form-control" form="submitform" required minlength="5" maxlength="100"/>
                                  <div style="color: red;" v-if="fieldErrors.Lastname">
                                    {{ fieldErrors.Lastname[0] }}
                                  </div>
                                  <div class="invalid-feedback">Please fill out this field.</div>
                                  <br>
                                  <label class="form-label">UserName:</label><br>
                                  <input v-model="form.username" name="username" type="text" class="form-control" form="submitform" required minlength="5" maxlength="100"/>
                                  <div style="color: red;" v-if="fieldErrors.Username">
                                    {{ fieldErrors.Username[0] }}
                                  </div>
                                  <div class="invalid-feedback">Please fill out this field.</div>
                                  <br>
                                  <label class="form-label">Password:</label><br>
                                  <input v-model="form.password" name="password" type="password" class="form-control" form="submitform" required pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#^])[A-Za-z\\d@$!%*?&#^]{10,}$'
                                  title="Invalid password. Password must be at least 10 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."/>
                                  <div style="color: red;" v-if="fieldErrors.Password">
                                    {{ fieldErrors.Password[0] }}
                                  </div>
                                  <div class="invalid-feedback">Please fill out this field.</div>
                                  <br>
                                  <label class="form-label">Email:</label><br>
                                  <input v-model="form.email" name="email" type="email" class="form-control" form="submitform" required />
                                  <div style="color: red;" v-if="fieldErrors.Email">
                                    {{ fieldErrors.Email[0] }}
                                  </div>
                                  <div class="invalid-feedback">Please fill out this field.</div>
                                  <br>
                                  <label class="form-label">Organization:</label><br>
                                  <input v-model="form.organization" name="organization" type="text" class="form-control" form="submitform"/>
                                  <div style="color: red;" v-if="fieldErrors.Organization">
                                    {{ fieldErrors.Organization[0] }}
                                  </div>
                                  <br>
                                  <label class="form-label">Job Title:</label><br>
                                  <input v-model="form.jobtitle" name="jobtitle" type="text" class="form-control" form="submitform"/>
                                  <div style="color: red;" v-if="fieldErrors.Jobtitle">
                                    {{ fieldErrors.Jobtitle[0] }}
                                  </div>
                                  <br>
                                  <label class="form-label">Age:</label><br>
                                  <input v-model="form.age" name="age" type="number" class="form-control" form="submitform" min="18" max="99"/>
                                  <div style="color: red;" v-if="fieldErrors.Age">
                                    {{ fieldErrors.Age[0] }}
                                  </div>
                                  <br>
                                  <br>
                                  <br>
                                  <div>
                                    <p>Complete the answer to three out of the five questions bellow:</p>
                                    <div>
                                     <!---------------------------- Question 1 ----------------------------->
                                      <label class="form-label">Question 1:</label>
                                        <select v-model="form.securityQuestion" name="SecurityQuestion" class="form-select" form="submitform" required>
                                          <option value="" disabled>Select a question</option>
                                          <option v-for="question in securityQuestions" :key="'q-' + question" :value="question">
                                            {{ question }}
                                          </option>
                                        </select>
                                        <div style="color: red;" v-if="fieldErrors.Securityquestion">
                                          {{ fieldErrors.Securityquestion[0] }}
                                        </div>
                                        <div class="invalid-feedback">Please fill out this field.</div>
                                      <br>
                                      <label class="form-label">Answer 1:</label>
                                      <input name="securityanswer" type="text" class="form-control" form="submitform" v-model="form.securityAnswer" required/>
                                      <div class="invalid-feedback">Please fill out this field.</div> 
                                      <br>
                                     <!---------------------------- Question 2 ----------------------------->
                                      <label class="form-label">Question 2:</label>
                                        <select v-model="form.securityQuestion1" name="SecurityQuestion1" class="form-select" form="submitform" required>
                                          <option value="" disabled>Select a question</option>
                                          <option v-for="question in securityQuestions" :key="'q1-' + question" :value="question">
                                            {{ question }}
                                          </option>
                                        </select>
                                        <div style="color: red;" v-if="fieldErrors.Securityquestion1">
                                          {{ fieldErrors.Securityquestion1[0] }}
                                        </div>
                                        <div class="invalid-feedback">Please fill out this field.</div>
                                      <br>
                                      <label class="form-label">Answer 2:</label>
                                      <input name="securityanswer1" type="text" class="form-control" form="submitform" v-model="form.securityAnswer1" required/>
                                      <div class="invalid-feedback">Please fill out this field.</div> 
                                      <br>
                                     <!---------------------------- Question 3 ----------------------------->   
                                      <label class="form-label">Question 3:</label>
                                        <select v-model="form.securityQuestion2" name="SecurityQuestion2" class="form-select" form="submitform" required>
                                          <option value="" disabled>Select a question</option>
                                          <option v-for="question in securityQuestions" :key="'q2-' + question" :value="question">
                                            {{ question }}
                                          </option>
                                        </select>
                                        <div style="color: red;" v-if="fieldErrors.Securityquestion2">
                                          {{ fieldErrors.Securityquestion2[0] }}
                                        </div>
                                        <div class="invalid-feedback">Please fill out this field.</div>
                                      <br>
                                      <label class="form-label">Answer 3:</label>
                                      <input name="securityanswer2" type="text" class="form-control" form="submitform" v-model="form.securityAnswer2" required/>
                                      <div class="invalid-feedback">Please fill out this field.</div>
                                    </div>
                                    
                                </div>
                                  <br>
                                  <button type="submit" class="btn btn-secondary" form="submitform">Register</button>
                                </form>

                                <div v-if="error">
                                  <h3>Error: {{ error }}</h3>
                                </div>
                                
                              </div>
    ` ,

    data(){
        return{
          submitmessage: '',
          error: null,
          form: {
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            email: '',
            organization: '',
            jobtitle: '',
            age: '',
            admin: false,
            securityQuestion: '',
            securityAnswer: '',
            securityQuestion1: '',
            securityAnswer1: '',
            securityQuestion2: '',
            securityAnswer2: '',
            active: true
          },
            securityQuestions: [
              "What city were you born in?",
              "What is your oldest sibling’s middle name?",
              "What was the first concert you attended?",
              "What was the make and model of your first car?",
              "In what city or town did your parents meet?"
            ],
            fieldErrors: {}
          };
    },
    methods: {
        async submitRegister(){
          this.error = null;
          this.fieldErrors = {};
          
          try{
            const response = await fetch(variables.API_URL + "Ath/register", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(this.form)
            });
            let data;
            try{
             data = await response.json();
            }
            catch{
              data={};
            }
            if (!response.ok) {
              if (data && typeof data === 'object' && data.errors) {
                this.fieldErrors = data.errors;
              }
              throw new Error(data.errors.message || `HTTP error! status: ${response.status}`);
            }
           
            this.submitmessage = `Registration successfully`;
            alert(this.submitmessage);
            this.$router.push('/login');
          }
          catch (err){
            this.error = err.message;
          }         
        }
    }
};