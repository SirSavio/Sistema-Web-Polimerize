import api from './api';

export const authenticate = async () => {
    
    const token = localStorage.getItem('adminPolimerizeToken');
    const email = localStorage.getItem('adminPolimerizeEmail');
    const data = {email, token};
    
    const res = await api.post('/session/check', data)
        .then( () => true)
        .catch(() => false)
    ;

    return res;
}