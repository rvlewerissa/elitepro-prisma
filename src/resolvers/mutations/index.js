// @flow

import {forwardTo} from 'prisma-binding';

export default {
  createUser: forwardTo('prisma'),
};
