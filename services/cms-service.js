import { ApolloLink } from 'apollo-link';
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';
import { createHttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { APP_DRUPAL_URL } from '../config/config-local';

const GRAPHQL_URI = `${ APP_DRUPAL_URL }/graphql`;

function generateHash({ documentId }) {
  return documentId;
}

class CmsService {
  constructor() {
    const link = ApolloLink.from([
      createPersistedQueryLink({ useGETForHashedQueries: true, generateHash }),
      createHttpLink({ uri: GRAPHQL_URI })
    ]);

    this._client = new ApolloClient({ cache: new InMemoryCache(), link });
  }

  get clientInfo() {
    if (!this._client) return null;

    return console.table(this._client);
  }

  fetchQueryData(query) {
    return this._client.query({ query })
      .then(({ data } = {}) => data)
      .catch(console.error);
  }
}

export default new CmsService();
