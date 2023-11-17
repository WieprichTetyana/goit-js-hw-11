import axios from 'axios';

export class PhotoAPI {
  static API_KEY = '10576665-e62c3128b6abe1ee57cde63fd';
  
  constructor() {
    this.q = null;
    this.page = 1;
    this.perPage = 40;
    this.totalPage = 1;
    axios.defaults.baseURL = 'https://pixabay.com';
  }
  
  fetchPhotoByQuery() {
    const axiosOptions = {
      params: {
        key: PhotoAPI.API_KEY,
        q: this.q,
        page: this.page,
        per_page: this.perPage,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
     
      }
    };
    return axios.get('/api/', axiosOptions)
      .then(res => res.data)
      .catch(err => console.log(err));
  }
}
