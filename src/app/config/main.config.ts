import { environment } from '../../environments/environment';
// const API_KEY = 'AIzaSyCTlJB_qE7t3VOmBBg5lCfkr-zokQ3DYKg';
// const CX_ID = '001594333815217302797:j87kpv9_bng ';
const API_KEY = 'AIzaSyBvGYmEZ8I7h79MPQt8jZjzBegZ-EoLeds';
const CX_ID = '016851634814116535238:tpkfc_udqz4';

const BASE_CONFIG: any = {
  youTubeEndpoint: 'https://www.googleapis.com/youtube/v3/search',
  customSearchEndpoint: 'https://content.googleapis.com/customsearch/v1',
  api_key: API_KEY,
  cx_id: CX_ID,
  storageKey: 'media-app-data',
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
