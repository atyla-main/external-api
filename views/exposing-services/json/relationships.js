const pluralize = require('pluralize')
const Relationships = require('../../api/relationships/list');
const _ = require('lodash');

module.exports = {
  async relationships(obj, relations) {
    let data = {};
    for (relation in relations) {
      let rel = relations[relation];
      let getMethod = `get${_.replace(_.startCase(rel), ' ' , '')}`;
      let rels = await obj[getMethod]();
      if (!_.isEmpty(rels)) {
        let payload =  pluralize.isPlural(rel) && !_.isEmpty(rels) ? this.relations(rel, rels) : this.relation(rel, rels);
        data[rel] = { data: payload };
      }
    }
    return data;
  },

  relation(collection, relation) {
    return ({
        id: relation.uuid,
        type: collection
    });
  },

  relations(collection, relations) {
    let data = [];
    relations.forEach(rel => {
      data.push({
        id: rel.uuid,
        type: collection
      });
    });
    return data;
  }
};