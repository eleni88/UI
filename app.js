const routes = [
    { path: '/', component: home },
    { path: '/users', component: users },
    { path: '/simulations', component: simulations },
    { path: '/login', component: login },
    { path: '/register', component: register },
    { path: '/profile', component: Profile }
  ];

  const routeMap = {
      home: '/',
      login: '/login',
      register: '/register',
      profile: '/profile',
      simulations: '/simulations',
      users: '/users'
  };
  
  const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
  });

const app = Vue.createApp({
  data() {
    return {
      links: []
    };
},
methods: {
    getRoutePath(rel){
    return routeMap[rel] || '/';
  },
  async fetchNavigation() {
    const response = await fetch(variables.API_URL+"Navigation",{
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
        },
    });
      const data = await response.json();
      if (response.status === 401){
                console.log("Navigation");
                await window.refreshToken();
                await this.fetchNavigation();
                return;
            } 
      this.links = data._links;
  },
  async handleAction(link) {    
    if ((link.rel === 'login') || (link.rel === 'register') || (link.rel === 'profile')){
      this.$router.push(this.getRoutePath(link.rel));
      return;
    }
    await fetch(link.href, { 
      method: link.method,
      credentials: 'include'
    });

    alert(`Logged out successfully`)
    this.fetchNavigation(); // refresh buttons
    this.$router.push('/');
  }
},
created() {
    this.fetchNavigation();
    window.addEventListener('refresh-navigation', () => {
    this.fetchNavigation();
  });
}
})
app.component('security-questions', questions);
app.use(router);
app.mount('#simapp');