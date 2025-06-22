//const refreshtokens = {
   // methods: {
    window.refreshToken = async function() {
        console.log("refresh tokens method !!!");
        const response = await fetch(variables.API_URL + "Ath/refreshtoken", {
            method: 'POST',
            credentials: 'include'
        });

        return response;
        }
    //}
//}