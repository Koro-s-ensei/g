import axios from "axios";

/**
 * 
 * @param {username, password} creds 
 */
export const login = creds => {
    //return axios.post(loginURl, creds)
    return new Promise((resolve, reject) => {
        const { username, password } = creds
        let loginObject={
            identifier: username,
            password: password
          }
        axios
        .post(`http://strapi.telly.network/auth/local`, {
            identifier: username,
            password: password
        })
        .then(response => {
            // Handle success.
            console.log('Well done!');
            console.log('User profile', response.data.user);
            console.log('User token', response.data.jwt);
            if (response.status==200) {
                const user = {
                    userdata: response.data.user,
                    token: response.data.jwt
                }
                localStorage.setItem('user', JSON.stringify(user))
                resolve(user)
            }else{
                reject({
                    msg: 'Invalid Creds'
                })
            }

        })
        .catch(error => {
            // Handle error.
           console.log('An error occurred:', error);
           reject({
            msg: 'Invalid Creds'
             })
        });
    })
}

export const logout = () => {
    localStorage.removeItem('user')
}

export const checkUser = () => {
    return JSON.parse(localStorage.getItem('user'))
}

export const register= creds => {
    return new Promise((resolve, reject) => {
        const { username, email, password, number } = creds
        console.log('creds', creds)
        axios.post(`http://strapi.telly.network/auth/local/register`, {
            username : username,
            email : email,
            password : password
            
        })
        .then(response => {
            // Handle success.
            console.log('Well done!');
            console.log('User profile', response.status);
            
            if (response.status==200) {
                const user = {
                    userdata: response.data.user,
                    token: response.data.jwt
                }
                localStorage.setItem('user', JSON.stringify(user))
                resolve(user)
            }else{
                reject({
                    msg: 'User Already Exists.'
                })
            }

        })
        .catch(error => {
            // Handle error.
           console.log('An error occurred:', error);
           reject({
            msg: 'User Already Exists.'
             })
        });
        
      
    })

}


export const googlelogin = creds => {
    
    return new Promise((resolve, reject) => {
        const { username, email } = creds
        console.log('creds', creds)
        axios.post(`http://strapi.telly.network/auth/local/register`, {
            username : username,
            email : email,
            password : username
            
        })
        .then(response => {
            // Handle success.
            console.log('Well done!');
            console.log('User profile', response.status);
            
            if (response.status==200) {
                const user = {
                    userdata: response.data.user,
                    token: response.data.jwt
                }
                localStorage.setItem('user', JSON.stringify(user))
                resolve(user)
            }else if(response.status==400){
                    console.log('here')
            }
            else{
                reject({
                    msg: 'User Already Exists.'
                })
            }

        })
        .catch(error => {
            // Handle error.
           //console.log(error.response);
           if(error.response.status==400){
            var username=creds.email;
            var password =creds.username;
            console.log('heerer')
            axios
            .post(`http://strapi.telly.network/auth/local`, {
            identifier: username,
            password: password
             })
            .then(response => {
                // Handle success.
                console.log('Well done!');
                console.log('User profile', response.status);
                
                if (response.status==200) {
                    const user = {
                        userdata: response.data.user,
                        token: response.data.jwt
                    }
                    localStorage.setItem('user', JSON.stringify(user))
                    resolve(user)
                }else if(response.status==400){
                        console.log('here')
                }
                else{
                    reject({
                        msg: 'User Already Exists.'
                    })
                }
    
            }).catch(error => {
                // Handle error.
               console.log('An error occurred:', error.response);
               reject({
                msg: 'User Already Exists.'
                 })
            });

           }else{
           reject({
            msg: 'Unable to login'
             })
            }
        });
        
      
    })
}