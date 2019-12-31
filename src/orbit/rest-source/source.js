import JSONAPISource from '@orbit/jsonapi';
import RESTSerializer from './serializer';
import RESTRequestProcessor from './request-processor';
import RESTURLBuilder from './url-builder'

export default class RESTSource extends JSONAPISource {
  constructor(settings = {}) {
    settings.SerializerClass = settings.SerializerClass || RESTSerializer;
    settings.RequestProcessorClass = settings.RequestProcessorClass || RESTRequestProcessor;
    settings.URLBuilderClass = settings.URLBuilderClass || RESTURLBuilder;
    super(settings);
  }
}
