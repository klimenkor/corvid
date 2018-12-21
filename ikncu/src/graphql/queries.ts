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
        frame
        location
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
          frame
          location
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
        faces {
          confidence
          emotions {
            confidence
            type
          }
        }
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
        frame
        location
        userId
        categoryId
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
          faces {
            confidence
            emotions {
              confidence
              type
            }
          }
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
          frame
          location
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
export const getCamera = `query GetCamera($id: ID!) {
  getCamera(id: $id) {
    id
    name
    active
    userId
    user {
      id
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
        occurred
        faces {
          confidence
          emotions {
            confidence
            type
          }
        }
        userId
        cameraId
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
      name
      active
      userId
      user {
        id
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
          occurred
          faces {
            confidence
            emotions {
              confidence
              type
            }
          }
          userId
          cameraId
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
    frame
    location
    userId
    categoryId
    category {
      id
      name
    }
    user {
      id
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
      frame
      location
      userId
      categoryId
      category {
        id
        name
      }
      user {
        id
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
    occurred
    faces {
      box {
        height
        left
        top
        width
      }
      age {
        high
        low
      }
      beard {
        confidence
        value
      }
      confidence
      emotions {
        confidence
        type
      }
      eyeglasses {
        confidence
        value
      }
      eyesopen {
        confidence
        value
      }
      gender {
        confidence
        value
      }
      mouthopen {
        confidence
        value
      }
      mustache {
        confidence
        value
      }
      smile {
        confidence
        value
      }
      sunglasses {
        confidence
        value
      }
    }
    userId
    cameraId
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
      occurred
      faces {
        box {
          height
          left
          top
          width
        }
        age {
          high
          low
        }
        beard {
          confidence
          value
        }
        confidence
        emotions {
          confidence
          type
        }
        eyeglasses {
          confidence
          value
        }
        eyesopen {
          confidence
          value
        }
        gender {
          confidence
          value
        }
        mouthopen {
          confidence
          value
        }
        mustache {
          confidence
          value
        }
        smile {
          confidence
          value
        }
        sunglasses {
          confidence
          value
        }
      }
      userId
      cameraId
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
      }
    }
    nextToken
  }
}
`;
