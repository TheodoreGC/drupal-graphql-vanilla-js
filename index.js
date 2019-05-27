import cmsService from './services/cms-service';

/* QUERIES */
import getNodeQuery from './queries/GetNode.graphql';

cmsService.fetchQueryData(getNodeQuery)
  .then(console.log);
