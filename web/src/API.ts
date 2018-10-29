/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  email: string,
  labels?: Array< string | null > | null,
};

export type UpdateUserInput = {
  id: string,
  email?: string | null,
  labels?: Array< string | null > | null,
};

export type DeleteUserInput = {
  id?: string | null,
};

export type CreateCameraInput = {
  name: string,
  cameraUserId?: string | null,
};

export type UpdateCameraInput = {
  id: string,
  name?: string | null,
  cameraUserId?: string | null,
};

export type DeleteCameraInput = {
  id?: string | null,
};

export type CreateMotionInput = {
  labels?: Array< LabelInput | null > | null,
  frame: string,
  motionUserId?: string | null,
};

export type LabelInput = {
  name?: string | null,
  confidence?: number | null,
};

export type UpdateMotionInput = {
  id: string,
  labels?: Array< LabelInput | null > | null,
  frame?: string | null,
  motionUserId?: string | null,
};

export type DeleteMotionInput = {
  id?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDFilterInput | null,
  email?: ModelStringFilterInput | null,
  labels?: ModelStringFilterInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelCameraFilterInput = {
  id?: ModelIDFilterInput | null,
  name?: ModelStringFilterInput | null,
  and?: Array< ModelCameraFilterInput | null > | null,
  or?: Array< ModelCameraFilterInput | null > | null,
  not?: ModelCameraFilterInput | null,
};

export type ModelMotionFilterInput = {
  id?: ModelIDFilterInput | null,
  frame?: ModelStringFilterInput | null,
  and?: Array< ModelMotionFilterInput | null > | null,
  or?: Array< ModelMotionFilterInput | null > | null,
  not?: ModelMotionFilterInput | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
};

export type CreateUserMutation = {
  createUser:  {
    __typename: "User",
    id: string,
    email: string,
    labels: Array< string | null > | null,
    cameras:  {
      __typename: "ModelCameraConnection",
      items:  Array< {
        __typename: "Camera",
        id: string,
        name: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
};

export type UpdateUserMutation = {
  updateUser:  {
    __typename: "User",
    id: string,
    email: string,
    labels: Array< string | null > | null,
    cameras:  {
      __typename: "ModelCameraConnection",
      items:  Array< {
        __typename: "Camera",
        id: string,
        name: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
};

export type DeleteUserMutation = {
  deleteUser:  {
    __typename: "User",
    id: string,
    email: string,
    labels: Array< string | null > | null,
    cameras:  {
      __typename: "ModelCameraConnection",
      items:  Array< {
        __typename: "Camera",
        id: string,
        name: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreateCameraMutationVariables = {
  input: CreateCameraInput,
};

export type CreateCameraMutation = {
  createCamera:  {
    __typename: "Camera",
    id: string,
    name: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      labels: Array< string | null > | null,
    } | null,
  } | null,
};

export type UpdateCameraMutationVariables = {
  input: UpdateCameraInput,
};

export type UpdateCameraMutation = {
  updateCamera:  {
    __typename: "Camera",
    id: string,
    name: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      labels: Array< string | null > | null,
    } | null,
  } | null,
};

export type DeleteCameraMutationVariables = {
  input: DeleteCameraInput,
};

export type DeleteCameraMutation = {
  deleteCamera:  {
    __typename: "Camera",
    id: string,
    name: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      labels: Array< string | null > | null,
    } | null,
  } | null,
};

export type CreateMotionMutationVariables = {
  input: CreateMotionInput,
};

export type CreateMotionMutation = {
  createMotion:  {
    __typename: "Motion",
    id: string,
    labels:  Array< {
      __typename: "Label",
      name: string | null,
      confidence: number | null,
    } | null > | null,
    frame: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      labels: Array< string | null > | null,
    } | null,
  } | null,
};

export type UpdateMotionMutationVariables = {
  input: UpdateMotionInput,
};

export type UpdateMotionMutation = {
  updateMotion:  {
    __typename: "Motion",
    id: string,
    labels:  Array< {
      __typename: "Label",
      name: string | null,
      confidence: number | null,
    } | null > | null,
    frame: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      labels: Array< string | null > | null,
    } | null,
  } | null,
};

export type DeleteMotionMutationVariables = {
  input: DeleteMotionInput,
};

export type DeleteMotionMutation = {
  deleteMotion:  {
    __typename: "Motion",
    id: string,
    labels:  Array< {
      __typename: "Label",
      name: string | null,
      confidence: number | null,
    } | null > | null,
    frame: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      labels: Array< string | null > | null,
    } | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    id: string,
    email: string,
    labels: Array< string | null > | null,
    cameras:  {
      __typename: "ModelCameraConnection",
      items:  Array< {
        __typename: "Camera",
        id: string,
        name: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      email: string,
      labels: Array< string | null > | null,
      cameras:  {
        __typename: "ModelCameraConnection",
        items:  Array< {
          __typename: "Camera",
          id: string,
          name: string,
        } | null > | null,
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetCameraQueryVariables = {
  id: string,
};

export type GetCameraQuery = {
  getCamera:  {
    __typename: "Camera",
    id: string,
    name: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      labels: Array< string | null > | null,
    } | null,
  } | null,
};

export type ListCamerasQueryVariables = {
  filter?: ModelCameraFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCamerasQuery = {
  listCameras:  {
    __typename: "ModelCameraConnection",
    items:  Array< {
      __typename: "Camera",
      id: string,
      name: string,
      user:  {
        __typename: "User",
        id: string,
        email: string,
        labels: Array< string | null > | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetMotionQueryVariables = {
  id: string,
};

export type GetMotionQuery = {
  getMotion:  {
    __typename: "Motion",
    id: string,
    labels:  Array< {
      __typename: "Label",
      name: string | null,
      confidence: number | null,
    } | null > | null,
    frame: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      labels: Array< string | null > | null,
    } | null,
  } | null,
};

export type ListMotionsQueryVariables = {
  filter?: ModelMotionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMotionsQuery = {
  listMotions:  {
    __typename: "ModelMotionConnection",
    items:  Array< {
      __typename: "Motion",
      id: string,
      labels:  Array< {
        __typename: "Label",
        name: string | null,
        confidence: number | null,
      } | null > | null,
      frame: string,
      user:  {
        __typename: "User",
        id: string,
        email: string,
        labels: Array< string | null > | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser:  {
    __typename: "User",
    id: string,
    email: string,
    labels: Array< string | null > | null,
    cameras:  {
      __typename: "ModelCameraConnection",
      items:  Array< {
        __typename: "Camera",
        id: string,
        name: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser:  {
    __typename: "User",
    id: string,
    email: string,
    labels: Array< string | null > | null,
    cameras:  {
      __typename: "ModelCameraConnection",
      items:  Array< {
        __typename: "Camera",
        id: string,
        name: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser:  {
    __typename: "User",
    id: string,
    email: string,
    labels: Array< string | null > | null,
    cameras:  {
      __typename: "ModelCameraConnection",
      items:  Array< {
        __typename: "Camera",
        id: string,
        name: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreateCameraSubscription = {
  onCreateCamera:  {
    __typename: "Camera",
    id: string,
    name: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      labels: Array< string | null > | null,
    } | null,
  } | null,
};

export type OnUpdateCameraSubscription = {
  onUpdateCamera:  {
    __typename: "Camera",
    id: string,
    name: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      labels: Array< string | null > | null,
    } | null,
  } | null,
};

export type OnDeleteCameraSubscription = {
  onDeleteCamera:  {
    __typename: "Camera",
    id: string,
    name: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      labels: Array< string | null > | null,
    } | null,
  } | null,
};

export type OnCreateMotionSubscription = {
  onCreateMotion:  {
    __typename: "Motion",
    id: string,
    labels:  Array< {
      __typename: "Label",
      name: string | null,
      confidence: number | null,
    } | null > | null,
    frame: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      labels: Array< string | null > | null,
    } | null,
  } | null,
};

export type OnUpdateMotionSubscription = {
  onUpdateMotion:  {
    __typename: "Motion",
    id: string,
    labels:  Array< {
      __typename: "Label",
      name: string | null,
      confidence: number | null,
    } | null > | null,
    frame: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      labels: Array< string | null > | null,
    } | null,
  } | null,
};

export type OnDeleteMotionSubscription = {
  onDeleteMotion:  {
    __typename: "Motion",
    id: string,
    labels:  Array< {
      __typename: "Label",
      name: string | null,
      confidence: number | null,
    } | null > | null,
    frame: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      labels: Array< string | null > | null,
    } | null,
  } | null,
};
