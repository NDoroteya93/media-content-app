import { environment } from '../../environments/environment';
const API_KEY = 'AIzaSyCTlJB_qE7t3VOmBBg5lCfkr-zokQ3DYKg';
const CX_ID = '001594333815217302797:j87kpv9_bng';

const BASE_CONFIG: any = {
  youTubeEndpoint: 'https://www.googleapis.com/youtube/v3/search',
  customSearchEndpoint: 'https://www.googleapis.com/customsearch/v1/search',
  api_key: API_KEY,
  cx_id: CX_ID
};

const configsMap: any = {
  'dev': {
    ...BASE_CONFIG
  },
  'prod': {
    ...BASE_CONFIG
  }
};

const CONFIG = configsMap[environment['envName']];
export default CONFIG;
