window.getScrfToken = async function() {
    const csrf = document.cookie
        .split('; ')
        .find(row => row.startsWith('CsrfToken='))
        ?.split('=')[1];
        
        console.log('CSRF', csrf);
        return csrf;
}