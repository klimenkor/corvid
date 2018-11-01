// tslint:disable
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    email
    labels
    cameras {
      items {
        id
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    email
    labels
    cameras {
      items {
        id
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
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    id
    email
    labels
    cameras {
      items {
        id
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
export const createTier = `mutation CreateTier($input: CreateTierInput!) {
  createTier(input: $input) {
    id
    name
    user {
      id
      email
      labels
    }
  }
}
`;
export const updateTier = `mutation UpdateTier($input: UpdateTierInput!) {
  updateTier(input: $input) {
    id
    name
    user {
      id
      email
      labels
    }
  }
}
`;
export const deleteTier = `mutation DeleteTier($input: DeleteTierInput!) {
  deleteTier(input: $input) {
    id
    name
    user {
      id
      email
      labels
    }
  }
}
`;
export const createCamera = `mutation CreateCamera($input: CreateCameraInput!) {
  createCamera(input: $input) {
    id
    name
    user {
      id
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
export const updateCamera = `mutation UpdateCamera($input: UpdateCameraInput!) {
  updateCamera(input: $input) {
    id
    name
    user {
      id
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
export const deleteCamera = `mutation DeleteCamera($input: DeleteCameraInput!) {
  deleteCamera(input: $input) {
    id
    name
    user {
      id
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
export const createMotion = `mutation CreateMotion($input: CreateMotionInput!) {
  createMotion(input: $input) {
    id
    labels {
      name
      confidence
    }
    frame
    user {
      id
      name
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
    user {
      id
      name
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
    user {
      id
      name
    }
  }
}
`;
