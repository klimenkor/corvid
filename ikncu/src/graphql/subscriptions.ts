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
export const onUpdateCategory = `subscription OnUpdateCategory {
  onUpdateCategory {
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
export const onDeleteCategory = `subscription OnDeleteCategory {
  onDeleteCategory {
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
export const onCreateCamera = `subscription OnCreateCamera {
  onCreateCamera {
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
export const onUpdateCamera = `subscription OnUpdateCamera {
  onUpdateCamera {
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
export const onDeleteCamera = `subscription OnDeleteCamera {
  onDeleteCamera {
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
export const onCreateFace = `subscription OnCreateFace {
  onCreateFace {
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
export const onUpdateFace = `subscription OnUpdateFace {
  onUpdateFace {
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
export const onDeleteFace = `subscription OnDeleteFace {
  onDeleteFace {
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
export const onCreateMotion = `subscription OnCreateMotion {
  onCreateMotion {
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
export const onUpdateMotion = `subscription OnUpdateMotion {
  onUpdateMotion {
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
export const onDeleteMotion = `subscription OnDeleteMotion {
  onDeleteMotion {
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
