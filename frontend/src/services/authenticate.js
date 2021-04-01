export const authenticate = () => {
    const token = localStorage.getItem('adminPolimerizeName');

    if(token) return true;
    return false;
} 