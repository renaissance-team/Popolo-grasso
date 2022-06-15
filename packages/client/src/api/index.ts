import axios from 'axios';
import {ENDPOINTS} from './consts';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = ENDPOINTS.ROOT;
