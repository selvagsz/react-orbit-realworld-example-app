import {deepSet} from '@orbit/utils';
import {JSONAPISerializer} from '@orbit/jsonapi';

export default class RESTSerializer extends JSONAPISerializer {
  extractMeta(payload) {
    let articlesCount = payload.articlesCount;
    delete payload.articlesCount
    return {
      totalCount: articlesCount,
    };
  }

  resourceTypeFromPayloadKey(payloadKey) {
    if (payloadKey === 'profile') {
      return 'author';
    }
    return this.schema.singularize(payloadKey);
  }

  resourceId(type, id) {
    let resourceId = super.resourceId(type, id);
    return resourceId || id;
  }

  deserializeAttributes(record, resource, model) {
    Object.keys(resource).forEach((resourceAttribute) => {
      let attribute = this.recordAttribute(record.type, resourceAttribute);
      if (this.schema.hasAttribute(record.type, attribute)) {
        let value = resource[resourceAttribute];
        this.deserializeAttribute(record, attribute, value, model);
      }
    });
  }

  deserialize(payload, options) {
    debugger
    let data;
    let result = {
      included: [],
    };

    let meta = this.extractMeta(payload);
    if (meta) {
      result.meta = meta;
    }

    let keys = Object.keys(payload);
    for (let i = 0, length = keys.length; i < length; i++) {
      let prop = keys[i];
      let resourceType = this.resourceTypeFromPayloadKey(prop);
      let value = payload[prop];

      if (Array.isArray(value)) {
        // TODO: Unsure what are primaryRecords. Need to get back to this
        // let primaryRecords = options && options.primaryRecords;
        // if (primaryRecords) {
        //   data = value.map((entry, i) => {
        //     return this.deserializeResource({
        //       resourceType,
        //       resource: entry,
        //       primaryRecord: primaryRecords[i],
        //     });
        //   });
        // } else {
          let normalized = this._normalizeArray({resourceType, collection: value})
          data = normalized.data;
          result.included.push(...normalized.included);
        // }
      } else if (value !== null) {
        // TODO: Unsure what are primaryRecords. Need to get back to this
        // let primaryRecord = options && options.primaryRecord;
        // if (primaryRecord) {
        //   data = this.deserializeResource({
        //     resourceType,
        //     primaryRecord,
        //     resource: value,
        //   });
        // } else {
          let normalized = this.deserializeResource({ resourceType, resource: value });
          data = normalized.data;
          result.included.push(...normalized.included);
        // }
      } else {
        data = null;
      }

      result.data = data;
    }
    return result;
  }

  _normalizeArray({resourceType, collection = []}) {
    let documentHash = {
      data: [],
      included: [],
    };
    return collection.reduce((documentHash, entry) => {
      let {data, included} = this.deserializeResource({
        resource: entry,
        resourceType,
      });
      documentHash.data.push(data);
      if (included) {
        documentHash.included.push(...included);
      }
      return documentHash;
    }, documentHash);
  }

  deserializeResourceIdentity({resource, resourceType, primaryRecord}) {
    let record;
    // const type = this.recordType(resource.type);
    const type = this.recordType(resourceType);
    const resourceKey = this.resourceKey(type);

    if (resourceKey === 'id') {
      record = {
        type,
        id: resource.id,
      };
    } else {
      let id;
      let keys;

      if (resource[resourceKey]) {
        keys = {
          [resourceKey]: resource[resourceKey],
        };
        id = (primaryRecord && primaryRecord.id) || this.keyMap.idFromKeys(type, keys) || this.schema.generateId(type);
      } else {
        id = (primaryRecord && primaryRecord.id) || this.schema.generateId(type);
      }
      record = {
        type,
        id,
      };
      if (keys) {
        record.keys = keys;
      }
    }
    if (this.keyMap) {
      this.keyMap.pushRecord(record);
    }
    return record;
  }

  deserializeResource({resource, resourceType, primaryRecord}) {
    if (resourceType === 'article') {
      resource.id = resource.slug;
      resource.author.id = resource.author.username;
    } else if (resourceType === 'author') {
      resource.id = resource.username;
    } else if (resourceType === 'comment') {
      resource.author.id = resource.author.username;
    }

    const record = this.deserializeResourceIdentity({resource, resourceType, primaryRecord});
    const model = this.schema.getModel(resourceType);
    this.deserializeAttributes(record, resource, model);
    this.deserializeRelationships(record, resource, model);
    let included = [];
    this.schema.eachRelationship(resourceType, (key) => {
      if (resource[key]) {
        let { data } = this.deserializeResource({ resourceType: key, resource: resource[key] });
        if (data) {
          included.push(data);
        }
      }
    });
    this.deserializeLinks(record, resource, model);
    this.deserializeMeta(record, resource, model);
    return {data: record, included};
  }

  deserializeRelationships(record, resource, model) {
    let resourceRelationships = this.extractRecourceRelationships(record, resource, model);
    if (resourceRelationships) {
      Object.keys(resourceRelationships).forEach((resourceRel) => {
        let relationship = this.recordRelationship(record.type, resourceRel);
        if (this.schema.hasRelationship(record.type, relationship)) {
          let value = resourceRelationships[resourceRel];
          if (value) {
            this.deserializeRelationship(record, relationship, value, model);
          }
        }
      });
    }
  }

  extractRecourceRelationships(_record, resource, model) {
    let modelRelationships = model.relationships || {};
    return Object.keys(modelRelationships).reduce((relationshipsHash, relationshipKey) => {
      let relationshipValue = resource[relationshipKey];
      if (relationshipValue) {
        relationshipsHash[relationshipKey] = resource[relationshipKey];
      }
      return relationshipsHash;
    }, {});
  }

  deserializeRelationship(record, relationship, value, _model) {
    let resourceData = value;
    if (resourceData !== undefined) {
      let data;
      if (resourceData === null) {
        data = null;
      } else if (Array.isArray(resourceData)) {
        data = resourceData.map((resourceIdentity) => this.recordIdentity(resourceIdentity));
      } else {
        data = this.recordIdentity(relationship, value[this.resourceKey(relationship)]);
      }
      deepSet(record, ['relationships', relationship, 'data'], data);
    }

    let {links, meta} = value;
    if (links !== undefined) {
      deepSet(record, ['relationships', relationship, 'links'], links);
    }
    if (meta !== undefined) {
      deepSet(record, ['relationships', relationship, 'meta'], meta);
    }
  }

  recordIdentity(resourceType, resourceId) {
    let type = this.recordType(resourceType);
    let id = this.recordId(type, resourceId);
    return {
      type,
      id,
    };
  }
}
