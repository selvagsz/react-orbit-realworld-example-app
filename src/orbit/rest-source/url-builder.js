import {JSONAPIURLBuilder} from '@orbit/jsonapi';

export default class RESTAPIURLBuilder extends JSONAPIURLBuilder {
  resourcePath(type, id) {
    if (type === 'author') {
      return `profiles/${id}`
    } else {
      return super.resourcePath(type, id);
    }
  }
}
