// tslint:disable
// this is an auto generated file. This will be overwritten

export const createTier = `mutation CreateTier($input: CreateTierInput!) {
  createTier(input: $input) {
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
export const updateTier = `mutation UpdateTier($input: UpdateTierInput!) {
  updateTier(input: $input) {
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
export const deleteTier = `mutation DeleteTier($input: DeleteTierInput!) {
  deleteTier(input: $input) {
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
export const createCategory = `mutation CreateCategory($input: CreateCategoryInput!) {
  createCategory(input: $input) {
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
export const updateCategory = `mutation UpdateCategory($input: UpdateCategoryInput!) {
  updateCategory(input: $input) {
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
export const deleteCategory = `mutation DeleteCategory($input: DeleteCategoryInput!) {
  deleteCategory(input: $input) {
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
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
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
export const createCamera = `mutation CreateCamera($input: CreateCameraInput!) {
  createCamera(input: $input) {
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
export const updateCamera = `mutation UpdateCamera($input: UpdateCameraInput!) {
  updateCamera(input: $input) {
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
export const deleteCamera = `mutation DeleteCamera($input: DeleteCameraInput!) {
  deleteCamera(input: $input) {
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
export const createFace = `mutation CreateFace($input: CreateFaceInput!) {
  createFace(input: $input) {
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
export const updateFace = `mutation UpdateFace($input: UpdateFaceInput!) {
  updateFace(input: $input) {
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
export const deleteFace = `mutation DeleteFace($input: DeleteFaceInput!) {
  deleteFace(input: $input) {
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
export const createMotion = `mutation CreateMotion($input: CreateMotionInput!) {
  createMotion(input: $input) {
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
export const updateMotion = `mutation UpdateMotion($input: UpdateMotionInput!) {
  updateMotion(input: $input) {
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
export const deleteMotion = `mutation DeleteMotion($input: DeleteMotionInput!) {
  deleteMotion(input: $input) {
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
