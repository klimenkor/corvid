// tslint:disable
// this is an auto generated file. This will be overwritten

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
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
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
export const createCamera = `mutation CreateCamera($input: CreateCameraInput!) {
  createCamera(input: $input) {
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
export const updateCamera = `mutation UpdateCamera($input: UpdateCameraInput!) {
  updateCamera(input: $input) {
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
export const deleteCamera = `mutation DeleteCamera($input: DeleteCameraInput!) {
  deleteCamera(input: $input) {
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
export const createFace = `mutation CreateFace($input: CreateFaceInput!) {
  createFace(input: $input) {
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
export const updateFace = `mutation UpdateFace($input: UpdateFaceInput!) {
  updateFace(input: $input) {
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
export const deleteFace = `mutation DeleteFace($input: DeleteFaceInput!) {
  deleteFace(input: $input) {
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
      shortid
      name
      active
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
      shortid
      name
      active
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
      shortid
      name
      active
    }
  }
}
`;
