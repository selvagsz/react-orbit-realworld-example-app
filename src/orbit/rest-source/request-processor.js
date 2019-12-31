import {JSONAPIRequestProcessor} from '@orbit/jsonapi';
import { clone } from '@orbit/utils';

export default class RESTRequestProcessor extends JSONAPIRequestProcessor {
  buildFetchSettings(options = {}, customSettings) {
    let settings = super.buildFetchSettings(...arguments);
    debugger
    if (settings && settings.params) {
      settings = clone(settings);
      if (settings.params.page) {
        let pageParams = settings.params.page;
        delete settings.params.page;
        settings.params = { ...settings.params, ...pageParams };
      }

      if (settings.params.filter) {
        let filterParams = settings.params.filter;
        delete settings.params.filter;
        filterParams = filterParams.reduce((params, filterParam) => {
          params = { ...params, ...filterParam }
          return params;
        }, {})
        settings.params = { ...settings.params, ...filterParams };
      }
    }
    return settings;
  }
}
