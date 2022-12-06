import jwtDecode from 'jwt-decode';

const useCheckTokenExpired = () => { 
    let isExpired = false;
    const token = localStorage.getItem('tokenAuth');
    // const token = Decrypts();
    if(token) {
        const decodedToken: any = jwtDecode(token);
        const currentDate = new Date();
        // JWT exp is in seconds
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            localStorage.removeItem('tokenAuth');
        } else {
            isExpired = true;      
        }
    }
    else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        isExpired = true;
    }    
}

export default useCheckTokenExpired