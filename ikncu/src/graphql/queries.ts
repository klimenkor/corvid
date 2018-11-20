// tslint:disable
// this is an auto generated file. This will be overwritten

export const getTier = `query GetTier($id: ID!) {
  getTier(id: $id) {
    id
    name
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
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    cognitoid
    email
    labels
    tier {
      id
      name
    }
    cameras {
      items {
        id
        shortid
        name
        active
      }
      nextToken
    }
    faces {
      items {
        id
        name
        active
      }
      nextToken
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
      cognitoid
      email
      labels
      tier {
        id
        name
      }
      cameras {
        items {
          id
          shortid
          name
          active
        }
        nextToken
      }
      faces {
        items {
          id
          name
          active
        }
        nextToken
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
    active
    user {
      id
      cognitoid
      email
      labels
    }
    motions {
      items {
        id
        labels {
          name
          confidence
        }
        frame
        occured
      }
      nextToken
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
      active
      user {
        id
        cognitoid
        email
        labels
      }
      motions {
        items {
          id
          labels {
            name
            confidence
          }
          frame
          occured
        }
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getFace = `query GetFace($id: ID!) {
  getFace(id: $id) {
    id
    name
    active
    user {
      id
      cognitoid
      email
      labels
    }
  }
}
`;
export const listFaces = `query ListFaces(
  $filter: ModelFaceFilterInput
  $limit: Int
  $nextToken: String
) {
  listFaces(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      active
      user {
        id
        cognitoid
        email
        labels
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
    occured
    camera {
      id
      shortid
      name
      active
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
      occured
      camera {
        id
        shortid
        name
        active
      }
    }
    nextToken
  }
}
`;
