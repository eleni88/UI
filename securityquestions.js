const questions = { template: ` 
                                  <div>
                                    <p>Answer to one of the questions:</p>
                                    <form @submit.prevent="submitQuestions" id="questionsform">

                                      <label for="Username">Username :</label>
                                      <input type="text" v-model="username" id="Username" form="questionsform" required/>
                                      <div style="color: red;" v-if="fieldErrors.Username">
                                        {{ fieldErrors.Username[0] }}
                                      </div> 
                                      <br>
                                      <!---------------------------- Question  ----------------------------->
                                      <label for="SecurityQuestion">Question:</label>
                                        <select v-model="selectedQuestion" id="SecurityQuestion" name="SecurityQuestion" form="questionsform" required>
                                          <option v-for="question in securityQuestions" :key="'q-' + question" :value="question">
                                            {{ question }}
                                          </option>
                                        </select>
                                        <div style="color: red;" v-if="fieldErrors.Securityquestion">
                                        {{ fieldErrors.Securityquestion[0] }}
                                        </div>
                                      <br>
                                      <label for="SecurityAnswer">Answer :</label>
                                      <input type="text" v-model="answer" id="SecurityAnswer" form="questionsform" required/>
                                      <div style="color: red;" v-if="fieldErrors.Securityanswer">
                                        {{ fieldErrors.Securityanswer[0] }}
                                      </div> 
                                     
                                    </form>
                                    <div v-if="error">
                                      <h3>Error: {{ error }}</h3>
                                    </div>
                                  </div>
    
    `,
    data(){
        return{
            error: null,
            fieldErrors: {},
            securityQuestions: [
              "What city were you born in?",
              "What is your oldest sibling’s middle name?",
              "What was the first concert you attended?",
              "What was the make and model of your first car?",
              "In what city or town did your parents meet?"
            ],
            selectedQuestion: '',
            answer: '',
            username: ''
        };
    },
    methods: {
        async submitQuestions(onSuccess){
          try{
            if (this.selectedQuestion && !this.answer){
              alert(`Answer must not be empty. Try again.`);
              return;             
            }
            const response = await fetch(variables.API_URL + "Users/questions",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                Securityquestion: this.selectedQuestion,
                Securityanswer: this.answer,
                username: this.username
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
                  console.log('this.fieldErrors :', this.fieldErrors );
                  var jsonstring = JSON.stringify(this.fieldErrors);
                  throw new Error(jsonstring || `HTTP error! status: ${response.status}`);
                }
                  throw new Error(data.message || `HTTP error! status: ${response.status}`);  
               } 
               if (onSuccess && typeof onSuccess === 'function') {
                  onSuccess();
                }          
          }
          catch(err){
            this.error = err.message;
          }
           
        }
    }
}