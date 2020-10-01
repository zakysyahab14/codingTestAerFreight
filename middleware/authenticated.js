export default function({store, redirect, app}){
    const userInfo = app.$cookies.get('USER_INFO')
    if(userInfo){
        redirect('/')
    }
}