// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreateTier = `subscription OnCreateTier {
  onCreateTier {
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
export const onUpdateTier = `subscription OnUpdateTier {
  onUpdateTier {
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
export const onDeleteTier = `subscription OnDeleteTier {
  onDeleteTier {
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
export const onCreateCamera = `subscription OnCreateCamera {
  onCreateCamera {
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
export const onUpdateCamera = `subscription OnUpdateCamera {
  onUpdateCamera {
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
export const onDeleteCamera = `subscription OnDeleteCamera {
  onDeleteCamera {
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
export const onCreateMotion = `subscription OnCreateMotion {
  onCreateMotion {
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
export const onUpdateMotion = `subscription OnUpdateMotion {
  onUpdateMotion {
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
export const onDeleteMotion = `subscription OnDeleteMotion {
  onDeleteMotion {
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
