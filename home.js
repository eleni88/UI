const home = {
    template:`  <div class="container">
                    <h1>Home page</h1>
                </div>
                <div class="container">
                    <button @click="testUser">Test User</button>
                    <li> {{ message }}  </li>
                </div>
                `,
     data(){
        return{
            messageWelcome: 'Welcome ! ',
            message: 'Load.. !'
        };
     },
     methods: {
        async testUser(){
            const response = await fetch(variables.API_URL + "Ath/test-All", {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json'
            },
                credentials: 'include'
              });
              
              if (response.ok) {
                const data = await response.json();
                this.message = data.message;
              } else {
                this.message = ' UnAuthorized !!!!!!';
              }
        }
     }        
};