// tslint:disable
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    shortid
    email
    labels
    tier
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    shortid
    email
    labels
    tier
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
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    id
    shortid
    email
    labels
    tier
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
export const createTier = `mutation CreateTier($input: CreateTierInput!) {
  createTier(input: $input) {
    id
    name
  }
}
`;
export const updateTier = `mutation UpdateTier($input: UpdateTierInput!) {
  updateTier(input: $input) {
    id
    name
  }
}
`;
export const deleteTier = `mutation DeleteTier($input: DeleteTierInput!) {
  deleteTier(input: $input) {
    id
    name
  }
}
`;
export const createCamera = `mutation CreateCamera($input: CreateCameraInput!) {
  createCamera(input: $input) {
    id
    shortid
    name
    active
    user {
      id
      shortid
      email
      labels
      tier
    }
  }
}
`;
export const updateCamera = `mutation UpdateCamera($input: UpdateCameraInput!) {
  updateCamera(input: $input) {
    id
    shortid
    name
    active
    user {
      id
      shortid
      email
      labels
      tier
    }
  }
}
`;
export const deleteCamera = `mutation DeleteCamera($input: DeleteCameraInput!) {
  deleteCamera(input: $input) {
    id
    shortid
    name
    active
    user {
      id
      shortid
      email
      labels
      tier
    }
  }
}
`;
export const createFace = `mutation CreateFace($input: CreateFaceInput!) {
  createFace(input: $input) {
    id
    name
    active
    user {
      id
      shortid
      email
      labels
      tier
    }
  }
}
`;
export const updateFace = `mutation UpdateFace($input: UpdateFaceInput!) {
  updateFace(input: $input) {
    id
    name
    active
    user {
      id
      shortid
      email
      labels
      tier
    }
  }
}
`;
export const deleteFace = `mutation DeleteFace($input: DeleteFaceInput!) {
  deleteFace(input: $input) {
    id
    name
    active
    user {
      id
      shortid
      email
      labels
      tier
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
    cameraid
    userid
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
    cameraid
    userid
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
    cameraid
    userid
  }
}
`;
