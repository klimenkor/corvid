// tslint:disable
// this is an auto generated file. This will be overwritten

export const getTier = `query GetTier($id: ID!) {
  getTier(id: $id) {
    id
    name
    users {
      items {
        id
        email
        labels
        tierId
      }
      nextToken
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
      users {
        items {
          id
          email
          labels
          tierId
        }
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getCategory = `query GetCategory($id: ID!) {
  getCategory(id: $id) {
    id
    name
    faces {
      items {
        id
        name
        active
        userId
        categoryId
      }
      nextToken
    }
  }
}
`;
export const listCategorys = `query ListCategorys(
  $filter: ModelCategoryFilterInput
  $limit: Int
  $nextToken: String
) {
  listCategorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      faces {
        items {
          id
          name
          active
          userId
          categoryId
        }
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    email
    labels
    tier {
      id
      name
    }
    cameras {
      items {
        id
        name
        active
        userId
      }
      nextToken
    }
    motions {
      items {
        id
        labels {
          name
          confidence
        }
        frame
        occurred
        userId
        cameraId
      }
      nextToken
    }
    faces {
      items {
        id
        name
        active
        userId
        categoryId
      }
      nextToken
    }
    tierId
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
      email
      labels
      tier {
        id
        name
      }
      cameras {
        items {
          id
          name
          active
          userId
        }
        nextToken
      }
      motions {
        items {
          id
          labels {
            name
            confidence
          }
          frame
          occurred
          userId
          cameraId
        }
        nextToken
      }
      faces {
        items {
          id
          name
          active
          userId
          categoryId
        }
        nextToken
      }
      tierId
    }
    nextToken
  }
}
`;
export const getCamera = `query GetCamera($id: ID!) {
  getCamera(id: $id) {
    id
    name
    active
    user {
      id
      email
      labels
      tierId
    }
    motions {
      items {
        id
        labels {
          name
          confidence
        }
        frame
        occurred
        userId
        cameraId
      }
      nextToken
    }
    userId
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
      name
      active
      user {
        id
        email
        labels
        tierId
      }
      motions {
        items {
          id
          labels {
            name
            confidence
          }
          frame
          occurred
          userId
          cameraId
        }
        nextToken
      }
      userId
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
    category {
      id
      name
    }
    user {
      id
      email
      labels
      tierId
    }
    userId
    categoryId
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
      category {
        id
        name
      }
      user {
        id
        email
        labels
        tierId
      }
      userId
      categoryId
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
    occurred
    camera {
      id
      name
      active
      userId
    }
    user {
      id
      email
      labels
      tierId
    }
    userId
    cameraId
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
      occurred
      camera {
        id
        name
        active
        userId
      }
      user {
        id
        email
        labels
        tierId
      }
      userId
      cameraId
    }
    nextToken
  }
}
`;
