const home = {
    template:`  <div class="container">
                    <h1>Home page</h1>
                </div>
                <div class="container">
                    <p id="messageWelcome">Loading...</p>
                    <button @click="fetchWelcomeMessage">Load Message</button>
                </div>
                <div>
                    <button @click="testUser">Test User</button>
                    <li> {{ message }}  </li>
                </div>
                `,
     data(){
        return{
            messageWelcome: 'Welcome ! ',
            message: 'lalalalala !'
        };
     },
     methods: {
        fetchWelcomeMessage(){
            console.log('Button Clicked!!!!!')
        },
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
                alert(`${this.message} authenticated !!!!!!`)
              } else {
                this.message = ' UnAuthorized !!!!!!';
                alert(`${this.message} UnAuthorized !!!!!!`)
              }
        }
     }        
};