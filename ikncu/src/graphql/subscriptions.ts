// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
    id
    shortid
    email
    labels
    cameras
    tier
  }
}
`;
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
    id
    shortid
    email
    labels
    cameras
    tier
  }
}
`;
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
    id
    shortid
    email
    labels
    cameras
    tier
  }
}
`;
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
export const onCreateCamera = `subscription OnCreateCamera {
  onCreateCamera {
    id
    shortid
    name
    active
    userid
  }
}
`;
export const onUpdateCamera = `subscription OnUpdateCamera {
  onUpdateCamera {
    id
    shortid
    name
    active
    userid
  }
}
`;
export const onDeleteCamera = `subscription OnDeleteCamera {
  onDeleteCamera {
    id
    shortid
    name
    active
    userid
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
    cameraid
    userid
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
    cameraid
    userid
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
    cameraid
    userid
  }
}
`;
