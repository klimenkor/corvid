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
        occured
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
        occured
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
        occured
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
export const createCamera = `mutation CreateCamera($input: CreateCameraInput!) {
  createCamera(input: $input) {
    id
    name
    active
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
        occured
      }
      nextToken
    }
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
export const deleteCamera = `mutation DeleteCamera($input: DeleteCameraInput!) {
  deleteCamera(input: $input) {
    id
    name
    active
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
        occured
      }
      nextToken
    }
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
    }
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
    }
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
    }
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
    occured
    camera {
      id
      name
      active
    }
    user {
      id
      email
      labels
    }
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
    occured
    camera {
      id
      name
      active
    }
    user {
      id
      email
      labels
    }
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
    occured
    camera {
      id
      name
      active
    }
    user {
      id
      email
      labels
    }
  }
}
`;
