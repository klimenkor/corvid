// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateTier = `subscription OnCreateTier {
  onCreateTier {
    id
    name
  }
}
`;
export const onUpdateTier = `subscription OnUpdateTier {
  onUpdateTier {
    id
    name
  }
}
`;
export const onDeleteTier = `subscription OnDeleteTier {
  onDeleteTier {
    id
    name
  }
}
`;
export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreateCamera = `subscription OnCreateCamera {
  onCreateCamera {
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
export const onUpdateCamera = `subscription OnUpdateCamera {
  onUpdateCamera {
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
export const onDeleteCamera = `subscription OnDeleteCamera {
  onDeleteCamera {
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
export const onCreateFace = `subscription OnCreateFace {
  onCreateFace {
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
export const onUpdateFace = `subscription OnUpdateFace {
  onUpdateFace {
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
export const onDeleteFace = `subscription OnDeleteFace {
  onDeleteFace {
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
export const onCreateMotion = `subscription OnCreateMotion {
  onCreateMotion {
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
export const onUpdateMotion = `subscription OnUpdateMotion {
  onUpdateMotion {
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
export const onDeleteMotion = `subscription OnDeleteMotion {
  onDeleteMotion {
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
