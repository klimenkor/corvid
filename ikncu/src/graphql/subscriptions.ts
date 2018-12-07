// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateTier = `subscription OnCreateTier {
  onCreateTier {
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
export const onUpdateTier = `subscription OnUpdateTier {
  onUpdateTier {
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
export const onDeleteTier = `subscription OnDeleteTier {
  onDeleteTier {
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
export const onCreateCategory = `subscription OnCreateCategory {
  onCreateCategory {
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
export const onUpdateCategory = `subscription OnUpdateCategory {
  onUpdateCategory {
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
export const onDeleteCategory = `subscription OnDeleteCategory {
  onDeleteCategory {
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
export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreateCamera = `subscription OnCreateCamera {
  onCreateCamera {
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
export const onUpdateCamera = `subscription OnUpdateCamera {
  onUpdateCamera {
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
export const onDeleteCamera = `subscription OnDeleteCamera {
  onDeleteCamera {
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
export const onCreateFace = `subscription OnCreateFace {
  onCreateFace {
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
export const onUpdateFace = `subscription OnUpdateFace {
  onUpdateFace {
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
export const onDeleteFace = `subscription OnDeleteFace {
  onDeleteFace {
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
export const onCreateMotion = `subscription OnCreateMotion {
  onCreateMotion {
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
export const onUpdateMotion = `subscription OnUpdateMotion {
  onUpdateMotion {
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
export const onDeleteMotion = `subscription OnDeleteMotion {
  onDeleteMotion {
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
