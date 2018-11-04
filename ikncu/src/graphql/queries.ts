// tslint:disable
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    shortid
    email
    labels
    cameras {
      items {
        id
        shortid
        name
      }
      nextToken
    }
    tier {
      id
      name
    }
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      shortid
      email
      labels
      cameras {
        items {
          id
          shortid
          name
        }
        nextToken
      }
      tier {
        id
        name
      }
    }
    nextToken
  }
}
`;
export const getTier = `query GetTier($id: ID!) {
  getTier(id: $id) {
    id
    name
    user {
      id
      shortid
      email
      labels
    }
  }
}
`;
export const listTiers = `query ListTiers(
  $filter: ModelTierFilterInput
  $limit: Int
  $nextToken: String
) {
  listTiers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      user {
        id
        shortid
        email
        labels
      }
    }
    nextToken
  }
}
`;
export const getCamera = `query GetCamera($id: ID!) {
  getCamera(id: $id) {
    id
    shortid
    name
    user {
      id
      shortid
      email
      labels
    }
    motions {
      id
      labels {
        name
        confidence
      }
      frame
    }
  }
}
`;
export const listCameras = `query ListCameras(
  $filter: ModelCameraFilterInput
  $limit: Int
  $nextToken: String
) {
  listCameras(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      shortid
      name
      user {
        id
        shortid
        email
        labels
      }
      motions {
        id
        labels {
          name
          confidence
        }
        frame
      }
    }
    nextToken
  }
}
`;
export const getMotion = `query GetMotion($id: ID!) {
  getMotion(id: $id) {
    id
    labels {
      name
      confidence
    }
    frame
    user {
      id
      shortid
      name
    }
  }
}
`;
export const listMotions = `query ListMotions(
  $filter: ModelMotionFilterInput
  $limit: Int
  $nextToken: String
) {
  listMotions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      labels {
        name
        confidence
      }
      frame
      user {
        id
        shortid
        name
      }
    }
    nextToken
  }
}
`;